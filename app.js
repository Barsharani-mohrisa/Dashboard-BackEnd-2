const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require("cors");

// var corsOptions = {
//   origin: "http://localhost:5501"
// };
// app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());

const port = 5500;
require('./app/models');
var userCtrl = require('./app/controller/userController');

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      'image/jpeg':'.jpeg',
      'image/jpg':'.jpg',
      'image/png':'.png',
      'image/gif':'.gif'
    }
    const uniqueSuffix = Date.now() + '-' + mimeExtension[file.mimetype]
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.get("/", (res,resp)=>{
  resp.send("Home Page");
});

app.get("/add", userCtrl.addUser);
app.get("/get", userCtrl.User);

app.get("/validation", userCtrl.Validationconst);
app.get("/oneToOne", userCtrl.oneToOne);
app.get("/belongsTo", userCtrl.belongsTo);


app.get("/oneToMany", userCtrl.oneToMany);
app.get("/belongsTo", userCtrl.belongsTo);
app.get("/manyToMany", userCtrl.manyToMany);

app.post("/add_supervisior", userCtrl.add_supervisior);
app.post("/add_security", userCtrl.add_security);
app.post("/add_staff", userCtrl.add_staff);
app.post("/create_notice", upload.single('media'),userCtrl.create_notice);


app.post("/multer", upload.single('profile_pic'),userCtrl.multer);






app.listen(port,()=>{
  console.log(`App is listening at http://localhost:${port}`);
});