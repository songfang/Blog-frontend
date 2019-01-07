<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col>
            <div class="el-form-item-title">
               <el-form-item style="margin-bottom: 40px;" prop="title">
                <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                  标题
                </MDinput>
              </el-form-item>
              <el-form-item style="margin-bottom: 40px;" prop="sub_title">
                <MDinput v-model="postForm.sub_title" :maxlength="100" name="name" required>
                  摘要
                </MDinput>
              </el-form-item>
            </div>
            <div class="el-form-item-img">
               <el-upload
                class="avatar-uploader"
                action="http://localhost:9000/django/users/uploadimg/"
                :show-file-list="false"
                :http-request="uploadFile"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="postForm.image_uri" :loading="listLoading" :src="postForm.image_uri" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="60px" label="目录:" class="postInfo-container-item">
                    <el-select 
                    v-model="postForm.catalogue" 
                    filterable 
                    placeholder="请选择">
                    <el-option
                      v-for="item in catalogue_list"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                    </el-select>
                  </el-form-item>
                  <el-button class="button-new-catalogue" size="small" @click="dialogFormVisible = true">+ 目录</el-button>
                </el-col>

                <el-dialog title="增加目录" :visible.sync="dialogFormVisible">
                  <el-form :model="catalogue_form">
                    <el-form-item label="目录名称: " :label-width="formLabelWidth">
                      <el-input v-model="catalogue_form.name" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="目录备注: " :label-width="formLabelWidth">
                      <el-input type="textarea" :rows="2" v-model="catalogue_form.remark" autocomplete="on"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" v-loading="loading" @click="createCatalogue">确 定</el-button>
                  </div>
                </el-dialog>

                <el-col :span="12">
                  <el-form-item label-width="60px" label="标签:" class="postInfo-container-item">
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
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>

        <div class="editor-container">
          <el-card class="box-card" :body-style="{ padding: '10px' }">
              <div slot="header" class="blog-content-header">
                <span style="font-size: 48px;">{{ postForm.title }}</span>
                <span style="float: right;">{{ postForm.title }}</span>
              </div>
              <div class="blog-message">
                  <div class="clearfix">
                      <div class="blog-content">
                          <div class="blog-content-body">
                              <Tinymce ref="editor" :height="400" style="height: 100%;word-wrap: break-word;word-break: break-all;" :loading="listLoading" v-model="postForm.body" required/>
                          </div>
                    
                      </div>
                  </div>
              </div>
          </el-card>
        </div>
    
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { userSearch } from '@/api/remoteSearch'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { uploadFiles } from '@/api/article'

export default {
  name: 'ArticleView',
  components: { Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        status: 'draft',
        title: '', // 文章题目
        sub_title: '', // 摘要
        body: '', // 文章内容
        image_uri: '', // 文章图片
        catalogue: this.$store.getters.catalogue,
        tags: '',
        id: -1,
        comment_disabled: false,
        inputVisible: false,
        inputValue: '',
      },
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{validator: validateRequire }],
        title: [{ required: true, trigger: 'blur', validator: validateRequire }],
        sub_title: [{ required: true, trigger: 'blur', validator: validateRequire }],
        body: [{ required: true, trigger: 'blur', validator: validateRequire }],
      },
      tempRoute: {},
      catalogue_list: this.$store.getters.catalogue_list,
      tags_list:  this.$store.getters.tags_list,
      inputVisible: false,
      inputValue: '',
      listQuery: {
        page: 1,
        limit: 100
      },
      fileList: [],
      dialogFormVisible: false,
      catalogue_form: {
          name: '',
          remark: '',
        },
      formLabelWidth: '80px',
      listLoading: true,
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.id = id
      this.fetchData(id)
    }

    this.tempRoute = Object.assign({}, this.$route)
    this.$store.dispatch('ListCatalogue', this.listQuery).then(() => {
      this.catalogue_list = this.$store.getters.catalogue_list
      this.listLoading = false
    }).catch((error) => {
      console.log(error)
      this.listLoading = false
    })
  },
  methods: {
    fetchData(id) {
      this.$store.dispatch('FethchArticle', id).then(() => {
        this.postForm.title = this.$store.getters.title
        this.postForm.sub_title = this.$store.getters.sub_title
        this.postForm.body = this.$store.getters.body
        this.postForm.image_uri = this.$store.getters.image_uri
        this.postForm.catalogue = this.$store.getters.catalogue
        this.tags_list = this.$store.getters.tags_list
        this.postForm.id = id
        this.listLoading = false
      }).catch((error) => {
        console.log(error)
        this.listLoading = false
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
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
    submitForm() {
      if (this.postForm.body.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }else if(!this.postForm.catalogue){
        this.$message({
          message: '请选择对应的目录',
          type: 'warning'
        })
        return
      }

      this.postForm.tags = this.tags_list.join(",").toString()
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.postForm.id >= 0){
            this.$store.dispatch('EditArticle', this.postForm).then(() => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.postForm.status = 'published'
              this.loading = false
              this.$router.push({ path: this.redirect || '/example/view/' + this.id })
            }).catch((error) => {
              console.log(error)
              this.loading = false
            })
          }else{
            this.$store.dispatch('CreateArticle', this.postForm).then(() => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.postForm.status = 'published'
              this.loading = false
              this.$router.push({ path: this.redirect || '/example/view/' + this.id })
            }).catch((error) => {
              console.log(error)
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.body.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    submitUpload() {
        this.$refs.upload.submit();
      },
    
    uploadFile(params) {
      var formData = new FormData();  
      formData.append("file", params.file);
      uploadFiles(params.file).then(res => {
        console.log(res)
        this.$message({
          message: '图片上传成功！',
          type: 'warning'
        })
        this.postForm.image_uri = res.data
        this.listLoading = false
        }).catch(err => {
          console.log('报错', err)
          this.listLoading = false
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    createCatalogue(){
      if(!this.catalogue_form.name){
        this.$message({
          message: '请填写目录名称',
          type: 'warning'
        })
        return
      }else{
        this.$store.dispatch('CreateCatalogue', this.catalogue_form).then(() => {
          this.$notify({
            title: '成功',
            message: '添加目录成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
          this.$store.getters.catalogue_list.forEach((item) => {
            if(this.catalogue_list.indexOf(item) === -1){
              this.catalogue_list.push(item)
            }
          });
          console.log(this.catalogue_list)
          this.dialogFormVisible = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      }
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 10px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      text-align: left;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
        text-align: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .button-new-catalogue{
    margin-left: 10px;
    height: 36px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-form-item-title{
    width: 80%;
    margin: 0px;
    float: right;
  }
  .el-form-item-img{
    width: 20%;
    margin: 0px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
