<template>
  <div class="app-container">
    <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span class="blogheader">目录列表</span>
            <el-input type="text" placeholder="请输入需要搜索的内容" v-model="search" suffix-icon="el-icon-search" class="input-with-select">
            </el-input>
        </div>
        <div style="padding: 5px;">
            <el-table
                ref="multipleTable"
                :data="fileterlist"
                tooltip-effect="dark"
                style="width: 100%"
                border
                fit
                v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="标签名称"
                    width="360">
                    <template slot-scope="scope">
                    <template v-if="scope.row.name_edit">
                        <el-input v-model="scope.row.name" class="edit-input" size="small"/>
                        <el-button class="cancel-btn" size="mini" type="warning" @click="cancel_name_edit(scope.row)">取消</el-button>
                    </template>
                    <span v-else>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    min-width="120">
                    <template slot-scope="scope">
                    <template v-if="scope.row.remark_edit">
                        <el-input v-model="scope.row.remark" class="edit-input" size="small"/>
                        <el-button class="cancel-btn" size="mini" type="warning" @click="cancel_remark_edit(scope.row)">取消</el-button>
                    </template>
                    <span v-else>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="updated_time"
                    label="更新时间"
                    width="160">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="160">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.name_edit" type="success" size="mini" v-loading="scope.row.save_loading" @click="save_edit(scope.row)">保存</el-button>
                        <el-button v-else type="primary" size="mini" @click="data_edit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        v-loading="scope.row.del_loading"
                        @click="handle_delete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="multiple-delete-container">
            <el-button
            size="mini"
            type="danger"
            v-loading="multiple_del_loading"
            @click="handle_multiple_delete()">批量删除</el-button>
            <el-button
            size="mini"
            type="success"
            plain
            @click="dialogFormVisible = true">添加目录</el-button>
            <el-pagination class="pagination-container"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="listQuery.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        </el-card>
    </el-col>
    <el-dialog title="增加目录" :visible.sync="dialogFormVisible">
        <el-form :model="catalogue_form">
            <el-form-item label="目录名称: " :label-width="formLabelWidth" style="margin-bottom: 10px;" prop="catalogue_name">
            <el-input v-model="catalogue_form.name" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="目录备注: " :label-width="formLabelWidth" prop="catalogue_remark">
            <el-input type="textarea" :rows="2" v-model="catalogue_form.remark" auto-complete="on"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" v-loading="catalogueloading" @click="add_catalogue">确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>

<script>

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
        catalogue_list: [],
        multipleSelection: [],
        loading: false,
        listQuery: {
            page: 1,
            limit: 20
        },
        search: "",
        currentPage:1,
        total: 1,
        multiple_del_loading: false,
        dialogFormVisible: false,
        catalogue_form: {
            name: "",
            remark: "",
        },
        formLabelWidth: '80px',
        catalogueloading: false,
    }
  },
  created() {
    this.get_list()
  },
  computed: {
    fileterlist: function(){
        let items = this.catalogue_list
        var searchRegex = new RegExp(this.search, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
            let match_flag = false
            if(searchRegex.test(items[i].name) || 
             searchRegex.test(items[i].remark) || 
             searchRegex.test(items[i].created_time)||
             searchRegex.test(items[i].updated_time)){
                match_flag = true
            }

            if(match_flag){
                arr.push(items[i]);
            }
        }
        return arr;
    }
  },
  methods: {
    get_list() {
      this.loading = true
      this.$store.dispatch('get_all_catalogue_list', this.listQuery).then(res => {
        const data = res.data
        this.total = res.total
        this.catalogue_list = data.map(v => {
          this.$set(v, 'name_edit', false)
          this.$set(v, 'remark_edit', false)
          this.$set(v, 'save_loading', false)
          this.$set(v, 'del_loading', false)
          v.origin_name = v.name
          v.origin_remark = v.remark
          return v
        })
        this.loading = false
      })
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.limit = val
        this.get_list()
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val
        this.get_list()
    },
    handle_edit(index, row) {
        console.log(index, row);
    },
    handle_delete(index, row) {
      this.$confirm('此操作将永久删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.del_loading = true
        var catalogue_index = this.catalogue_list.indexOf(row)
        if(catalogue_index !== -1){
            this.catalogue_list.splice(catalogue_index,1)
        }
        this.$store.dispatch('del_catalogue', row).then(res => {
            this.total = this.total - 1
            row.del_loading = false
        }).catch((error) => {
            console.log(error)
            row.del_loading = false
        })
      }).catch(() => {  

        });
    },
    data_edit(row){
        row.name_edit = !row.name_edit
        row.remark_edit = !row.remark_edit
    },
    cancel_name_edit(row) {
      row.name = row.origin_name
      row.name_edit = false
    },
    cancel_remark_edit(row) {
      row.remark = row.origin_remark
      row.remark_edit = false
    },
    save_edit(row) {
      row.save_loading = true
      this.$store.dispatch('edit_catalogue', row).then(res => {
            row.save_loading = false
            row.name_edit = false
            row.remark_edit = false
        }).catch((error) => {
            console.log(error)
            row.save_loading = false
        })
    },
    handle_multiple_delete(){
        if(this.multipleSelection.length < 1){
            this.$message({
                message: '请选择需要删除的条目',
                type: 'warning'
            });
        }else{
            this.$confirm('此操作将永久删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.multiple_del_loading = true
                this.multipleSelection.forEach(items => {
                    var index = this.catalogue_list.indexOf(items)
                    if(index !== -1){
                        this.catalogue_list.splice(index, 1)
                        this.$store.dispatch('del_catalogue', items).then(res => {
                            this.multiple_del_loading = false
                            this.total = this.total - 1
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
                
            }).catch(() => {  

            });
        }
    },
    add_catalogue(){
      if(this.catalogue_form.name === ''){
        this.$message({
          showClose: true,
          message: '目录名称不能为空！',
          type: 'warn'
        });
        return
      }else{
        this.catalogueloading = true
        this.$store.dispatch('add_catalogue', this.catalogue_form).then(() => {
          this.$notify({
            title: '成功',
            message: '添加目录成功',
            type: 'success',
            duration: 2000
          })
          this.catalogueloading = false
          let data = this.$store.getters.catalogue_list.map(v => {
            this.$set(v, 'name_edit', false)
            this.$set(v, 'remark_edit', false)
            this.$set(v, 'save_loading', false)
            this.$set(v, 'del_loading', false)
            v.origin_name = v.name
            v.origin_remark = v.remark
            return v
            })
           data.forEach((item) => {
            if(this.catalogue_list.indexOf(item) === -1){
              this.catalogue_list.push(item)
              this.total = this.total + 1
            }
          });
          this.dialogFormVisible = false
        }).catch((error) => {
          console.log(error)
          this.catalogueloading = false
        })
      }
    },
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.blogheader{
    font-size: 30px;
}
.input-with-select {
    background-color: #fff;
    width: 30%;
    float: right;
}
.pagination-container{
    margin-top: 20px;
    margin-bottom: 10px;
    float: right;
}
.multiple-delete-container{
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 10px;
    width: 100%;
    float: left;
}
</style>
