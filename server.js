const fs = require('fs');
const express = require('express')

const app = express()
 
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/upanh.html')
})
 
app.listen(process.env.PORT || 3000)