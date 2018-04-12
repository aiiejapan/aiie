import Vue from "vue"

export default {
  UPDATE_USER_STATE(state, payload) {
    state.user = payload
  },

  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },

  SET_USER_INPUT: (state, { type, userinput }) => {
    state.userinput[type] = userinput
  },

  DONE: () => {
    return
  },

  DONE_PUBLISH: state => {
    state.userinput.title = ""
    state.userinput.content = ""
    state.userinput.userdoctype = []
  }
}
