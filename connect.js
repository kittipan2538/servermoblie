const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.listen(3000,()=>console.log('server running on port 3000'));

const db = mysql.createConnection({
    host: "119.59.96.90",
    user: "projectoldhappy_admin",
    password: "ytAb49*72",
    database: "projectoldhappy_db",
    port: "3306"
})


app.post('/upcertificate',(req,res)=>{
  const certificate=req.body.certificate;
  const userID=req.body.userID
  const upcertificate="call upcertificate(?,?)";
  db.query(upcertificate,[certificate,userID],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result[0]);
    }
  })

})

app.put('/updatecertificate',(req,res)=>{
  const certificate=req.body.certificate;
  const userID=req.body.userID
  const updatecertificate="call updatecertificate(?,?)";
  db.query(updatecertificate,[certificate,userID],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result[0]); 
    }
  })

})  

app.get('/getcertificate',(req,res)=>{
  const userID=req.query.userID
  const getcertificate = "call getcertificate(?)";
  db.query(getcertificate,[userID],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
      console.log(result[0])
    }
  })
}) 

app.post("/registermb", (req, res) => {
    const email = req.body.email;
    const passwords = req.body.passwords;
    const tel = req.body.tel;
    const status = req.body.status;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Id_card_no = req.body.Id_card_no;
    const registermb = "call registermb(?,?,?,?,?,?,?)";
    db.query(registermb, [email, passwords,tel,status,Fname,Lname,Id_card_no], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    });
  });

  app.get("/loginmb", (req, res) => {
    const email = req.query.email;
    const passwords = req.query.passwords;
    const loginmb = "call loginmb(?,?)";
    db.query(loginmb, [email, passwords], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result[0].length > 0) {
        if (result[0][0].statususer == 0){
          res.send(result[0]);
        }else {
          console.log("baned user");
          res.status(401).send();
        }
      } else {
        console.log("Wrong Email or Password");
        res.send(false);
      }
    });
  });

  app.get('/Customer',(req,res)=>{
    db.query("SELECT * FROM Customer",(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    })
  })

  app.get('/gettourdetails',(req,res)=>{
    const details=req.query.details;
    const fullnames=req.query.fullname;
    const days=req.query.days;
    const times=req.query.times;
    const tour_picture=req.body.tour_picture;
    const quantitys=req.query.quantitys;
    const remainders=req.query.remainders;
    const gettourdetails="call gettourdetails(?,?,?,?,?,?,?)";
    db.query(gettourdetails,[details,fullnames,days,times,tour_picture,quantitys,remainders],(err,result)=>{
    res.send(result[0])});
  })

  app.post('/createprofile',(req,res)=>{
    
    const Fname=req.body.Fname;
    const Lname=req.body.Lname;
    const Id_card_no=req.body.Id_card_no;
    const userID=req.body.userID

    const createprofile="call createprofile(?,?,?,?)";
    db.query(createprofile,[Fname,Lname,Id_card_no,userID],(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result[0]);
      }
    })
    
  })

  app.put('/updateprofile',(req,res)=>{
    
    const Fname=req.body.Fname;
    const Lname=req.body.Lname;
    const Id_card_no=req.body.Id_card_no;
    const userID=req.body.userID

    const updateprofile="call updateprofile(?,?,?,?)";
    db.query(updateprofile,[Fname,Lname,Id_card_no,userID],(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result[0]);
      }
    })
    
  })

  app.post('/createtour',(req,res)=>{
    const nametour=req.body.nametour;
    const days=req.body.days;
    const quantity=req.body.quantity;
    const details=req.body.details;
 
    const userID=req.body.userID;
    const tour_picture=req.body.tour_picture;
    const createtour="call createtour(?,?,?,?,?,?)";
    db.query(createtour,[nametour,days,quantity,details,userID,tour_picture],(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result[0]);
      }
    })
    
  })

  app.get('/getActivity',(req,res)=>{
    const userID=req.query.userID
    const getActivity="call getActivity(?)";
    db.query(getActivity, [userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])}); 
  })

  app.get('/getrepout',(req,res)=>{
    const tourID=req.query.tourID
    const userID=req.query.userID
    const report_detail=req.query.report_detail
    const getrepout="call getrepout(?,?,?)";
    db.query(getrepout, [tourID,userID,report_detail],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.get('/applytour',(req,res)=>{
    const tourID=req.query.tourID 
    const userID=req.query.userID
    const applytour="call applytour(?,?)";
    db.query(applytour, [tourID,userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.get('/logoutmb',(req,res)=>{
    const userID=req.query.userID
    console.log(req.params)
    const logoutmb="call logoutmb(?)";
    db.query(logoutmb, [userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })


  app.get('/getdetail',(req,res)=>{
    const tourID=req.query.tourID
    console.log(req.params)
    const getdetail="call getdetail(?)";
    db.query(getdetail, [tourID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.get('/getmain',(req,res)=>{
    const getmain="call getmain()";
    db.query(getmain, [],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  
  app.delete("/deletetour", (req, res) => {
    const tourID=req.body.tourID
    const deletetour = "call deletetour(?)";
    console.log(tourID);
    db.query(deletetour, [tourID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result[0]);
      }
    });
  });

  app.delete("/deletetourcm", (req, res) => {
    const tourID=req.body.tourID
    const deletetourcm = "call deletetourcm(?)";
    console.log(tourID);
    db.query(deletetourcm, [tourID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result[0]);
      }
    });
  });

  app.get('/getActivityguide',(req,res)=>{
    const userID=req.query.userID
    const getActivityguide="call getActivityguide(?)";
    db.query(getActivityguide, [userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.get('/getguide',(req,res)=>{
    const userID=req.query.userID
    const getguide="call getguide(?)";
    db.query(getguide, [userID],(err,result)=>{
      if (err) {
        console.log(err);
      }
      if (result[0].length > 0) {
        console.log(result[0][0].approved)
        if (result[0][0].approved == 'Approved'){
          console.log('Approve')
          res.send(result[0]);
        }else {
          console.log("not Approved");
          
        }
      } else {
        console.log("อะไรวะ");
        res.send(false);
      }
  });
  })   

  app.get('/getpersonal',(req,res)=>{
    const userID=req.query.userID
    const getpersonal="call getpersonal(?)";
    db.query(getpersonal, [userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.get('/getimageguide',(req,res)=>{
    const tourID=req.query.tourID
    const getimageguide="call getimageguide(?)";
    db.query(getimageguide, [tourID],(err,result)=>{
      if (err) {
        console.log(err);
      }
      if (result[0].length > 0) {
        console.log(result[0][0].approved)
        if (result[0][0].approved == 'Approved'){
          res.send(result[0]);
        }else {
          console.log("not Approved");
          res.status(401).send();
        }
      } else {
        console.log("null");
        res.send(false);
      }
  }); 
  }) 

  app.get('/getimage',(req,res)=>{
    const tourID=req.query.tourID
    const getimage="call getimage(?)";
    db.query(getimage, [tourID],(err,result)=>{
        console.log(err);
        res.send(result[0]);
      }); 
  })
  app.get('/getNotification',(req,res)=>{
    const userID=req.query.userID
    const getNotification="call getNotification(?)";
    db.query(getNotification, [userID],(err,result)=>{
    console.log(result[0])
    res.send(result[0])});
  })

  app.post('/validatetour',(req,res)=>{
    const validatetour="call validatetour()";
    db.query(validatetour,[],(err,result)=>{
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
   });
  });

  app.get("/counttour", (req, res) => {
    const tourID=req.query.tourID
    const counttour = "call counttour(?)";
    db.query(counttour, [tourID], (err, result) => {
      if (err) {
        console.log(err);
      } 
      console.log(result[0][0].COUNTtour)
      console.log(result[0][0].quantity)
      if (result[0][0].COUNTtour < result[0][0].quantity){
        console.log("ok");
        res.send(result[0]);
      }else {
        console.log("full");
        res.status(403).send();
      }
    });
  });

  app.get('/getaction',(req,res)=>{
    const userID=req.query.userID
    console.log(userID);
    const getaction="call getaction(?)";
    db.query(getaction, [userID],(err,result)=>{
        console.log(err);
        res.send(result[0]);
      }); 
  }) 

  app.get('/validaterepout',(req,res)=>{
    const tourID=req.query.tourID
    console.log(tourID)
    const validaterepout="call validaterepout(?)";
    db.query(validaterepout, [tourID],(err,result)=>{
      if (err) {
        console.log(err);
      } 
      console.log(result[0][0].statustour)
      if (result[0][0].statustour == 1){
        console.log("ok");
        res.send(result[0]);
      }else {
        console.log("cannot report");
        res.status(403).send();
      }});
    });

    app.get('/validateguide',(req,res)=>{
      const userID=req.query.userID
      console.log(userID)
      const validateguide="call validateguide(?)";
      db.query(validateguide,[userID],(err,result)=>{
        if (err) {
          console.log(err);
        } 
        console.log(result[0][0])
        if (result[0][0].statusguide == 1){
            console.log('guide')
            res.send(result[0]);
          }else {
            console.log("not guide");
            res.status(403).send();
        }});
      });


db.connect((err)=>{
    if(err){
        console.log("error connect database =",err)
        return;
    }
    console.log("mysql connect success");
})