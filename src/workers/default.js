const workerContext = self;

function messageReceived(response) {
  if (response.data.method === "GET") {
    const t1 = performance.now();
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => {
        const t2 = performance.now();

        json.flat().forEach((item) => {
          item.newProp = "Uma prop a mais";
        });

        workerContext.postMessage({
          obj: json,
          time: "Call to doSomething took " + (t1 - t2) + " milliseconds.",
        });
      });
  }
}

workerContext.onmessage = messageReceived;
