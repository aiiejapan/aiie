import Vuex from "vuex"

import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

export default () => {
  return new Vuex.Store({
    state: {
      user: null,
      activeType: null,
      itemsPerPage: 10,
      items: {
        /* [id: number]: Item */
      },
      users: {
        /* [id: string]: User */
      },
      userinput: {
        title: "",
        content: "",
        userdoctype: []
      },
      lists: {
        top: [],
        music: [],
        code: [],
        art: []
      }
    },
    actions,
    mutations,
    getters
  })
}
