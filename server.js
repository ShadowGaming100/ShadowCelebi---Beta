const express = require('express')
  const app = express()
  const port = 3176
  const path = require('path');

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
  })
