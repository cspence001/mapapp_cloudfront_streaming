var pump = require('pump')
var fs = require('fs')

//mississippi
var miss = require('mississippi')

var source = fs.createReadStream('/dev/random')
var dest = fs.createWriteStream('/dev/null')


pump(source, dest, function(err) {
  console.log('pipe finished', err)
})

//You can use pump to pipe more than two streams together as well
var transform = miss.through(
    function (chunk, enc, cb) {
      cb(null, chunk.toString().toUpperCase())
    },
    function (cb) {
      cb(null, 'ONE LAST BIT OF UPPERCASE')
    }
  )

pump(source, transform, anotherTransform, dest, function(err) {
    console.log('pipe finished', err)
  })

setTimeout(function() {
  dest.destroy() // when dest is closed pump will destroy source
}, 1000)


// import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketExampleService {

//   readonly url = "(wss|https)://<id>.cloudfront.net/";

//   subject: WebSocketSubject<any>;

//   constructor() {
//     this.subject = webSocket({
//       url: this.url,
//       deserializer: msg => msg
//     });
//   }
// }