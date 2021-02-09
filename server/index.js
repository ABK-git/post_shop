const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()

  // The root provides a resolver for each API endpoint
  const root = {
    hello: () => {
      return 'Hello World!'
    }
  }

  server.all('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})