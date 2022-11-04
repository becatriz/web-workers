<template>
  <div>
    <span>{{ time }}</span>
    <section class="card">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="item" v-for="item in output" :key="item.id">
        <img :src="item.thumbnailUrl" alt="">
      </div>
    </section>
  </div>
</template>

<script>
const worker = new Worker("../workers/default.js", { type: "module" });

export default {
  name: "WebWorker",
  props: {
    msg: String,
  },
  data: () => ({
    output: "",
    time: "",
    timeOne: '',
    isLoading: true
  }),
  created() {
    this.timeOne = performance.now();
    worker.onmessage = this.messageReceivedCallback;
    this.sendWorkerMessage();
  },
  methods: {
    async sendWorkerMessage() {
      const response = await fetch("https://jsonplaceholder.typicode.com/photos");
      const parseJson = await response.json();

      // Aqui Strictured Clone, existe a referencia ao dado aqui e no worker
      console.log(parseJson)

      worker.postMessage(parseJson);

      // Aqui na main thread ainda temos essa mesma referencia
      console.log(parseJson)
    },
    messageReceivedCallback(response) {
      this.output = response.data.obj;
      this.time = this.timeOne - performance.now();
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
