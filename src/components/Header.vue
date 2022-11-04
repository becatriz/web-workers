<template>
  <header>
    <nav>
      <span>HOME</span>
      <ul>
        <li @click="handlePage">Web Worker</li>
        <li>Transferables</li>
        <li>Protobuf</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handlePage() {
      this.$router.push("/web-worker");
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
