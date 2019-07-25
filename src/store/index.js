import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const resourceHost = 'https://143.248.39.49:4500'

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {

  },
  mutations: {
    LOGIN (state, {data}) {
      state.accessToken = data
    },
    LOGOUT (state) {
      state.accessToken = null
    }
  },
  actions: {
    LOGIN ({commit}, {username, password}) {
      console.log(username);
      console.log(password);
      return axios.post(`${resourceHost}/auth/signin`,
        {'username': username,
          'password': password})
        .then( ({data}) => {
          if(data.success){
            commit('LOGIN', data)
            // 모든 header에 Authorization token 추가
            axios.defaults.headers.common['x-access-token'] = `${data.data}`
            console.log("로그인 성공! 토큰 받았다!!")
          } else {
            if(data.errors){
              var err = data.errors
            }
            console.log(err)
            throw err
          }
        })
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    }
  }
})
