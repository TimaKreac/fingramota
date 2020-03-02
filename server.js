const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));
app.use('/auth', require('./routes/auth.routes'));
app.use('/articles', require('./routes/articles.routes'));
app.use('/test', require('./routes/test.routes'));
app.use('/profile', require('./routes/profile.routes'));

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || config.get('PORT');

async function start() {
   try {
      await mongoose.connect(config.get('MONGODB_URI'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });

      app.listen(PORT, () =>
         console.log(`Server has been started on port ${PORT}!`)
      );
   } catch (error) {
      console.log('Server Error', error.message);
      process.exit(1);
   }
}

start();
