import { ref, Ref, onMounted, onUnmounted } from 'vue'

const UseClickOutside = (htmlRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handlerClick = (e: MouseEvent) => {
    if (htmlRef.value) {
      if (htmlRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handlerClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handlerClick)
  })
  return isClickOutside
}

export default UseClickOutside