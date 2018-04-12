<template>
  <div>
    <a v-if="userinput.title.length > 0 && userinput.content.length > 0" class="publish" href="#" @click.stop.prevent="publish">publish</a>
    <a v-else class="publish unactive" href="#" @click.stop.prevent="">draft</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "PostPublishButtons",
  computed: mapGetters({
    userinput: "userinput"
  }),
  methods: {
    ...mapActions({
      publishUserNewThing: "PUBLISH_USER_NEWTHING"
    }),
    publish() {
      this.publishUserNewThing()
      this.$router.push("/top")
    }
  }
}
</script>

<style lang="stylus" scoped>
div {
  display: inline-block;
   .publish {
    color: #7572ff;
    font-weight: bold;
    font-size: 0.9em;
    margin: 0;
    margin-left: 5em;
  }
  .publish.unactive {
    color: #eee;
  }
}

</style>
