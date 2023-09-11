const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');


app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname,"/views"))


let port = 3004;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo',
    password :"psuthar19"
  });

  const todo = [

    {
        title : "tile",
        desc :" desc"
    }

  ];


app.get("/" , (req , res)=>{
    res.render("Home.ejs");
})


app.get("/signin" , (req, res)=>{
      res.render("signin.ejs");
})

app.post("/signin" , (req ,res)=>{
    let{ username , email , password } = req.body
    let id = uuidv4();

    let q = `INSERT INTO user(id , username , email , password) VALUES('${id}' , '${username}' , '${email}' , '${password}')`;
    try{
        connection.query(q , (err , result)=>{
            if(err) throw err;
            console.log("succesfull");
            res.redirect("/login");
        })
    }
    catch (err){
        console.log(err);
    }

//     let d =  {
//    id : uuidv4(),
//     username : username,
//     password : password,
//     email : email
//     };

//     data.push(d);
  

})

app.get("/login" , (req ,res)=>{
    res.render("login.ejs")
})

app.post("/login" , (req ,res)=>{
    let{ username , email , password } = req.body

    let q = `SELECT * FROM user WHERE  username = '${username}';`

    try{
        connection.query(q , (err , result)=>{
            if(err) throw err;
            console.log(res);
            // const isemember = () =>{(email === res[0].email && password === res[0].password)}
            // isemember()
             
            
           if(email === result[0].email && password === result[0].password){
                res.redirect("/");
            }
            
        })
        
    }
    catch(err){
   console.log(err);
    }


    // let d =  {
    //     id : "12a",
    //      username : username,
    //      password : password,
    //      email : email
    //      };

    //      let ans = data.some((el) =>( d.id===el.id));
    //      console.log(ans);


})


app.get("/todo" , (req ,res)=>{
    res.render("todo.ejs" , {todo})
})

app.post("/todo" ,(req , res)=>{
      let {title , desc} = req.body;

      let d = {
        title : title,
        desc : desc
      }

      todo.push(d);
      console.log(req.body);
      console.log(todo);
      res.redirect("/todo")

})



app.listen(port , ()=>{
    console.log("app is listining");
})




