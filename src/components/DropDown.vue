<template>
  <div class="dropdown" ref="dropdown">
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" role="button" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-show="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import UseClickOutside from '@/hooks/UseClickOutside'
export default {
  name: 'DropDown',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdown = ref<null | HTMLElement>(null)
    
    const isClickOutside = UseClickOutside(dropdown)
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdown
    }
  }
}
</script>