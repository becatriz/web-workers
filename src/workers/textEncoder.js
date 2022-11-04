/* eslint-disable no-debugger */

const workerContext = self;

function messageReceived(response) {
  const buffer = response.data;
  const decoder = new TextDecoder();

  const object = JSON.parse(decoder.decode(buffer));

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
