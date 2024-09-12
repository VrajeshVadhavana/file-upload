var express = require("express");
var app = express();
var port = process.env.PORT || 9090;
var fs = require("fs");
var Formidable = require("formidable");
app.set("view engine","hbs");
app.use(express.json());
app.get("/",(req,res)=>{
    res.render("index");
});
var op,np;
app.post("/post_data",(req,res)=>{
    var Form = new Formidable.IncomingForm();
    Form.parse(req,(err,emp,obj)=>{
        if(err){
            console.log("Error");
        }
        else{
            op = obj.u_file[0].filepath;
            np = __dirname+"/uploads/"+obj.u_file[0].originalFilename;
            fs.rename(op,np,(err)=>{
                if(err){
                    console.log("Error");
                }
                else{
                    console.log("file uploaded successfully");
                    //res.render("index")
                }
            })
        }
    })
})
app.listen(port,(err)=>{
    if(err){
        console.log("Error");
    }
    else{
        console.log("http://localhost:"+port);
    }
});
