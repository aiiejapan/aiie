<template>
  <li>
    <a @click.stop.prevent="logout">logout</a>
  </li>
</template>

<script>
import firebase from "firebase"

export default {
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut()
        this.setCookie()

        this.$store.commit("UPDATE_USER_STATE", null)
        this.redirect()
      } catch (error) {
        console.log(error)
      }
    },
    setCookie() {
      document.cookie = `__session=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
    },
    redirect() {
      this.$router.push("/login")
    }
  }
}
</script>
<style lang="stylus" scoped>
a {
  cursor pointer
}
</style>
