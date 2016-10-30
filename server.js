var express = require('express');
var app = express();
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
 
var upload = multer({ storage: storage}).single('userFile');



app.get('/', function(request, response){

response.sendFile(__dirname + "/index.html"); 

});

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading 
      console.log(err);
    }
  
   var fileInfo = {
        "original name": req.file.originalname,
        "file size": req.file.size + " bytes",
        "date uploaded": new Date().toLocaleString(),
        "renamed to": req.file.filename
      };
      
      console.log(fileInfo);
      res.send(fileInfo);
  
  
  });
});

app.listen(process.env.PORT, function(){
   
   
       
          console.log("App is online at port " + process.env.PORT); 
          
  
   
   

    
});