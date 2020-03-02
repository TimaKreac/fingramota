const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
   questions: {
      type: Array,
      required: true
   },
   linkId: {
      type: 'String',
      required: true
   }
});

module.exports = model('Test', schema);
