const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = Router();
const User = require('../models/User');

router.post(
   '/register',
   [
      check('email', 'Введите корректный эл.адрес').isEmail(),
      check('login', 'Введите логин (минимум 3 символа)')
         .exists()
         .isLength({
            min: 3
         }),
      check(
         'password',
         'Длина пароля должна иметь от 8 до 16 символов'
      ).isLength({
         min: 8,
         max: 16
      }),
      check('name', 'Имя должно иметь не менее 2 символов')
         .exists()
         .isLength({
            min: 2
         }),
      check('surname', 'Фамилия должна иметь не менее 2 символов')
         .exists()
         .isLength({
            min: 2
         })
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Некорректные данные при регистрации'
            });
         }

         const {
            email,
            login,
            password,
            repeat_password,
            name,
            surname,
            city
         } = req.body;

         const candidate = await User.findOne({ login });
         const isEmailUsed = await User.findOne({ email });

         if (candidate) {
            return res.status(400).json({
               message: 'Пользователь с таким логином уже существует'
            });
         }

         if (isEmailUsed) {
            return res.status(400).json({
               message: 'Пользователь с такой эл.почтой уже существует'
            });
         }

         if (password !== repeat_password) {
            return res.status(400).json({
               message: 'Пароли не совпадают'
            });
         }

         const hashedPassword = await bcrypt.hash(password, 12);

         const user = new User({
            email,
            login,
            password: hashedPassword,
            name,
            surname,
            city
         });

         await user.save();
         res.status(201).json({ message: 'Аккаунт успешно создан' });
      } catch (error) {
         res.status(500).json({
            message: 'Упс..Что-то пошло не так.'
         });
      }
   }
);

router.post(
   '/login',
   [
      check('login', 'Введите логин').exists(),
      check('password', 'Введите пароль').exists()
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Некорректные данные при входе в аккаунт'
            });
         }

         const { login, password } = req.body;

         const user = await User.findOne({ login });

         if (!user) {
            return res
               .status(400)
               .json({ message: 'Пользователь с таким логином не найден' });
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
         }

         if (user.role === 'admin') {
            res.json({
               userId: user.id,
               login,
               admin: '5e36710852abaf1210678c48'
            });
         } else {
            res.json({ userId: user.id, login });
         }
      } catch (error) {
         res.status(500).json({
            message: 'Упс..Что-то пошло не так.'
         });
      }
   }
);

module.exports = router;
