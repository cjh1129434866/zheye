import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GlobalDtaProps {
  columns: ColumnProps[];
  posts: PostProps[],
  user: UserProps
}
const store = createStore<GlobalDtaProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'panghu' }
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => state.columns.find(data => data.id === id),
    getPostsByCid: (state) => (cid: number) => state.posts.filter(data => data.id === cid) 
  }
})

export default store