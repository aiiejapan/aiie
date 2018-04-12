<template>
  <div :class="{ 'write-mode':$route.name === 'newthings' }" class="aiie-header-bar">
    <div class="header-active-button header-block u-flex-1">
      <div />
    </div>

    <div class="header-active-button u-flex-0">
      <user-avatar v-if="user" />
      <user-login-button v-if="!user" />
    </div>

    <div :class="{ 'write-mode':$route.name === 'newthings' }" class="u-full-width u-text-center logowrap">
      <div class="logo">
        <router-link to="/top">
          <app-logo />
        </router-link>
      </div>
      <span v-if="$route.name === 'newthings'" class="write-form-status">draft mode</span>
      <post-publish-button v-if="$route.name === 'newthings'" />
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex"
import AppLogo from "~/components/AppLogo"
import UserLoginButton from "~/components/UserLoginButton"
import PostPublishButton from "~/components/PostPublishButton"
import UserAvatar from "~/components/UserAvatar"

export default {
  components: {
    AppLogo,
    UserLoginButton,
    PostPublishButton,
    UserAvatar
  },
  computed: mapGetters({
    user: "user"
  })
}
</script>

<style scoped>
.aiie-header-bar {
  background: #fff;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.aiie-header-bar.write-mode {
  background: transparent !important;
  /* background: linear-gradient(to right, #f2f2f2 0%, #ffffff 7%); */
}
.header-bar-block {
  display: flex;
  justify-content: space-between;
}
.header-active-button {
  z-index: 10;
}
.logowrap {
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logowrap.write-mode {
  justify-content: flex-start;
}
.logo {
  width: 78px;
  display: block;
}
.logowrap.write-mode .logo {
  width: 58px;
}
.logo img {
  width: 100%;
}
.write-form-status {
  color: rgba(0, 0, 0, 0.44);
  text-transform: uppercase;
  margin-left: 10px;
  font-size: 11px;
  font-family: menlo, sans-serif;
}
</style>
