const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const ArticleBlock = require('../models/ArticleBlock');
const multer = require('multer');
const storage = multer.diskStorage({
   destination: './client/build/images/user_avatars/',
   filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname.split(' ').join(''));
   }
});
const fs = require('fs');

const upload = multer({ storage: storage });

router.post('/getUserProfile', async (req, res) => {
   try {
      const { login } = req.body;
      const user = await User.findOne({ login });
      res.json(user);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/getCountOfTests', async (req, res) => {
   try {
      const articleBlock = await ArticleBlock.find({});
      res.json(articleBlock.length);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/changeUserProfile', async (req, res) => {
   try {
      const { userId, profile } = req.body;
      const user = await User.findByIdAndUpdate(userId, profile);
      res.json(user);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post(
   '/:userId/changeUserAvatar',
   upload.single('avatar'),
   async (req, res) => {
      try {
         const user = await User.findByIdAndUpdate(req.params.userId, {
            avatar: req.file.filename
         });
         if (user.avatar !== 'standart-avatar.jpg') {
            fs.unlinkSync(`./client/build/images/user_avatars/${user.avatar}`);
         }
         res.json(req.file.filename);
      } catch (error) {
         res.status(500).json({
            message: 'Упс..Что-то пошло не так.'
         });
      }
   }
);
module.exports = router;
