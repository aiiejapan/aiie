<template>
  <div id="app">
    <app-header />
    <app-nav v-if="$route.name !== 'newthings'" />
    <main class="app-main">
      <nuxt nuxt-child-key="none" />
      <app-footer />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppHeader from "~/components/AppHeader"
import AppFooter from "~/components/AppFooter"
import AppNav from "~/components/AppNav"

export default {
  components: {
    AppHeader,
    AppFooter,
    AppNav
  },
  head() {
    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: "canonical", href: `https://aiie.jp${this.$route.path}` }
      ]
    }
  },
  data: function() {
    return {
      usermenuActive: false
    }
  },
  computed: mapGetters({
    user: "user"
  }),
  methods: {
    toggleUser: function() {
      this.usermenuActive = !this.usermenuActive
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  outline: 0;
  background: #ffffff;
}
.app-main {
  padding: 20px;
  padding-bottom: 0px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
