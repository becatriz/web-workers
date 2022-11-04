<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="sendWorkerMessage">Send message</button>
    <p class="performance">{{ time }}</p>
    <p>{{ output }}</p>
  </div>
</template>

<script>
import Pbf from 'pbf';
import userProto from '../workers/user.proto';

const User = userProto.User;

const worker = new Worker('../workers/protobuf.js', { type: 'module' });

export default {
  name: 'TextEncoder',
  props: {
    msg: String
  },
  data: () => ({
    output: '',
    time:''
  }),
  created() {
    worker.onmessage = this.messageReceivedCallback;
  },
  methods: {
    sendWorkerMessage() {
      const pbf = new Pbf();
      User.write({ method: 'GET'}, pbf);
      const array = pbf.finish();

      worker.postMessage(array, [array.buffer]);
    },
    messageReceivedCallback(response) {
      this.output = response.data.obj[0];
      this.time = response.data.time;
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.performance{
  background: #42b983;
}
</style>
