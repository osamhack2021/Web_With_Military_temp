const { Comment } = require('../../models/Comment/Comment');

const post = {
  // 댓글 쓰기
  saveComment: async (req, res) => {
    req.body.posted = await new Date().setHours(new Date().getHours() + 9);
    const comment = await new Comment(req.body);
    comment.save((err, commentData) => {
      if (err) return res.status(400).json({ success: false, err });
      Comment.find({ _id: commentData._id })
        .populate('writerId')
        .exec((err, result) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, result });
        });
    });
  },

  // 댓글 불러오기
  getComments: (req, res) => {
    Comment.find({ boardId: req.body.boardId })
      .populate('writerId')
      .exec((err, comments) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, comments });
      });
  },

  // 댓글 삭제
  removeComment: (req, res) => {
    Comment.findOne({ _id: req.body.commentId }, (err, comment) => {
      if (err) return res.status(500).json({ success: false });
      if (String(comment.writerId) !== String(req.user._id))
        return res
          .status(200)
          .json({ success: false, message: '작성자가 아닙니다.' });
      Comment.deleteOne({ _id: req.body.commentId }, err => {
        if (err) return res.status(500).json({ success: false });
        return res.status(200).json({ success: true, result: req.user._id });
      });
    });
  },
};

module.exports = {
  post,
};
