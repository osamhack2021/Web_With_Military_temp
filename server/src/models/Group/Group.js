const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: true,
    require: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 가입 승인 대기
  waiting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  activeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  category: {
    type: String,
    require: true,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  // 그룹 소개
  info: {
    type: String,
    default: null,
  },
  rank: {
    type: Number,
  },
  tier: {
    type: String,
    default: '언랭크',
  },
  created: {
    type: Date,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupImage',
  },
  background: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupBackground',
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
