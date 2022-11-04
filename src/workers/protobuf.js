/* eslint-disable no-debugger */

import Pbf from "pbf";
import userProto from "./user.proto";

const workerContext = self;

const User = userProto.User;

function messageReceived(response) {
  const buffer = response.data;

  var pbf = new Pbf(buffer);
  var object = User.read(pbf);

  if (object.method === "GET") {
    const t1 = performance.now();
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => {
        const t2 = performance.now();
        workerContext.postMessage({
          obj: json,
          time: "Call to doSomething took " + (t1 - t2) + " milliseconds.",
        });
      });
  }
}

workerContext.onmessage = messageReceived;
