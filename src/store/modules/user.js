import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
//import apiCall from 'utils/api'

import { AUTH_LOGOUT } from '../actions/auth'
import axios from 'axios';
import Strapi from 'strapi-sdk-javascript';
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'


const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    commit(USER_REQUEST)
    //const userId=payload.userId;
    axios
    .get(apiUrl+'/users/me')
    .then(response => {
      console.log(response) 
      commit(USER_SUCCESS, response)
    })
    .catch(error => {
        commit(USER_ERROR)
        dispatch(AUTH_LOGOUT)
        console.log(error) 
    })

  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    //Vue.set(state, 'profile', resp)
    state.profile = resp.data
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
