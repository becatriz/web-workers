/* eslint-disable no-debugger */

import Pbf from "pbf";
import album from "./album.proto";

const workerContext = self;

const Album = album.Photos;

const evenNumbers = []

function messageReceived(response) {
  const buffer = response.data;

  var pbf = new Pbf(buffer);
  var array = Album.read(pbf);

  array.data.forEach((item, index) => {
    item.sum =  item.albumId + array.data[index].albumId;

    if((item.albumId % 2) == 0){
      evenNumbers.push(item.albumId)
    }
  })

  workerContext.postMessage({
    obj: array.data,
    even: evenNumbers
  });
}

workerContext.onmessage = messageReceived;
