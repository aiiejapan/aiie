import TopicGenresNav from "./TopicGenresNav.vue"
import { mapGetters } from "vuex"

export default function topicGenres(layout) {
  return {
    computed: {
      ...mapGetters({ list: "alldoctypes" })
    },
    render(h) {
      return h(TopicGenresNav, {
        props: {
          list: this.list,
          classname: layout
        }
      })
    }
  }
}
