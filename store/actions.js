import { fetchUser, fetchItems, fetchIdsByType, publishByType } from "../api"

export default {
  nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      commit("UPDATE_USER_STATE", req.user)
    }
  },

  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch }, { type }) => {
    commit("SET_ACTIVE_TYPE", { type })
    return fetchIdsByType(type)
      .then(ids => commit("SET_LIST", { type, ids }))
      .then(() => dispatch("ENSURE_ACTIVE_ITEMS"))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch("FETCH_ITEMS", {
      ids: getters.activeIds
    })
  },

  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now()
    ids = ids.filter(id => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (ids.length) {
      return fetchItems(ids).then(items => commit("SET_ITEMS", { items }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit("SET_USER", { id, user }))
  },

  PREFETCH_USER_NEWTHINGS: ({ commit }, { type, userinput }) => {
    return commit("SET_USER_INPUT", { type, userinput })
  },

  PUBLISH_USER_NEWTHING: ({ dispatch, getters }) => {
    return dispatch("PUBLISH_API", {
      title: getters.userinput.title,
      uid: getters.user.uid,
      by: getters.user.name,
      byAvatar: getters.user.picture,
      // set only content this time
      lead: getters.userinputlead,
      content: getters.userinput.content,
      score: 0,
      type: getters.doctype,
      types: getters.draftdoctypes
    })
  },

  PUBLISH_API: ({ commit }, post) => {
    return publishByType(post).then(() => {
      console.log("DATA SET SUCCESS")
      commit("DONE_PUBLISH")
    })
  }
}
