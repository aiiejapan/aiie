<template>
  <div class="aiie-footer">
    <ul>
      <li>© 2018 Aiie</li>
      <li><a href="#">Terms</a></li>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Help</a></li>
    </ul>
  </div>
</template>

<style scoped>
.aiie-footer {
  border-top: 1px solid #eee;
  width: 1000px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 20px;
}
.aiie-footer ul {
  display: flex;
}
.aiie-footer li,
.aiie-footer a {
  font-size: 12px;
  color: #585858;
}
.aiie-footer li {
  font-weight: 900;
}
.aiie-footer li:not(:first-of-type) {
  margin-left: 20px;
}
.aiie-footer a {
  font-weight: 100;
  text-decoration: none;
}
</style>
