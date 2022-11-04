<template>
  <section class="card">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="item" v-for="item in output" :key="item.id">
      <img :src="item.thumbnailUrl" alt="">
    </div>
  </section>
</template>

<script>
const worker = new Worker("../workers/default.js", { type: "module" });
/*
{ "albumId": 1, "id": 1, 
"title": "accusamus beatae ad facilis cum similique qui sunt", 
"url": "https://via.placeholder.com/600/92c952", 
"thumbnailUrl": "https://via.placeholder.com/150/92c952" }
*/
export default {
  name: "WebWorker",
  props: {
    msg: String,
  },
  data: () => ({
    output: "",
    time: "",
    isLoading: true
  }),
  created() {
    worker.onmessage = this.messageReceivedCallback;
    this.sendWorkerMessage();
  },
  methods: {
    sendWorkerMessage() {
      worker.postMessage({ method: "GET" });
    },
    messageReceivedCallback(response) {
      this.output = response.data.obj;
      this.time = response.data.time;
      this.isLoading = false
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
 
}


.item {
  border: 1px solid red;
  padding: 16px;
  align-items: center;
  text-align: center;
}
</style>
