const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema({
    name : String,
    filepath : String
})

File.statics.create = (name, filePath) => {

    const file = new this({
        name,
        filepath
    })

    return file.save();
}

module.exports = mongoose.model('File', File);