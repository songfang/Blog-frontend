<template>
  <div class="app-container">
    <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span class="blogheader">消息列表</span>
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
                    label="消息内容"
                    min-width="500">
                    <template slot-scope="scope">
                        <router-link class="inlineBlock" :to="'/messages/info/' + scope.row.id">
                            <span v-if="scope.row.is_read">{{ scope.row.action.zh + scope.row.target.zh }} -【{{ scope.row.msg_new }}】</span>
                            <span v-else style="font-weight:bold;">{{ scope.row.action.zh + scope.row.target.zh }} -【{{ scope.row.msg_new }}】</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="消息类型"
                    min-width="100">
                    <template slot-scope="scope">
                    <span v-if="scope.row.is_read">{{ scope.row.action.zh + scope.row.target.zh }}</span>
                    <span v-else style="font-weight:bold;">{{ scope.row.action.zh + scope.row.target.zh }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="updated_time"
                    label="更新时间"
                    width="160">
                    <template slot-scope="scope">
                    <span v-if="scope.row.is_read">{{ scope.row.updated_time }}</span>
                    <span v-else style="font-weight:bold;">{{ scope.row.updated_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        v-loading="scope.row.read_loading"
                        :disabled="scope.row.is_read"
                        @click="handle_read(scope.$index, scope.row)">标记为已读</el-button>
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
            type="default"
            v-loading="multiple_read_loading"
            :disabled="!multipleSelection.length"
            @click="handle_multiple_read()">批量标记为已读</el-button>
            <el-button
            size="mini"
            type="default"
            v-loading="all_read_loading"
            :disabled="!messages_list.length"
            @click="handle_all_read()">全部标记为已读</el-button>
            <el-button
            size="mini"
            type="default"
            :disabled="!messages_list.length"
            @click="show_all_messages()">全部消息</el-button>
            <el-button
            size="mini"
            type="default"
            :disabled="!messages_list.length"
            @click="filter_unread_messages()">未读消息</el-button>
            <el-button
            size="mini"
            type="default"
            v-loading="multiple_del_loading"
            :disabled="!multipleSelection.length"
            @click="handle_multiple_delete()">批量删除</el-button>
            <el-button
            size="mini"
            type="default"
            v-loading="all_del_loading"
            :disabled="!messages_list.length"
            @click="handle_all_delete()">全部删除</el-button>
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
import bus from '@/main.js'

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
        messages_list: [],
        messages_list_tmp: [],
        multipleSelection: [],
        loading: false,
        listQuery: {
            page: 1,
            limit: 20
        },
        search: "",
        currentPage:1,
        total: 1,
        del_loadding: false,
        multiple_read_loading: false,
        multiple_del_loading: false,
        all_del_loading: false,
        all_read_loading: false,
        dialogFormVisible: false,
        messages_form: {
            name: "",
            remark: "",
        },
        formLabelWidth: '80px',
        messagesloading: false,
    }
  },
  created() {
    this.get_list()
  },
  computed: {
    fileterlist: function(){
        let items = this.messages_list
        var searchRegex = new RegExp(this.search, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
            let match_flag = false
            if(searchRegex.test(items[i].msg_new) || 
             searchRegex.test(items[i].action.zh) || 
             searchRegex.test(items[i].target.zh) || 
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
      this.messages_list = []
      this.$store.dispatch('get_messages_list', this.listQuery).then(res => {
        this.messages_list = res.data
        this.total = res.total
        this.messages_list = this.messages_list.map(v => {
          this.$set(v, 'read_loading', false)
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
    handle_read(index, row) {
        var messages_index = this.messages_list.indexOf(row)
        if(messages_index !== -1){
            row.read_loading = true
            this.$store.dispatch('read_messages', row).then(res => {
                row.read_loading = false
                this.messages_list[messages_index].is_read = true
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    handle_delete(index, row) {
      this.$confirm('此操作将永久删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.del_loading = true
        var index = this.messages_list.indexOf(row)
        if(index !== -1){
            this.messages_list.splice(index,1)
        }
        this.$store.dispatch('del_messages', row).then(res => {
            row.del_loading = false
        }).catch((error) => {
            console.log(error)
            row.del_loading = false
        })
      }).catch(() => {  

        });
    },
    handle_multiple_delete(){
        this.$confirm('此操作将永久删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.multiple_del_loading = true
            this.multipleSelection.forEach(items => {
                var index = this.messages_list.indexOf(items)
                if(index !== -1){
                    this.messages_list.splice(index, 1)
                    this.$store.dispatch('del_messages', items).then(res => {
                        this.multiple_del_loading = false
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            })
            
        }).catch(() => {  

        });
    },
    handle_all_delete(){
        this.$confirm('此操作将永久删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.all_del_loading = true
            this.$store.dispatch('del_all_messages').then(res => {
                this.messages_list.forEach(items => {
                    this.messages_list.pop(items)
                });
                this.all_del_loading = false
            }).catch((error) => {
                console.log(error)
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
      this.$store.dispatch('edit_messages', row).then(res => {
            row.save_loading = false
            row.name_edit = false
            row.remark_edit = false
        }).catch((error) => {
            console.log(error)
            row.save_loading = false
        })
    },
    handle_multiple_read(){
        if(this.multipleSelection.length < 1){
            this.$message({
                message: '请选择需要标记的条目',
                type: 'warning'
            });
        }else{
            this.multiple_read_loading = true
            this.multipleSelection.forEach(items => {
                var index = this.messages_list.indexOf(items)
                if(index !== -1){
                    this.$store.dispatch('read_messages', items).then(res => {
                        this.messages_list[index].is_read = true
                        this.multiple_read_loading = false
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            })
        }
    },
    handle_all_read(){
      this.$confirm('是否将所有消息全部标记为已读?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.all_read_loading = true
        this.$store.dispatch('read_all_messages').then(res => {
            this.messages_list.forEach(items => {
                items.is_read = true
            });
            this.all_read_loading = false
        }).catch((error) => {
            console.log(error)
        })
      }).catch(() => {  });
    },
    filter_unread_messages(){
        this.messages_list.forEach(items => {
            this.messages_list_tmp.push(items)
        });
        this.messages_list = this.messages_list.filter(items => items.is_read !== true)
    },
    show_all_messages(){
        this.messages_list_tmp.forEach(items => {
            if(this.messages_list.indexOf(items) === -1){
                this.messages_list.push(items)
            }
        });
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
