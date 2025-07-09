const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors');
app.use(cors());

const JWT_SECRET = 'iamgood'

app.use(express.json())

const users = []

app.post('/signup',function(req,res){
    const username = req.body.username
    const password = req.body.password

    if (users.find(u => u.username === username)){
        res.json({
            message:'Username already exists. Try again with a different username'
        })
    }

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"You are signed up"
    })
    console.log(users)
})

app.post('/signin',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = users.find(user => user.username === username && user.password === password)

    if(foundUser){
        const token = jwt.sign({
            username: username,
            // password: password,
            // firstName,
            // lastName,
            courses: []
        },JWT_SECRET)

        res.json({
            token: token
        })
    }else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
    console.log(users)
})

// app.get('/',(req,res)=>[
// res.sendFile('D:/Rishu/Coding/Web Development/Projects/student portal/index.html')
// ])

function auth (req,res,next){
    const token  = req.headers.token;
    
    if (token){
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).send({
                    message:"Unauthorized"
                })
            }else{
                req.user = decoded;
                next();
            }
        })
    }else{
        res.status(401).send({
            message:"Unauthorized"
        })
    }
}

app.get('/me',auth,(req,res)=>{
    // const token = req.headers.token
    // const authInfo = jwt.verify(token,JWT_SCRET);
    // const username = authInfo.username

    // const foundUser = users.find(user=> user.username === username)

    // if (foundUser){
    //     res.json({
    //         username: foundUser.username,
    //         password: foundUser.password
    //     })
    // }else{
    //     res.status(403).send({
    //         error: 'Invalid token'
    //     })
    // }

    const user = req.user;
    res.json({
        user: req.user
    })
    console.log(user)
});

console.log("Running")
app.listen(3000)
