<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" style="width: 18rem;">
        <div class="card-body text-center">
          <img :src="column.avatar && column.avatar.url" class="card-img-top rounded-circle border border-light w-25 my-3" :alt="column.title">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/columnDetail/${column._id}`" href="#" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../store'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = {
            url: require('@/assets/column.jpg')
          }
        }
        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img{
  width: 50px;
  height: 60px;
}
</style>