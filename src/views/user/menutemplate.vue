<template>
  <div class="app-container">
    <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span class="blogheader">菜单列表</span>
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
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div class="custom-tree-container">
                            <div class="block">
                                <el-tree
                                :data="scope.row.tree"
                                show-checkbox
                                node-key="id"
                                :highlight-current="true"
                                default-expand-all
                                :default-checked-keys="scope.row.checked_menu"
                                :expand-on-click-node="false"
                                ref="menu_tree">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ node.label }}</span>
                                    <span>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        v-if="scope.row.name_edit"
                                        @click="() => append(scope ,data)">
                                        增加节点
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        v-if="scope.row.name_edit"
                                        @click="() => remove(scope ,node, data)">
                                        删除节点
                                    </el-button>
                                    </span>
                                </span>
                                </el-tree>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="菜单名称"
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
                    label="用户组"
                    width="360">
                    <template slot-scope="scope">
                    <template v-if="scope.row.group_edit">
                        <el-select multiple v-model="menu_form.group" placeholder="请选择">
                            <el-option
                            v-for="item in group_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                        <el-button class="cancel-btn" size="mini" type="warning" @click="cancel_name_edit(scope.row)">取消</el-button>
                    </template>
                    <span v-else>
                        <el-tag type="success" style="margin-right: 5px;margin-bottom: 5px;" v-for="group in scope.row.group" :key="group.id">{{ group.name }} </el-tag>
                    </span>
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
            @click="dialogFormVisible = true">添加菜单</el-button>
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
    <el-dialog title="增加菜单" :visible.sync="dialogFormVisible">
        <el-form :model="menu_form">
            <el-form-item label="菜单名称: " :label-width="formLabelWidth" style="margin-bottom: 10px;" prop="menu_name">
            <el-input v-model="menu_form.name" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="菜单备注: " :label-width="formLabelWidth" prop="menu_remark">
            <el-input type="textarea" :rows="2" v-model="menu_form.remark" auto-complete="on"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" v-loading="menuloading" @click="add_menu">确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>

<script>
let id = 10000
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
        menu_list: [],
        group_list: [],
        menu_checked_list: [],
        multipleSelection: [],
        loading: false,
        listQuery: {
            page: 1,
            limit: 100
        },
        search: "",
        currentPage:1,
        total: 1,
        multiple_del_loading: false,
        dialogFormVisible: false,
        menu_form: {
            id: "",
            name: "",
            group: "",
            tree: "",
            checked_menu: [],
            remark: "",
        },
        formLabelWidth: '80px',
        menuloading: false,
    }
  },
  created() {
    this.get_list()
    this.get_group_list()
  },
  computed: {
    fileterlist: function(){
        let items = this.menu_list
        var searchRegex = new RegExp(this.search, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
            let match_flag = false
            if(searchRegex.test(items[i].name) || 
             searchRegex.test(items[i].tree) || 
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
      this.$store.dispatch('get_menu_list', this.listQuery).then(res => {
        const data = res.data
        this.total = res.total
        this.menu_list = data.map(v => {
          this.$set(v, 'name_edit', false)
          this.$set(v, 'remark_edit', false)
          this.$set(v, 'group_edit', false)
          this.$set(v, 'save_loading', false)
          this.$set(v, 'del_loading', false)
          v.origin_name = v.name
          v.origin_remark = v.remark
          return v
        })
        this.loading = false
      })
    },
    get_group_list(){
        this.$store.dispatch('get_groups_list', this.listQuery).then(res => {
            this.group_list = res.data
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
        var menu_index = this.menu_list.indexOf(row)
        if(menu_index !== -1){
            this.menu_list.splice(menu_index,1)
        }
        this.$store.dispatch('del_menu', row).then(res => {
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
        row.group_edit = !row.group_edit
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
      
      this.menu_form.id = row.id
      this.menu_form.name = row.name
      this.menu_form.tree = JSON.stringify(row.tree)
      let group_list = []
      this.menu_form.group.forEach(items => {
          group_list.push({"name": items})
      });
      this.menu_form.group = JSON.stringify(this.menu_form.group)
      this.menu_form.remark = row.remark
    
      if(this.$refs.menu_tree){
            let checked_menu = []
            this.$refs.menu_tree.getCheckedNodes().forEach(items => {
            checked_menu.push(items.id)
        });
        this.menu_form.checked_menu = JSON.stringify(checked_menu)
      }

      this.$store.dispatch('edit_menu', this.menu_form).then(res => {
            row.group = group_list
            row.save_loading = false
            row.name_edit = false
            row.group_edit = false
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
                    var index = this.menu_list.indexOf(items)
                    if(index !== -1){
                        this.menu_list.splice(index, 1)
                        this.$store.dispatch('del_menu', items).then(res => {
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
    add_menu(){
      if(this.menu_form.name === ''){
        this.$message({
          showClose: true,
          message: '菜单名称不能为空！',
          type: 'warn'
        });
        return
      }else{
        this.menuloading = true
        this.$store.dispatch('add_menu', this.menu_form).then(() => {
          this.$notify({
            title: '成功',
            message: '添加菜单成功',
            type: 'success',
            duration: 2000
          })
          this.menuloading = false
          let data = this.$store.getters.menu_list.map(v => {
            this.$set(v, 'name_edit', false)
            this.$set(v, 'remark_edit', false)
            this.$set(v, 'save_loading', false)
            this.$set(v, 'del_loading', false)
            v.origin_name = v.name
            v.origin_remark = v.remark
            return v
            })
           data.forEach((item) => {
            if(this.menu_list.indexOf(item) === -1){
              this.menu_list.push(item)
              this.total = this.total + 1
            }
          });
          this.dialogFormVisible = false
        }).catch((error) => {
          console.log(error)
          this.menuloading = false
        })
      }
    },
    append(scope, data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        console.log(scope)
      },

    remove(scope,node, data) {
        const parent = node.parent;
        // 如下是官方的例子，不能直接使用，需要做出调整
        // const children = parent.data.children || parent.data;
        // const children = parent.childNodes || parent
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
        // console.log(children)
        node.remove(data)
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
.demo-table-expand {
font-size: 0;
}
.demo-table-expand label {
width: 90px;
color: #99a9bf;
}
.demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width: 50%;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
