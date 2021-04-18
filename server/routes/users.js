const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


const { register, login } = require('../controllers/users');

router.post('/register', [
  check('firstName', '이름을 입력해주세요.').not().isEmpty(),
  check('lastName', '이름을 입력해주세요.').not().isEmpty(),
  check('email', '올바른 이메일을 입력해주세요.').isEmail(),
  check('password', '패스워드는 최소 6글자 이상이어야 합니다.').isLength({ min: 6 })
], register);

router.post('/login', [
  check('email', '올바른 이메일을 입력해주세요.').isEmail(),
  check('password', '패스워드는 최소 6글자 이상이어야 합니다.').isLength({ min: 6 })
], login);

module.exports = router;