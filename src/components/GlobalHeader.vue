<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <drop-down :title="`你好 ${user.nickName}`">
          <dropdown-item><router-link to="/createArticle" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item><router-link :to="`/columnDetail/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item" @click.prevent="loginOut">退出登录</a></dropdown-item>
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DropDown from '@/components/DropDown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { UserProps } from '../store'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginOut = () => {
      store.commit('loginOut')
      router.push('/login')
    }
    return {
      loginOut
    }
  }
})
</script>