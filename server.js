const express = require('express')
const mysql = require('mysql')

const app = express();

app.use(express.json())

// get data
app.get('/api',(req,res)=>{
    res.send("Hello API!") 
})

// Create Routes
app.post('/create',(req,res)=>{
    const {email,name,password} = req.body
    try{
    conn.query(
        'insert into user3(email,fullname,password) values(?,?,?)',
        [email,name,password],
        (err,result,fieled)=>{
            if(err){
                console.log('Error while inserting a user into the database',err);
                return res.status(400).send()
            }
            return res.status(201).json({message: 'New user successfully created!'})
        }
    )
    }catch(err){
        console.log(err);
        
      return res.status(500).send()
    }
})

// Read
app.get('/read',(req,res)=>{
    try{
     conn.query('select * from user3',(err,result,fields) =>{
        if(err){
            console.log(err);
            return res.status(400).send()     
        }
        res.status(200).json(result)
     })
    }catch(err){
     console.log(err);
     return res.status(500).send()
    }
})
// Read single user from db
app.get('/read/single/:email',async(req,res)=>{
    const email = req.params.email
    try{
     conn.query('select * from user3 where email = ?',[email],(err,result,fields) =>{
        if(err){
            console.log(err);
            return res.status(400).send()     
        }
        res.status(200).json(result)
     })
    }catch(err){
     console.log(err);
     return res.status(500).send()
    }
})

// Update users from db
app.patch('/update/:email',async(req,res)=>{
    const email = req.params.email
    const newPassword = req.body.newPassword
    try{
        conn.query('update user3 set password = ? where email = ?',[newPassword,email],(err,result,fields) =>{
           if(err){
               console.log(err);
               return res.status(400).send()     
           }
           res.status(200).json({message: 'User password updated successfully!'})
        })
       }catch(err){
        console.log(err);
        return res.status(500).send()
       }
   })
   
  // Delete data
  app.delete('/delete/:email',(req,res)=>{
    const email =  req.params.email
    try{
        conn.query('delete from user3 where email = ? ',[email],(err,result,fields) =>{
           if(err){
               console.log(err);
               return res.status(400).send()     
           }
           if(result.affectedRows === 0){
              return res.status(404).json({message: 'No user with that email!'})
           }
           return res.status(200).json({message: 'User deleted successfully!'})
        })
       }catch(err){
        console.log(err);
        return res.status(500).send()
       }
  }) 


// mysql connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_api'
})

conn.connect((err)=>{
    if(err){
        console.log("Failed connecting to MySQL database!",err);
        return 
    }else{
        console.log("MySQL successfully connected!");
    }
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})