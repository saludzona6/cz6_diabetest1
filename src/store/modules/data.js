import { DATA_REQUEST, DATA_ERROR, DATA_SUCCESS } from '../actions/data'

import Strapi from 'strapi-sdk-javascript';
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

const state = { data: {} }

const getters = {
  getData: state => state.data
}

const actions = {
  [DATA_REQUEST]: ({commit, dispatch}) => {
    commit(DATA_REQUEST)

    strapi.request('post', '/graphql', {
        data: {
          query: `query {
                establecimientos {
                  id
                  nombre
                }
                provincias {
                  id
                  nombre
                }
                formadebuts {
                  id
                  nombre
                }
                perfilanaliticos{
                  id
                  nombre
                }
                cie10S{
                  id
                  codigo
                  descripcion
                }
                tipoinsulinas{
                  id
                  nombre
                  tipo
                  tipo_reemplazo
                }
            }
            `
        }
    }).then(response=>{
        commit(DATA_SUCCESS, response)
    }).catch(error=>{
        commit(DATA_ERROR)
    })
  },
}

const mutations = {
  [DATA_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [DATA_SUCCESS]: (state, resp) => {
    state.status = 'success'
    //Vue.set(state, 'profile', resp)
    state.data = resp.data
  },
  [DATA_ERROR]: (state) => {
    state.status = 'error'
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
