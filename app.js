const express=require("express");
const bodyParser=require("body-parser");
const https = require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/app.html");
});
app.post("/",function(req,res){
  const email = req.body.Email;
  const name = req.body.fullName;
  const authorName = req.body.authorName;
  const userNumber = req.body.number;
  const data={
      members:[
          {
              email_address: email,
              status: "subscribed",
              merge_fields:
              {
                  FNAME:name,
                  AUTHOR:authorName,
                  PHONE:userNumber
              }
          }
      ]
  };
  const jsonData=JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/26fa75629a"
  const options = {
      method:"POST",
      auth:"Suraj:5baab6fde0c8abb6be99e421f6f593c7-us6"
  }
  const request = https.request(url,options,function(response){
    response.on("data",function(data){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
    });
  });
  request.write(jsonData);
  request.end();
});
app.listen(process.env.PORT || 3000,function() 
{
  console.log("Started");
});