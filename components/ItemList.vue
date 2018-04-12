<template>
  <div :class="{ 'view':type !== 'top' }">
    <h2 v-if="type !== 'top'" class="section-title u-padding-top20 u-padding-bottom20">
      Maybe you should {{ whatUserDo(type) }} this {{ type }}
    </h2>
    <div v-if="displayedPage > 0" :key="displayedPage">
      <transition-group tag="div" name="item" class="articles col3-articles">
        <item v-for="item in displayedItems" :key="item.id" :item="item" />
      </transition-group>
      <item-list-nav :type="type" :page="page" :max-page="maxPage" />
    </div>
  </div>
</template>

<script>
import Item from "./Item"
import ItemListNav from "./ItemListNav"

export default {
  name: "ItemList",
  components: {
    Item,
    ItemListNav
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage() {
      const { itemsPerPage, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    }
  },

  watch: {
    page(to, from) {
      console.log("Page changed", to, from)
      this.loadItems(to, from)
    }
  },

  async beforeMount() {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },

  methods: {
    loadItems(to = this.page, from = -1) {
      this.$nuxt.$loading.start()
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: this.type
        })
        .then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/${this.type}/1`)
            return
          }
          this.transition =
            from === -1 ? null : to > from ? "slide-left" : "slide-right"
          this.displayedPage = to
          this.displayedItems = this.$store.getters.activeItems
          this.$nuxt.$loading.finish()
        })
    },

    whatUserDo(type) {
      switch (type) {
        case "music":
          return "listen"
        case "code":
          return "read"
        case "art":
          return "view"
      }
    }
  }
}
</script>

<style scoped>
.view {
  width: 1000px;
  margin: 0 auto;
}
.section-title {
  font: inherit;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 1;
  padding: 0 20px;
}
.articles {
  padding: 20px;
  height: auto;
}
.col3-articles {
  display: flex;
  flex-direction: column;
  /* display: grid;
  grid-gap: 20px;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr; */
}
.article-item {
  margin-bottom: 10px;
}
.article-item .article-content .top-article-buttons .author-row {
  display: flex;
}
.article-item .article-content .top-article-buttons .author-row i {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  color: #fff;
  font-family: "ヒラギノ明朝 Pro W3", "ヒラギノ角ゴシック W3", sans-serif;
  font-size: 11px;
  font-weight: 600;
}
</style>
