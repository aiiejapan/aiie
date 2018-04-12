<template>
  <div class="post-editor">
    <div class="deb-type-selector">
      <div>
        <input
          id="typemusic"
          v-model="checkedDocTypes"
          value="music"
          class="deb-font"
          type="checkbox"
          @change="selectUserDoc">
        <label for="typemusic">music</label>
      </div>
      <div>
        <input
          id="typecode"
          v-model="checkedDocTypes"
          value="code"
          class="deb-font"
          type="checkbox"
          @change="selectUserDoc">
        <label for="typecode">code</label>
      </div>
      <div>
        <input
          id="typeart"
          v-model="checkedDocTypes"
          value="art"
          class="deb-font"
          type="checkbox"
          @change="selectUserDoc">
        <label for="typeart">art</label>
      </div>
    </div>
    <input
      v-model="userinputTitle"
      type="text"
      autofocus="true"
      placeholder="title"
      class="usr-input-title"
      @input="bindUserInput({ type: 'title', userinput: userinputTitle })">
    <textarea
      v-model="userinputContent"
      cols="20"
      rows="8"
      class="usr-input-content"
      @input="bindUserInput({ type: 'content', userinput: userinputContent })"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
  head() {
    return {
      title: "newthings"
    }
  },
  middleware: "isNotAuthenticated",
  data: function() {
    return {
      userinputTitle: "Make content title",
      userinputContent: "Make content text at here",
      checkedDocTypes: []
    }
  },
  computed: mapGetters({
    user: "user",
    userinput: "userinput",
    userdoctype: "userdoctype"
  }),
  methods: {
    ...mapActions({
      draftUserContent: "PREFETCH_USER_NEWTHINGS"
    }),

    bindUserInput({ type, userinput }) {
      this.draftUserContent({ type, userinput })
    },

    selectUserDoc() {
      this.draftUserContent({
        type: "userdoctype",
        userinput: this.checkedDocTypes
      })
    }
  }
}
</script>
<style scoped>
.container {
  font-family: "Monaco", monospace;
  font-size: 11px;
  border: 1px solid #999;
  border-radius: 4px;
  width: 800px;
  margin: 20px auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.3em;
}
.vertical-layout {
  display: flex;
}

.vertical-layout > section {
  flex-basis: 50%;
}

input {
  display: block;
  max-width: 100%;
  border: 0;
  color: #999;
  outline: none;
  padding: 0.2em;
  margin-bottom: 10px;
}
textarea {
  display: block;
  width: 100%;
  resize: none;
  border: 0;
  outline: none;
  padding: 0.2em;
}
.deb-uid {
  color: #999;
  font-family: "Monaco", monospace;
}
.deb-type-selector {
  margin-top: 20px;
  box-sizing: border-box;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
}
.deb-type-selector > div {
  display: flex;
  align-items: baseline;
}
.deb-type-selector label {
  margin-left: 5px;
}
.deb-font {
  color: #999;
  font-family: "Monaco", monospace;
}
.usr-input-title {
  box-sizing: border-box;
  padding: 0 2%;
  font-family: "Avenir Light", sans-serif;
  font-weight: 100;
  margin-top: 20px;
  font-size: 20px;
  color: #28314b;
}
.usr-input-content {
  box-sizing: border-box;
  padding: 0 2%;
  font-family: "Avenir Light", sans-serif;
  font-weight: 100;
  margin-top: 20px;
  font-size: 12px;
  line-height: 1.6;
  color: #28314b;
}
#toc h1 {
  font-size: 30px;
}
</style>
