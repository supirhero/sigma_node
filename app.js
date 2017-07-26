const express = require('express')
const path = require('path')

const app = express()
const port = 8089

var TARGET = process.env.npm_lifecycle_event;
console.log("target: ",TARGET);

if (TARGET === "build") {
 console.log("Running your build tasks!");
}

if (TARGET === "development") {
 console.log("Running the dev server!");
}

if (TARGET === "start") {
 console.log(`Running App in production!`);
}

app.use(express.static(path.join(__dirname, '/src')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.listen(port, '0.0.0.0', () => console.log('Started listening on port', port))
