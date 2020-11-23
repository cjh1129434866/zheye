<template>
  <div>
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
        <span class="btn btn-primary">提交</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
  import ValidateForm from '@/components/ValidateForm.vue'
  export default defineComponent({
    name: 'Login',
    components: {
      ValidateInput,
      ValidateForm
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const emailValue = ref('panghu@163.com')
      const passwordValue = ref('')
      const emailRules: RulesProp = [
        { type: 'required', message: '邮箱地址不能为空' },
        { type: 'email', message: '请输入正确的邮箱格式' }
      ]
      const passwordRules: RulesProp = [
        { type: 'required', message: '密码不能为空' }
      ]
      const onFormSubmit = (val: number) => {
        console.log(val)
        if (val) {
          router.push('/')
          store.commit('login')
        }
      }
      return {
        emailRules,
        emailValue,
        passwordValue,
        passwordRules,
        onFormSubmit
      }
    }
  })
</script>