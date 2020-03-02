const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
   title: {
      type: String,
      required: true
   },
   linkId: {
      type: String,
      required: true
   },
   articles: [
      {
         type: Types.ObjectId,
         ref: 'Article'
      }
   ],
   test: {
      type: Types.ObjectId,
      ref: 'Test'
   }
});

module.exports = model('ArticleBlock', schema);
