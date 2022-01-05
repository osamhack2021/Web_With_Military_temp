const { Board } = require("../../models/Board");

const post = {
  // 게시글 쓰기
  saveBoard: (req, res) => {
    const board = new Board(req.body);
	  console.log(board)
    board.save((err, board) => {
      if (err) return res.status(400).json({ success: false, err });
      Board.find({ _id: board._id })
        .populate("writerId")
        .exec((err, result) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, result });
        });
    });
  },
  // 그룹 게시글 불러오기
  getGroupBoards: (req, res) => {
	  console.log(req.body.groupId)
    Board.find({ groupId: req.body.groupId })
      .populate("writerId")
      .exec((err, boards) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, boards });
      });
  },
  // 유저 게시글 불러오기
  getUserBoards: (req, res) => {
    Board.find({ writerId: req.body.writerId })
      .populate("writer")
      .exec((err, boards) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, boards });
      });
  },

  // 게시글 수정
  editBoard: (req, res) => {
    Board.findOne({ _id: req.body.boardId }, (err, board) => {
      if (err) return res.status(500).json({ success: false, err });
      if (String(board.writerId) !== String(req.user._id))
        return res
          .status(500)
          .json({ success: false, message: "작성자가 아닙니다." });
      Board.findOneAndUpdate(
        { _id: req.body.boardId },
        { $set: { title: req.body.title, content: req.body.content } },
        (err) => {
          if (err) return res.status(500).json({ success: false, err });
          return res.status(200).json({ success: true });
        }
      );
    });
  },

  // 게시글 삭제
  removeBoard: (req, res) => {
    Board.findOne({ _id: req.body.boardId }, (err, board) => {
      if (err) return res.status(500).json({ success: false, err });
      if (String(board.writerId) !== String(req.user._id))
        return res
          .status(500)
          .json({ success: false, message: "작성자가 아닙니다." });
      Board.deleteOne({ _id: req.body.boardId }, (err) => {
        if (err) return res.status(500).json({ success: false });
        return res.status(200).json({ success: true });
      });
    });
  },
};

module.exports = {
  post,
};
