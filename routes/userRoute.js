const express=require("express")
const { loadRegister, insertUser, verifyMail, loginLoad, verifyLogin, loadHome } = require("../controllers/userController")

const path = require('path');
const user_route=express()

user_route.set('view engine', 'ejs');
user_route.set('views', [path.join(__dirname, '../views/users'), path.join(__dirname, '../views')]);



const bodyparser=require('body-parser')
user_route.use(bodyparser.json());
user_route.use(bodyparser.urlencoded({extended:true}))


const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImages'))

    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name)

    }
})
const upload=multer({storage:storage})

user_route.get('/register',loadRegister)
user_route.post('/register',upload.single('image'),insertUser)
user_route.get('/verify',verifyMail)
user_route.get('/',loginLoad)
user_route.get('/login',loginLoad)
user_route.post('/login',verifyLogin)
user_route.get('/home',loadHome)



module.exports=user_route

