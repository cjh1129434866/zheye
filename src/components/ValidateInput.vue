<template>
  <div class="validate-input-container pb-3">
    <input 
      type="text" class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
      >
      <small id="emailHelp" class="form-text invalid-feedback" v-show="inputRef.error">{{ inputRef.message }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from '@/components/ValidateForm.vue'
const emailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
interface RuleProp {
  type: 'required' | 'email';
  message: string
}
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProp>,
      required: true
    },
    modelValue: {
      type: String
    }
  },
  setup(props, context) {
    console.log(context.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              if (inputRef.val.trim() === '') {
                passed = false
                inputRef.message = rule.message
              }
              break
            case 'email':
              if (!emailReg.test(inputRef.val)) {
                passed = false
                inputRef.message = rule.message
              }
              break  
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>