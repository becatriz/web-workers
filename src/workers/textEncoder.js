/* eslint-disable no-debugger */

const workerContext = self;

const evenNumbers = []

function messageReceived(response) {
  const buffer = response.data;
  const decoder = new TextDecoder();

  const object = JSON.parse(decoder.decode(buffer));

  object.forEach((item, index) => {
    item.sum =  item.albumId + object[index].albumId;

    if((item.albumId % 2) == 0){
      evenNumbers.push(item.albumId)
    }
  })

  workerContext.postMessage({
    obj: object,
    even: evenNumbers
  });
}

workerContext.onmessage = messageReceived;
