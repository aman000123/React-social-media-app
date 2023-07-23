var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var likeRouter = require('./routes/like');
var authRouter = require('./routes/auth');
var commentRouter = require('./routes/comments');
var postRouter = require('./routes/post');
const cors = require('cors')
var relationRouter = require('./routes/relationShip')



var app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

// app.listen(4000, () => {
//     console.log("server is running 4000 port")
// })
console.log("server is running 4000 port")

app.use(logger('dev'));
//for data sending receive middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Chat-serverside/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })


app.post("/api/upload", upload.single("file"), (req, res) => {
    //upload only single file
    const file = req.file
    console.log("file.filename", file.filename)
    res.status(200).json(file.filename)
})

// Add this line to serve the 'uploads' folder as static content
//app.use('/api/upload', express.static('public/uploads'));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/relationships', relationRouter)





module.exports = app;
