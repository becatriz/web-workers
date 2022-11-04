<template>
  <div>
    <p>{{ time }}</p>
    <section class="card">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="item" v-for="item in output" :key="item.id">
        <img :src="item.thumbnailUrl" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import Pbf from 'pbf';
import album from '../workers/album.proto';

const Album = album.Photos;

const worker = new Worker('../workers/protobuf.js', { type: 'module' });

export default {
  name: 'Protobuf',
  props: {
    msg: String
  },
  data: () => ({
    output: '',
    time: '',
    isLoading: true,
    timeOne: '',
    even: []
  }),
  created() {
    this.timeOne = performance.now();
    worker.onmessage = this.messageReceivedCallback;
    this.sendWorkerMessage();
  },
  methods: {
    async sendWorkerMessage() {
      const pbf = new Pbf();
    
      const response = await fetch("https://jsonplaceholder.typicode.com/photos");
      const parseJson = await response.json();

      Album.write({
        data: parseJson
      }, pbf);

      const array = pbf.finish();

      //Aqui existe os dados, e a referencia não sera clonada. So estara disponivel no worker
      console.log(array);

      worker.postMessage(array, [array.buffer]);

      // Não existe mais a referencia ao dado
      console.log(array);
    },
    messageReceivedCallback(response) {
      this.output = response.data.obj;
      this.even =  response.data.even;
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
