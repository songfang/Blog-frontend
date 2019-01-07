<template>
  <div>
    <sticky :class-name="'sub-navbar '+postform.status" v-loading.fullscreen.lock="loading">
      <div class="sub-navbar-container">
        <el-dropdown trigger="click">
          <el-button plain>评论<i class="el-icon-caret-bottom el-icon--right"/></el-button>
          <el-dropdown-menu slot="dropdown" class="no-border">
            <el-radio v-model="postform.comments_disabled" :label="false">打开评论</el-radio>
            <el-radio v-model="postform.comments_disabled" :label="true">关闭评论</el-radio>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="margin-left: 10px;" type="danger" v-if="deletebtn" @click="delete_blog" v-loading="deleteloading">删除</el-button>
        <el-button style="margin-left: 10px;" type="success" v-loading="upload_loading" @click="submitform">发布</el-button>
      </div>
    </sticky>
    <div class="components-container">
        <div class="editor-container">
          <el-form :model="postform" :rules="rules" ref="postform">
            <el-form-item prop="title">
              <el-input v-model="postform.title" placeholder="标题" style="margin-top: 10px;"></el-input>
            </el-form-item>
            <el-form-item prop="sub_title">
              <el-input v-model="postform.sub_title" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="摘要"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="catalogue-container">
                <el-select v-model="postform.catalogue" style="width: 60%;margin-left: 0px;" filterable placeholder="请选择">
                  <el-option
                    v-for="item in catalogue_list"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-button class="button-new-tag" size="small" @click="dialogFormVisible = true">+ 目录</el-button>
              </div>
              
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
                  <el-button type="primary" v-loading="catalogueloading" @click="createCatalogue">确 定</el-button>
                </div>
              </el-dialog>
              
              <div class="tags-container">
                <el-tag
                  :key="tag"
                  v-for="tag in tags_list"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <tinymce :height="800" v-model="postform.body"/>
              </el-form-item>
          </el-form>
        </div>
    </div>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky'

export default {
  name: 'TinymceDemo',
  components: { Tinymce ,Sticky },
  data() {
    const titleValidateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '标题为必传项',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    const subtitleValidateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '摘要为必传项',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    const bodyValidateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '文章内容为必传项',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    const catalogueValidateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: '目录名称为必传项',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    return {
      postform: {
          id: -1,
          title: "",
          sub_title: "",
          body: "",
          html: '',
          comments_disabled: false,
          catalogue: "",
          tags: "",
      },
      catalogue_list: [],
      tags_list: [],
      catalogue_form: {
        name: "",
        remark: "",
      },
      listQuery: {
        page: 1,
        limit: 100
      },
      catalogueloading: false,
      formLabelWidth: '80px',
      dialogFormVisible: false,
      dialogFormUpload: false,
      loading: false,
      upload_loading: false,
      deleteloading: false,
      inputVisible: false,
      inputValue: "",
      dialogImageUrl: '',
      dialogVisible: false,
      deletebtn: false,
      rules: {
        title: [{ required: true, trigger: 'blur', validator: titleValidateRequire }],
        sub_title: [{ required: true, trigger: 'blur', validator: subtitleValidateRequire }],
        body: [{ required: true, trigger: 'blur', validator: bodyValidateRequire }],
        name: [{ required: true, trigger: 'blur', validator: catalogueValidateRequire }],
      },
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.postform.id = id
    this.listCatalogue()
    if(this.postform.id >= 0){
      this.fetchData(id)
      this.deletebtn = true
    }else{
    }

  },
  computed: {
  },
  methods: {
    submitform(){
      if(this.postform.body === ""){
        this.$message({
          message: '内容为必填项',
          type: 'error'
        })
        return
      }else if(this.postform.title === ""){
        this.$message({
          message: '标题为必填项',
          type: 'error'
        })
        return
      }else if(this.postform.sub_title === ""){
        this.$message({
          message: '摘要为必填项',
          type: 'error'
        })
        return
      }else if(this.postform.catalogue === ""){
          this.$message({
          message: '目录为必填项',
          type: 'error'
        })
        return
      }else{
        this.postform.tags = this.tags_list.join(",").toString()
        this.$refs.postform.validate(valid => {
        if (valid) {
          this.upload_loading = true
          if (this.postform.id >= 0){
            this.$store.dispatch('EditArticle', this.postform).then(() => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.upload_loading = false
              this.$router.push({ path: this.redirect || '/blog/view/' + this.postform.id })
            }).catch((error) => {
              console.log(error)
              this.upload_loading = false
            })
          }else{
            this.$store.dispatch('CreateArticle', this.postform).then(response => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.upload_loading = false
              console.log(response)
              this.postform.id = response.data.id
              this.$router.push({ path: this.redirect || '/blog/view/' + this.postform.id })
            }).catch((error) => {
              console.log(error)
              this.upload_loading = false
            })
          }
        }else {
          console.log('error submit!!')
          return false
        }})
      }
    },
    fetchData(id) {
      this.loading = true
      this.$store.dispatch('FethchArticle', id).then(() => {
        this.postform.title = this.$store.getters.title
        this.postform.sub_title = this.$store.getters.sub_title
        this.postform.body = this.$store.getters.body
        this.postform.catalogue = this.$store.getters.catalogue
        this.tags_list = this.$store.getters.tags_list
        this.postform.comments_disabled = this.$store.getters.comments_disabled
        this.postform.id = id
        this.loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    listCatalogue(){
      this.$store.dispatch('get_catalogue_list',this.listQuery).then(res => {
        res.data.forEach(catalogue => {
        if(this.catalogue_list.indexOf(catalogue) === -1){
          this.catalogue_list.push(catalogue)
          }
        })
      }).catch((error) => {
        console.log(error)
      }) 
    },
    createCatalogue(){
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
          this.$store.getters.catalogue_list.forEach((item) => {
            if(this.catalogue_list.indexOf(item.name) === -1){
              this.catalogue_list.push(item.name)
            }
          });
          this.dialogFormVisible = false
        }).catch((error) => {
          console.log(error)
          this.catalogueloading = false
        })
      }
    },
    handleClose(tag) {
      this.tags_list.splice(this.tags_list.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags_list.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgAdd(){
      console.log("test")
    },
    delete_blog(){
      this.$confirm('此操作将永久删除该篇?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteloading = true
        let data = {"blogid": this.postform.id}
        this.$store.dispatch('delete_article', data).then(() => {
          this.$notify({
            title: '成功',
            message: '删除文章成功',
            type: 'success',
            duration: 2000
          })
          this.deleteloading = false
          this.$router.push({ path: this.redirect || '/blog/list/' })
        }).catch((error) => {
          console.log(error)
          this.deleteloading = false
        })
      }).catch(() => {      
      });
    },
  }
}
</script>

<style scoped>
.components-container{
  word-wrap: break-word; 
  word-break: normal; 
  height: 100%;
  margin: 0px;
}
.form-container{
  margin: 0px;
  height: 100%;
}
.editor-container{
  margin: 10px;
}
.markdown-container{
  width: 100%;
  height: 100%;
}
.sub-navbar {
  height: 40px;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}
.sub-navbar-container{
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  margin: 0px 10px 10px 10px;
  transition: 600ms ease position;
}
.no-border{
  width: 240px;
  text-align: center;
}
.catalogue-container{
  width: 45%;
  float: left;
}
.tags-container{
  width: 45%;
  float: right;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  height: 40px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
