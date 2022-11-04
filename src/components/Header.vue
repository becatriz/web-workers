<template>
  <header>
    <nav>
      <span  @click="handlePage('/')">HOME</span>
      <ul>
        <li @click="handlePage('/web-worker')">Web Worker</li>
        <li @click="handlePage('/text-encoder')">Transferables</li>
        <li @click="handlePage('/protobuf')">Protobuf</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handlePage(params) {
      this.$router.push(params);
    },
  },
};
</script>

<style scoped>
header {
  background: black;
  height: 50px;
}

nav {
  padding-top: 20px;
}

ul {
  display: flex;
  float: right;
  margin-right: 30px;
}
li {
  display: flex;
  color: aliceblue;
  list-style: none;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}

span {
  color: aliceblue;
  cursor: pointer;
}
</style>
