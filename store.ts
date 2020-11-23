import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[],
  user: UserProps
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false, columnId: 1 }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'panghu' }
    },
    commitArticle(state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => state.columns.find(data => data.id === id),
    getPostsByCid: (state) => (cid: number) => state.posts.filter(data => data.columnId === cid) 
  }
})

export default store