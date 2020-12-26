const UserService = require('../services/user');
const UserModel = require('../models/user');
const userServiceInstance = new UserService({UserModel});
const {ROLE, ROLE_DISPLAY} = require('../constant/index');

exports.register = async (req, res) => {
  let {name, password, email, role} = req.body;
  role = ROLE[role];
  if (role == null) return res.status(400).json({message: '角色錯誤'});

  let data = {
    name,
    password,
    email,
    role,
  }
  try {
    const registerResult = await userServiceInstance.registerUser(data);
    if (registerResult.message != null) {
      return res.status(400).json({message: registerResult.message});
    }
  } catch (e) {
    return res.status(500).json({});
  }
  return res.json({message: '註冊成功'});
};

exports.login = async (req, res) => {

  let {email, password} = req.body;
  let data = {
    email,
    password
  };

  let loginResult;
  try {
    loginResult = await userServiceInstance.login(data);

    if (loginResult.message != null) {
      return res.status(400).json({message: '帳號或密碼錯誤'});
    }
  } catch (e) {
    return res.status(500).json({});
  }
  //登入成功開始設定session
  const {name, userId, role} = loginResult;
  req.session.user = {
    name,
    email,
    userId,
    role,
  };

  return res.json({message: '登入成功'});
};

exports.me = async (req, res) => {
  const {userId} = req.session.user;

  try {
    const userDetails = await userServiceInstance.getUserDetails({userId});
    let {
      // userId,
      name,
      role,
      email,
      score,
      reviewer,
      createdAt,
    } = userDetails;

    role = ROLE_DISPLAY[role];
    const apiResult = {
      userId,
      name,
      role,
      email,
      score,
      reviewer,
      createdAt,

    };
    return res.json(apiResult);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({});
  }

};

exports.getUsers = async (req, res) => {
  let {role = ROLE.TEACHER, limit = 50, offset = 0} = req.query;
  let data = {
    role,
    limit,
    offset,
  };

  const userRole = req.session.user.role;
  if (userRole === ROLE.STUDENT && role === ROLE.STUDENT) {
    return res.status(403).json({message: '學生不可查看學生資料'});
  }

  try {
    const users = await userServiceInstance.getUsersByRole(data);
    const apiResult = users.map(user => {
      let {name, userId, email, role, score, reviewer = '', createdAt} = user;
      role = ROLE_DISPLAY[role];
      return {
        name,
        userId,
        email,
        role,
        score,
        reviewer,
        createdAt,
      }
    });

    return res.json(apiResult);
  } catch (e) {
    return res.status(500).json({});
  }
};

exports.getUser = async (req, res) => {
  const currUserRole = req.session.user.role;
  // if (1) {
  //   return res.status(403).json({message: '權限不足'});
  // }

  const {userId} = req.params;
  const data = {
    userId,
  };

  try {
    const userDetails = await userServiceInstance.getUserDetails({userId});
    if (userDetails.message != null) {
      return res.status(400).json({message: userDetails.message});
    }

    let {
      // userId,
      name,
      role,
      email,
      score,
      reviewer,
      createdAt,
    } = userDetails;

    if (currUserRole === ROLE.STUDENT && role === ROLE.STUDENT) {
      return res.status(403).json({message: '學生不可查看學生資料'});
    }

    role = ROLE_DISPLAY[role];
    const apiResult = {
      userId,
      name,
      role,
      email,
      score,
      reviewer,
      createdAt,

    };
    return res.json(apiResult);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({});
  }
};

exports.updateScore = async (req, res) => {
  const {userId} = req.params;
  let {score} = req.body;
  const {userId: currUserId} = req.session.user;

  try {
    const updateUserResult = await userServiceInstance.updateUserScore({userId, score, updaterUserId: currUserId});
    // if (updateUserResult.message != null) {
    //   return res.status(400).json({message: updateUserResult.message});
    // }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({});
  }

  return res.json({message: '更新成功'});
};

exports.logout = async (req, res) => {
  req.session.destroy(function (err) {
    // cannot access session here
  });
  return res.json({message: '登出'});
};