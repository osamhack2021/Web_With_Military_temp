const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/background', upload.single('image'), ctrl.post.background);
router.post('/create', auth, ctrl.post.create);
router.post('/approve', auth, ctrl.post.approve);
router.post('/join', auth, ctrl.post.join);
router.post('/profile', ctrl.post.profile);
router.post('/edit', auth, ctrl.post.edit);

module.exports = router;
