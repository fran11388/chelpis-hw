const {ROLE} = require('../constant/index');
exports.login = (req, res, next) => {
  const sess = req.session;
  if (!sess.user) {
    return res.status(401).json({message: '未登入'});

  }

  next();
};

exports.isTeacher = (req, res, next) => {
  const sessionUser = req.session.user;
  const {role} = sessionUser;
  if (role !== ROLE.TEACHER) {
    return res.status(403).json({message: '非老師身分'});

  }

  next();
};