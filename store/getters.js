export default {
  // current user
  user(state) {
    return state.user
  },
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  activeIds(state) {
    const { activeType, itemsPerPage, lists } = state

    if (!activeType) {
      return []
    }

    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * itemsPerPage
    const end = page * itemsPerPage

    return lists[activeType].slice(start, end)
  },

  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeItems(state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  },

  userinput(state) {
    return state.userinput
  },

  userinputlead(state) {
    return state.userinput.content.length > 10
      ? state.userinput.content.substring(0, 9) + "..."
      : state.userinput.content
  },

  doctype(state) {
    return state.userinput.userdoctype[0]
  },

  draftdoctypes(state) {
    let types = state.userinput.userdoctype
    let v = { top: true }
    types.forEach(ar => (v[ar] = true))
    return v
  },

  alldoctypes(state) {
    return Object.keys(state.lists)
  }
}
