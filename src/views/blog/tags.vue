<template>
  <div class="app-container">
    <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span class="blogheader">TAGS列表</span>
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
        tags_list: [],
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
    }
  },
  created() {
    this.get_list()
  },
  computed: {
    fileterlist: function(){
        let items = this.tags_list
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
      this.$store.dispatch('get_all_tags_list', this.listQuery).then(res => {
        const data = res.data
        this.total = res.total
        this.tags_list = data.map(v => {
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
        var tags_index = this.tags_list.indexOf(row)
        if(tags_index !== -1){
            this.tags_list.splice(tags_index,1)
        }
        this.$store.dispatch('del_tags', row).then(res => {
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
      this.$store.dispatch('edit_tags', row).then(res => {
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
                    var index = this.tags_list.indexOf(items)
                    if(index !== -1){
                        this.tags_list.splice(index, 1)
                        this.$store.dispatch('del_tags', items).then(res => {
                            this.multiple_del_loading = false
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
                
            }).catch(() => {  

            });
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
