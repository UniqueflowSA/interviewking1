const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const StudySchema = new Schema({
  // 스터디 정보
  study_id: { type: mongoose.Types.ObjectId, unique: true }, // identification value
  study_name: { type: String, unique: true },
  title: { type: String },
  content: { type: String },
  deadline: { type: Date }, // 모집완료날짜
  headcount: { type: Number, maximum: 10 }, // 최대 모집 인원
  chat_link: {
    type: String,
    // pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
  },
  status: {
    // 모집 이전: 1, 모집 중: 2, 스터디 종료: 3
    type: Number,
    default: 1,
  },

  // 스터디원 신청 정보 (스터디 신청 시, 사용자가 입력)
  user_name: { type: String, ref: 'User' }, // reference
  phone_number: { type: String, ref: 'User' }, // reference
  email: { type: String, unique: true, ref: 'User' }, // reference
  goal: { type: String }, // 목표 산업 분야 및 기업
  hope: { type: String }, // 포부 한 마디
  //   self_intro: { type: Buffer, required: true }, // 자기소개서
});

module.exports = StudySchema;
