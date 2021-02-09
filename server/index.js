const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

//databaseに接続
const db = require("./database");
db.connect();

app.prepare().then(() => {
  //server取得
  const server = express();
  //apolloServerの生成
  const apolloServer = require("./graphql").createApolloServer();
  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
