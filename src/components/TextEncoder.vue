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
const worker = new Worker('../workers/textEncoder.js', { type: 'module' });

export default {
  name: 'TextEncoder',
  props: {
    msg: String
  },
  data: () => ({
    output: '',
    time: '',
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

      const encoder = new TextEncoder();
      const array = encoder.encode(JSON.stringify(parseJson));

      //Aqui existe os dados, e a referencia não sera clonada. So estara disponivel no worker
      console.log(array)

      worker.postMessage(array, [array.buffer]);

       // Não existe mais a referencia ao dado
      console.log(array)
    },
    messageReceivedCallback(response) {
      this.output = response.data.obj;
      this.time = this.timeOne - performance.now();
      this.isLoading = false
    },
  }
}
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
