// 모듈 불러오기
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');
const uuid = require('uuid');
const path = require('path');
const formidable = require('formidable');  // form 태그 데이터들을 가져오는 모듈
const fs = require('fs-extra');            // 파일을 복사하거나 디렉토리를 복사하는 모듈
let id = uuid.v4();
const File = require('./models/file');

const dir = path.join(__dirname, 'public');
global.__base = __dirname;

// config load 
const config = require('./config');
const PORT = process.env.PORT || 7000;

// express configure
const app = express();

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build")));
} 

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

app.get('/file', (req,res) => {
    res.render('file');
});

app.get('/',(req,res) => {
    res.send('hello world')
})

app.get('/Main',(req,res) => {
    res.sendFile(path.join(__dirname,"client/build","index.html"));
});

app.post('/upload',function(req,res){ 

    console.log(req.body);
    var name = "";
    var filePath = "";
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        name = fields.name;
    });
    form.on('end', function(fields, files) {
        for (var i = 0; i < this.openedFiles.length; i++) {
            var temp_path = this.openedFiles[i].path;
            var file_name = this.openedFiles[i].name;
            var index = file_name.indexOf('/'); 
            var new_file_name = file_name.substring(index + 1);
            var new_location = path.join(__base, '/public/resource/images',name); //'public/resources/images/'+name+'/';
            var db_new_location = path.join(__base, '/resource/images',name) // 'resources/images/'+name+'/';
            //실제 저장하는 경로와 db에 넣어주는 경로로 나눠 주었는데 나중에 편하게 불러오기 위해 따로 나눠 주었음
            filePath = db_new_location + file_name;
            fs.copy(temp_path,new_location + file_name, function(err) { // 이미지 파일 저장하는 부분임
                if (err) {
                    const error = new HttpError(
                        '저장하는데 에러가 발생하였습니다.',
                        500
                    );
                    return next(error);
                }
            });
        }
        const createFile = new File({
            name : name,
            filepath : filePath
        });
        try {
            createFile.save();
            //await db.images.insert({"name":name,"filePath":filePath});
        } catch (err) {
            const error = new HttpError(
                '저장하는데 에러가 발생하였습니다.',
                500
            );
            return next(error);
        }    
        res.redirect("/"); // http://localhost:3000/ 으로 이동!
    });

});


app.use('/api', require('./routes/api'))

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

// open the server

app.listen(PORT, () => {
    console.log(`Express is running on port ${PORT}`)
});

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})



