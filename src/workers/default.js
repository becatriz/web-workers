const workerContext = self;

const evenNumbers = []

function messageReceived(response) {
  response.data.forEach((item, index) => {
    item.sum =  item.albumId + response.data[index].albumId;

    if((item.albumId % 2) == 0){
      evenNumbers.push(item.albumId)
    }
  })

  workerContext.postMessage({
    obj: response.data,
    even: evenNumbers
  });
}

workerContext.onmessage = messageReceived;
