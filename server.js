const express = require('express')
const path = require('path')

const app = express()
const port = 8089

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, '0.0.0.0', () => console.log('Started listening on port', port))
