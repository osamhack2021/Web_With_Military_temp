const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB 연결 성공'))
  .catch(e => console.log('MongoDB error: ', e));

const users = require('./src/routes/users');
const groups = require('./src/routes/groups');
const ranks = require('./src/routes/ranks');
const studying = require('./src/routes/studying');
const tags = require('./src/routes/tags');

app.use('/users', users);
app.use('/groups', groups);
app.use('/ranks', ranks);
app.use('/studying', studying);
app.use('/tags', tags);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status).json(err.body);
  next();
});

module.exports = app;
