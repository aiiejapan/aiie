<template>
  <div
    :class="{
      'fullwidth-nav-wrap u-full-width': classname === 'fullwidth-nav'
  }">
    <div
      :class="{
        'fullwidth-nav': classname === 'fullwidth-nav'
    }">
      <ul
        :class="{
          'u-full-width': classname === 'fullwidth-nav'
        }"
        class="nav-wrap"
      >
        <li v-for="(topic, index) in list" :key="index">
          <router-link :to="'/' + topic">{{ topic }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classname: {
      type: String,
      default: "",
      required: false
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
.fullwidth-nav-wrap {
  /* position: -webkit-sticky;
  position: sticky;
  top: 0; */
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}
.fullwidth-nav {
  padding: 0 20px;
  width: 1000px;
  margin: 0 auto;
}
.fullwidth-nav .nav-wrap {
  display: flex;
}

.fullwidth-nav .nav-wrap li {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

.fullwidth-nav .nav-wrap li:not(:first-of-type) {
  margin-left: 24px;
}

.fullwidth-nav .nav-wrap li a {
  position: relative;
  color: rgba(0, 0, 0, 0.64);
  font-size: 13px;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.3s cubic-bezier(0.77, 0, 0.175, 1);
}
.fullwidth-nav .nav-wrap li a:after {
  content: "";
  width: 100%;
  overflow-x: hidden;
  height: 1px;
  background: rgba(0, 0, 0, 0.88);
  position: absolute;
  bottom: 0px;
  transform: translateY(2px) translateX(-200%);
  transition: opacity, transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
}
.fullwidth-nav .nav-wrap li a:hover {
  color: rgba(0, 0, 0, 0.88);
}
.fullwidth-nav .nav-wrap li a:hover:after {
  transform: translateY(2px) translateX(-100%);
}
</style>
