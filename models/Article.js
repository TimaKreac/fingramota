const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
   title: {
      type: String,
      required: true
   },
   text: {
      type: String,
      required: true
   },
   articleBlock: {
      type: Types.ObjectId,
      ref: 'ArticleBlock'
   }
});

module.exports = model('Article', schema);
