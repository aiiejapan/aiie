<template>
  <div class="article-item">
    <div class="article-cover" style="background-image: url();"/>
    <div
      :class="{
        'article-content-music':item.type === 'music',
        'article-content-code':item.type === 'code',
        'article-content-art':item.type === 'art'
      }"
      class="article-content">
      <router-link :to="'/item/' + item.id">
        <h3>{{ item.title }}</h3>
      </router-link>
      <p>{{ item.lead || "no lead" }}</p>
      <div class="article-buttons">
        <div class="article-buttons-row row-icons">
          <span>
            <img src="~/assets/icons/chat.svg">
            128
          </span>
          <span>
            <img src="~/assets/icons/heart.svg">
            {{ item.score }}
          </span>
        </div>
        <div class="article-buttons-row author-row">
          <i>{{ item.by }}</i>
          <span class="author">
            <img :src="item.byAvatar" alt="">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from "~/plugins/filters"

export default {
  name: "NewsItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time } }) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style scoped>
.article-item {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  min-height: 128px;
}
.article-item .article-cover {
  z-index: 0;
  filter: brightness(6) saturate(10);
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
}
.article-item .article-content {
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  margin: 0;
  padding: 20px;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
}
.article-item a {
  text-decoration: none;
}
.article-item .article-content-music {
  background-color: rgba(242, 55, 8, 0.6) !important;
}
.article-item .article-content-code {
  background-color: rgba(63, 0, 255, 0.6) !important;
}
.article-item .article-content-art {
  background-color: rgba(255, 0, 193, 0.6) !important;
}
.article-item .article-content h3 {
  font-family: "ヒラギノ明朝 Pro W3", "ヒラギノ角ゴシック W3", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.article-item .article-content p {
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "ヒラギノ明朝 Pro W3", "ヒラギノ角ゴシック W3", sans-serif;
  font-size: 11px;
  line-height: 1.3;
  font-weight: 100;
  color: #fff;
}
.article-item .article-content .article-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.article-item .article-content .article-buttons .row-icons span {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #fff;
  font-size: 11px;
}
.article-item
  .article-content
  .article-buttons
  .row-icons
  span:not(:first-of-type) {
  margin-left: 10px;
}
.article-item .article-content .article-buttons .author-row {
  display: flex;
}
.article-item .article-content .article-buttons .author-row i {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  color: #fff;
  font-family: "ヒラギノ明朝 Pro W3", "ヒラギノ角ゴシック W3", sans-serif;
  font-size: 11px;
  font-weight: 600;
}
.article-item .article-content .author {
  background: #fff;
  border: 1px solid #eee;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  align-self: flex-end;
}
.article-item .article-content .author img {
  width: 100%;
}
</style>
