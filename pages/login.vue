<template>
  <div class="container">
    <h2>aiie</h2>
    <h3>Join aiie.</h3>
    <p>Sign in to access your personalized aiie page.</p>
    <login-button />
  </div>
</template>

<script>
import UserLoginButton from "~/components/UserLoginButton"
export default {
  components: {
    UserLoginButton
  },
  middleware: "isAuthenticated"
}
</script>
<style lang="stylus" scoped>
  .container {
    width: 400px;
    min-height: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 50px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 20px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
</style>
