<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <validate-form @form-submit="onFormSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">邮箱</label>
        <validate-input :rules="emailRules" v-model="emailValue" 
          placeholder="请输入邮箱" type="text"></validate-input>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">密码</label>
        <validate-input :rules="passwordRules" v-model="passwordValue"
          placeholder="请输入密码" type="password"></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">提交</span>
      </template>
    </validate-form>
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateForm from '@/components/ValidateForm.vue'
const emailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
const currentUser: UserProps = {
  isLogin: true,
  name: '胖虎'
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: '这是标题1',
    description: '这事描述',
    avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2233854763,678386514&fm=11&gp=0.jpg'
  },
  {
    id: 2,
    title: '这是标题2',
    description: '这事描述'
    // avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2233854763,678386514&fm=11&gp=0.jpg'
  },
  {
    id: 3,
    title: '这是标题3',
    description: '这事描述',
    avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2233854763,678386514&fm=11&gp=0.jpg'
  },
  {
    id: 4,
    title: '这是标题4',
    description: '这事描述',
    avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2233854763,678386514&fm=11&gp=0.jpg'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailValue = ref('panghu@163.com')
    const passwordValue = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' }
    ]
   
    const onFormSubmit = (val: number) => {
      console.log(val)
    }
    return {
      list: testData,
      user: currentUser,
      emailRules,
      emailValue,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
