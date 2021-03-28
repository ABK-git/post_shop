

if(process.env.NODE_ENV === 'production'){
  module.exports = require("./prod");
}else{
  module.exports = require("./dev")
}

//mongodb+srv://test:testtest@cluster0.sy4up.mongodb.net/postShopDb?retryWrites=true&w=majority