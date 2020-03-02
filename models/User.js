const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
   email: {
      type: String,
      unique: true
   },
   login: {
      type: String,
      requred: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   surname: {
      type: String,
      required: true
   },
   avatar: {
      type: String,
      default: 'standart-avatar.jpg'
   },
   city: String,
   role: String,
   completed_tests: [
      {
         linkId: 'String',
         test: Types.ObjectId,
         userAnswers: Array,
         correctCounter: Number,
         percent: Number
      }
   ]
});

module.exports = model('User', schema);
