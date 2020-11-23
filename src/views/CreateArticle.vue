<template>
  <div>
    <h3>新建文章</h3>
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
        <span class="btn btn-primary">提交</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GlobalDataProps, PostProps } from '../../store'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp }  from '@/components/ValidateInput.vue'
export default defineComponent({
  name: 'CreateArticle',
  components: { ValidateForm, ValidateInput },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleValue = ref('')
    const contentValue = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '请输入标题' }
    ]
    const contentRules: RulesProp = [
       { type: 'required', message: '请输入正文' } 
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleValue.value,
            content: contentValue.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('commitArticle', newPost)
          /* router.push({
            path: `/columnDetail/${columnId}`
          }) */
          router.push({
            name: 'ColumnDetail',
            params: {
              id: columnId
            }
          })
        }
      }
    }
    return {
      titleValue,
      contentValue,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
})
</script>