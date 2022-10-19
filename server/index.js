const express = require('express');
const app = express();

const port = 8000;
//require('./models');
//var userCtrl = require('./controller/userController');

app.get("/", (res,resp)=>{
  resp.send("Home Page");
});

/*
app.get("/oneToMany", userCtrl.oneToMany);
app.get("/belongsTo", userCtrl.belongsTo);
app.get("/manyToMany", userCtrl.manyToMany);
*/


app.listen(port,()=>{
  console.log(`App is listening at http://localhost:${port}`);
});