const { Router } = require('express');
const router = Router();
const Test = require('../models/Test');
const User = require('../models/User');
const ArticleBlock = require('../models/ArticleBlock');

router.post('/:linkId/addTest', async (req, res) => {
   try {
      const test = new Test({
         questions: req.body.questions,
         linkId: req.params.linkId
      });
      await ArticleBlock.findOneAndUpdate(
         { linkId: req.params.linkId },
         { test: test._id }
      );
      await test.save();
      res.status(201).json({ message: 'Тест успешно добавлен' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/:linkId/getTest', async (req, res) => {
   try {
      const test = await Test.findOne({ linkId: req.params.linkId });
      res.json(test);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/:linkId/addToCompleted', async (req, res) => {
   try {
      const { userId, correctCounter, userAnswers, percent } = req.body;
      const test = await Test.findOne({ linkId: req.params.linkId });

      const user = await User.findById(userId);
      user.completed_tests.push({
         linkId: req.params.linkId,
         test: test._id,
         userAnswers,
         correctCounter,
         percent
      });
      user.save();
      res.status(201).json({ message: 'Результаты теста добавлены' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/deleteTestById', async (req, res) => {
   try {
      const { linkId, userId } = req.body;
      await Test.deleteOne({ linkId });
      await ArticleBlock.findOneAndUpdate({ linkId }, { test: undefined });
      const user = await User.findById(userId);
      const completed_tests = user.completed_tests.filter(test => {
         return test.linkId !== linkId;
      });
      user.completed_tests = completed_tests;
      user.save();
      res.status(201).json({ message: 'Тест удален' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/rebootTestById', async (req, res) => {
   try {
      const { linkId, userId } = req.body;
      const user = await User.findById(userId);
      const completed_tests = user.completed_tests.filter(test => {
         return test.linkId !== linkId;
      });
      user.completed_tests = completed_tests;
      user.save();
      res.status(201).json({ message: 'Тест сброшен' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/getCompletedTests', async (req, res) => {
   try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      res.json(user.completed_tests);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

module.exports = router;
