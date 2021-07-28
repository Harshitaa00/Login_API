const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
username: String,
password:String,
email: String,
phone:Number,
gender:String
})

module.exports = mongoose.model('user',userSchema);

/*{
    "name":"xyz",
    "email":"xyz@gmail.com",
    "phone":123,
    "gender":female
}
*/
