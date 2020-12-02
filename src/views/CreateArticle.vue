<template>
  <div class='create-post-page'>
    <h3>{{ isEditMode ? '编辑文章' : '新建文章' }}</h3>
    <uploader 
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.url" alt="">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">标题</label>
        <validate-input :rules="titleRules" v-model="titleValue"
          placeholder="请输入标题" type="text"
        ></validate-input>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">正文</label>
        <validate-input :rules="contentRules" v-model="contentValue"
          placeholder="请输入正文" tag="textarea" rows="10"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEditMode ? '更新文章' : '发表文章' }}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '../store'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp }  from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
import { beforeUploadCheck } from '../helper'
export default defineComponent({
  name: 'CreateArticle',
  components: { ValidateForm, ValidateInput, Uploader },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const uploadedData = ref()
    const titleValue = ref('')
    const contentValue = ref('')
    const isEditMode = !!route.query.id
    let imageId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '请输入标题' }
    ]
    const contentRules: RulesProp = [
       { type: 'required', message: '请输入正文' } 
    ]
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', route.query.id).then((res: ResponseType<PostProps>) => {
          const currentPost = res.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleValue.value = currentPost.title
          contentValue.value = currentPost.content || ''
        })
      }
    })
    const handleFileUploaded = (res: ResponseType<ImageProps>) => {
      if (res.data._id) {
        imageId = res.data._id
      }
    }

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            author: _id,
            title: titleValue.value,
            content: contentValue.value,
            column,
            createdAt: new Date().toLocaleString()
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'uploadPost' : 'createPost'
          const sendData = isEditMode ? {
            id: route.query.id,
            payload: newPost
          } : newPost
          
          store.dispatch(actionName, sendData).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'ColumnDetail', params: { id: column } })
            }, 2000)
          })
          /* router.push({
            path: `/columnDetail/${columnId}`
          }) */
        }
      }
    }

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jepg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传 图片只能是 JPG/PNG 格式！', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1MB', 'error')
      }
      return passed
    }
    return {
      titleValue,
      contentValue,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded,
      uploadedData,
      isEditMode
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>