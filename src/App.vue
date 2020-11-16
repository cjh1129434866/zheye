<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
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
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      user: currentUser
    }
  }
})
</script>

<style>
</style>
