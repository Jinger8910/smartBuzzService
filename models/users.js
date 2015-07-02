/**
 * Created by Jinger on 7/1/15.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    userName: String,
    title: String,
    startDate: Date,
    endDate: Date,
    location: String,
    message: String,
    eventid:String
});

module.exports = mongoose.model('User', UserSchema);