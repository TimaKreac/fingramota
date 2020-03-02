const { Router } = require('express');
const router = Router();
const ArticleBlock = require('../models/ArticleBlock');
const Article = require('../models/Article');
const Test = require('../models/Test');

router.post('/addNewBlock', async (req, res) => {
   try {
      const { title, linkId } = req.body;

      const articleBlock = new ArticleBlock({
         title,
         linkId
      });

      await articleBlock.save();
      res.status(201).json({ message: 'Блок успешно добавлен' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/addNewArticle', async (req, res) => {
   try {
      const { title, text, linkId } = req.body;

      const articleBlock = await ArticleBlock.findOne({ linkId });

      const article = new Article({
         title,
         text,
         articleBlock: articleBlock._id
      });
      await article.save();
      res.status(201).json({ message: 'Статья успешно добавлена' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/', async (req, res) => {
   try {
      const articleBlocks = await ArticleBlock.find({});
      res.json(articleBlocks);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/getBlockArticles', async (req, res) => {
   try {
      const articleBlock = await ArticleBlock.find({
         linkId: req.body.linkId
      });
      const articles = await Article.find({ articleBlock });
      articles.forEach(article => {
         article.text = null;
      });

      res.json(articles);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/getArticleById', async (req, res) => {
   try {
      const articleBlock = await ArticleBlock.findOne({
         linkId: req.body.linkId
      });
      const article = await Article.findOne({
         articleBlock,
         _id: req.body.id
      });
      res.json(article);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/deleteArticleBlock', async (req, res) => {
   try {
      const { linkId } = req.body;
      const articleBlock = await ArticleBlock.findOneAndDelete({ linkId });
      await Article.deleteMany({ articleBlock: articleBlock._id });
      res.status(201).json({ message: 'Блок статей удален' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/deleteArticleById', async (req, res) => {
   try {
      const { id } = req.body;
      const article = await Article.findByIdAndDelete(id);
      res.status(201).json({ message: 'Статья удалена' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/editArticleById', async (req, res) => {
   try {
      const { id } = req.body;
      delete req.body.id;
      await Article.findByIdAndUpdate(id, req.body);

      res.status(201).json({ message: 'Статья изменена' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/getArticleBlock', async (req, res) => {
   try {
      const articleBlock = await ArticleBlock.findOne({
         linkId: req.body.linkId
      });
      res.json(articleBlock);
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

router.post('/:linkId/editArticleBlock', async (req, res) => {
   try {
      const id = req.body._id;
      delete req.body._id;
      await ArticleBlock.findByIdAndUpdate(id, req.body);
      res.status(201).json({ message: 'Блок изменен' });
   } catch (error) {
      res.status(500).json({
         message: 'Упс..Что-то пошло не так.'
      });
   }
});

module.exports = router;
