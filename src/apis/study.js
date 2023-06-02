const { Study } = require('../models/index');

const studyApi = {
  /**스터디 개설*/
  async newStudy(req, res, next) {
    try {
      const { study_name, title, content, deadline, headcount, chat_link, status } = req.body;

      const createInfo = {
        study_name,
        title,
        content,
        deadline,
        headcount,
        chat_link,
        status,
      };

      const createdStudy = await Study.create(createInfo);
      res.study = createdStudy;

      res.status(200).json(createdStudy);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**스터디 신청*/ // 유저 아이디 필수로 고려해서 get 메서드 사용해야할 것 같음, post는 db에 새롭게 저장됨
  async applyStudy(req, res, next) {
    try {
      const { user_name, email, phone_number, goal, hope } = req.body;
      const { study_id, study_name } = req.query;

      const createInfo = {
        study_id,
        study_name,
        user_name,
        email,
        phone_number,
        goal,
        hope,
      };

      const applyedStudy = await Study.create(createInfo);
      res.study = applyedStudy;

      res.status(200).json(applyedStudy);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 400,
        message: 'wrong request',
      });
    }
  },

  /**스터디 정보 조회*/ // 현재 유저 정보 조회는 안 됨
  async getStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const foundStudy = await Study.findOne({ study_id });

      if (!foundStudy) return error;

      res.status(200).json(foundStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'study_id',
      });
    }
  },

  /**스터디 정보 수정*/ // 현재 스터디장의 권한 따지지 않음
  async updateStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const { study_name, title, content, deadline, headcount, chat_link, status } = req.body;

      const updateInfo = {
        study_name,
        title,
        content,
        deadline,
        chat_link,
        status,
      };
      const foundStudy = await Study.findOne({ study_id });

      if (!foundStudy) return console.error(error);

      const updatedStudy = await Study.updateOne({ study_id }, updateInfo);

      res.status(200).json(updatedStudy);
    } catch (error) {
      console.log(error);
      res.status(425).json({
        code: 425,
        message: 'wrong update info',
      });
    }
  },

  /**스터디 회원 관리*/ // 현재 스터디장 권한 고려X, 유저 아이디 불러와서 유저 삭제 기능 구현X
  /**스터디 삭제*/
  async deleteStudy(req, res, next) {
    try {
      const { _id } = req.params;
      const study_id = _id;
      const foundStudy = await Study.findOne({ study_id });

      if (!foundStudy) return console.error(error);

      const deletedStudy = await Study.deleteOne({ study_id });

      res.status(200).json(deletedStudy);
    } catch (error) {
      console.log(error);
      res.status(426).json({
        code: 426,
        message: 'cannot delete study',
      });
    }
  },
};

module.exports = studyApi;
