<template>
  <ul v-if="user">
    <li class="avatar">
      <a href="#" @click.stop.prevent="toggleUser">
        <img :src="user.photoURL || user.picture" alt="">
      </a>
      <ul :class="{ active: usermenuActive }" class="usermenu">
        <li><router-link to="/newthings/">NEW</router-link></li>
        <user-logout-button />
      </ul>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex"
import UserLogoutButton from "~/components/UserLogoutButton"
export default {
  components: {
    UserLogoutButton
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
<style scoped>
.avatar {
  position: relative;
  width: 32px;
  height: 32px;
}

.avatar > a {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
}

.usermenu {
  display: none;
  transition: all 0.6s ease;
  box-shadow: 0 13px 12px rgba(0, 0, 0, 0.1), 0 0px 0px rgba(0, 0, 0, 0);
  border-radius: 6px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: #fff;
  width: 96px;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  z-index: 10;
}

.usermenu li {
  display: block;
  box-sizing: border-box;
  text-align: center;
  font-family: "Apple Casual", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 100;
  font-size: 14px;
  text-transform: capitalize;
  line-height: 24px;
  padding: 7px 25px;
  color: rgba(0, 0, 0, 0.6);
}
.usermenu.active {
  display: block;
  transform: translateX(-50%) translateY(0);
}
</style>
