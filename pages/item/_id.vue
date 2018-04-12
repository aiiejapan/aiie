<template>
  <div v-if="item" class="item-view view">
    <h1>{{ item.title }}</h1>
    <div v-html="item.content" />
  </div>
</template>

<script>
export default {
  name: "ItemView",

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  },

  head() {
    return {
      title: this.item.title
    }
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch("FETCH_ITEMS", { ids: [id] })
  }
}
</script>
<style>
.item-view {
  height: 100vw;
  max-height: 100%;
}
.item-view h1 {
  font-size: 40px;
  margin: 20px;
}
</style>
