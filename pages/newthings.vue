<template>
  <div class="view">
    <post-editor />
  </div>
</template>

<script>
import PostEditor from "~/components/PostEditor"

export default {
  head() {
    return {
      title: "Your new story here"
    }
  },
  components: {
    PostEditor
  },
  middleware: "isNotAuthenticated"
}
</script>

<style>
.view {
  width: 1000px;
  margin: 0 auto;
  padding: 3em;
  min-height: 1000px;
}
</style>
