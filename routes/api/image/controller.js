const fs = require('fs');
const HttpError = require('../../../models/http-error');
const path = require('path');

const random = (req, res, next) => {
    
    try {
        var fileFolder = path.join(__base, '/public/resource/images');

        fs.readdir(fileFolder, function(err, fileList){
            const fileLength = fileList.length;

            if(fileLength == 0){
                const error = new HttpError(
                    '파일을 읽지 못하였습니다.',
                    500 
                );
                return next(error);    
            }

            const fileRandomNum = Math.floor(Math.random() * ( Math.floor(fileLength) - 0 ) + 0); 
            const fileNm = path.join(fileFolder,fileList[fileRandomNum]); 
            fs.readFile(fileNm, (err,data) => {

                if(err){
                    const error = new HttpError(
                        '파일을 읽지 못하였습니다.',
                        500 
                    );
                    return next(error);  
                }
                res.writeHead(200, { "Context-Type" : "image/jpg" });   // 보낼 헤더를 만듬
                res.write(data);
                res.end();
            })  
        })

    } catch (err) {
        const error = new HttpError(
            '파일을 읽지 못하였습니다.',
            500 
        );
        return next(error);      
    }
};

exports.random = random;