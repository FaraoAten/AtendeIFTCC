//arquivo de configuração da lib multer, para conseguir fazer o upload de arquivos.
const multer = require('multer');
const path = require('path'); 

module.exports = {
    storage: multer.diskStorage({

        destination: path.resolve(__dirname,'..','..','uploads'),

        filename: (require, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    })
};