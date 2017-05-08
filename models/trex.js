/**
 * Created by saleckope on 2017. 04. 30..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trexShema = new Schema({
    name: String,
    sex: String,
    age: Number,
    size: Number,
    image: String
});

var Trex = mongoose.model('Trex', trexShema);

module.exports = Trex;