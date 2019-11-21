import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    detailquestion: null,
    myquestions: []
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.isLogin = payload
    },
    FETCH_DATA(state, payload){
      state.questions = payload
    },
    FETCH_DETAIL(state, payload){
      state.detailquestion = payload
    },
    FETCH_DATA_USER(state, payload){
      state.myquestions = payload
    }
  },
  actions: {
    auth(context, payload){
      if(localStorage.getItem('token')){
        context.commit('SET_LOGIN', true)
      } else {
        context.commit('SET_LOGIN', false)
      }
    },
    login(context, payload){
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/user/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({data}) =>{
            resolve(data)
            console.log(data, 'bbbbbbbbb')
          })
          .catch(({response}) => {
            reject(response)
        })
      })
    },
    register(context, payload){
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/user/register',
          data: {
            email: payload.email,
            password: payload.password,
            username: payload.username
          }
        })
          .then(({data})=>{
            resolve(data)
          })
          .catch(({response}) => {
            console.log(response)
            reject(response)
          })
      })
    },
    search({commit}, payload){
      axios({
        method: 'GET',
        url: `/question/search?q=${payload}`,
      })
      .then(({data}) => {
        commit('FETCH_PRODUCTS', data)
      })
      .catch(({response}) => {
        this.next(response.data)
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        localStorage.clear('')
        commit('SET_LOGIN', false)
        resolve()
      })
    },
    fetchquestion({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/question'
        })
        .then(({data}) => {
          commit('FETCH_DATA', data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    addquestions({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/question',
          data: payload
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
      
    },
    detailquestion({commit}, payload){
      axios({
        method:'GET',
        url: `/question/${payload}`
      })
      .then(({data}) => {
        commit('FETCH_DETAIL', data)
      })
      .catch(({response}) => {
        this.next(response.data)
      }) 
    },
    addanswer({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `/comment/${payload.id}`,
          data: {
            description: payload.description
          }
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    upvote({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/question/up/${payload}`
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    downvote({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url:`question/down/${payload}`
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    upvoteanswer({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url:`comment/${payload}/up`
        })
        .then( ({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    downvoteanswer({commit}, payload){
      new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url:`comment/${payload}/down`
        })
        .then( ({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    myquestion({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/question/user'
        })
        .then(({data}) => {
          commit('FETCH_DATA_USER', data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    updatequestions({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: `/question/${payload.id}`,
          data: {
            description: payload.description,
            title: payload.title,
            tags: payload.tags
          }
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    }
  
  }
})
