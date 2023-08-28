require('dotenv').config()

const PORT = process.env.PORT || 3000;
let MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.goqfs8s.mongodb.net/?retryWrites=true&w=majority'

if(process.env.NODE_ENV === 'test'){
  MONGODB_URI = ''
}

module.exports={ MONGODB_URI,PORT }