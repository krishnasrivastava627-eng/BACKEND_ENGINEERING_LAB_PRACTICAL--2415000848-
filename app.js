const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'secret-key',
    resave: false,
}));
app.get('/',(req,res)=>{
    res.send("welcome");
});
app.post('/login',(req,res)=>{
    const{username,role}=req.body;
    req.session.username=username;
    req.session.role=role;
    res.cookie('role',role);
    res.send('login succesfully');
})
app.get('/dashboard',(req,res)=>{
    if(!req.session.username){
        res.send('login first');
    }
    res.send(Welcome ${req.session.username},you are logged in as ${req.session.role});
})
app.get('/admin',(req,res)=>{
    if(!req.session.username){
        res.send('Please login');
    }
    if(req.session.role!=='admin'){
        res.send('Access Denied');
    }
    res.send('Welcome Admin');
});
app.get('/logout',(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
           res.send('Error');
        }
        res.clearCookie('role');
        res.send('Logout successful');
    });
});
app.listen(3000,()=>{
    console.log('Server running 3000');
});
