const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.user;
const { MESSAGE } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { any } = require("../middleware/upload");
let refreshTokens = [];
//generateAccessToken
exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
};

//generateRefreshToken
exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

//refreshToken
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: "ERR",
        message: "You're not authenticated",
      });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = exports.generateAccessToken(user);
      const newRefreshToken = exports.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "RefreshToken failed",
      error: error.message,
    });
  }
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.REQUEST_BODY_IS_MISSING,
      });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid email format",
      });
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({
        status: "ERR",
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = await User.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashPassword,
    });

    return res.status(201).json({
      status: "OK",
      message: "Register successfully!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Register failed",
      error: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.REQUEST_BODY_IS_MISSING,
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        status: "ERR",
        message: "Wrong Email",
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(404).json({
        status: "ERR",
        message: "Wrong Password",
      });
    }

    if (existingUser && validPassword) {
      //Generate access token
      const accessToken = exports.generateAccessToken(existingUser);
      //Generate refresh token
      const refreshToken = exports.generateRefreshToken(existingUser);
      //STORE REFRESH TOKEN IN COOKIE
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        status: "OK",
        message: "Login successfully!",
        data: existingUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

//LOGOUT
exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: "OK",
      message: "Logout successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: "Logout failed",
      error: error.message,
    });
  }
};

//ADDUSER
exports.addUser = async (req, res) => {
  try {
    const { email, username, password, phone, address } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!email || !username || !password || !phone || !address) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "ERR",
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      image: image,
      email,
      username,
      password: hashPassword,
      phone,
      address,
    });

    res.status(200).json({
      status: "OK",
      message: "CreateUser successfully!",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "CreateUser failed",
      error: error.message,
    });
  }
};

//UPDATE
exports.updateUser = async (req, res) => {
  try {
    const { username, password, phone, address } = req.body;
    const user = await User.findById(req.params.id);
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image || user.image;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...user._doc,
        username,
        password: password ? await bcrypt.hash(password, 10) : user.password,
        phone,
        address: address,
        image: image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) {
      return res.status(400).json({
        status: "ERR",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "UpdateUser successfully!",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateUser failed",
      error: error.message,
    });
  }
};

//DELETE
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({
        status: "ERR",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "OK",
      message: "DeleteUser successfully",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "DeleteUser failed",
      error: error.message,
    });
  }
};

//GetUser
exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);

    if (!getUser) {
      return res.status(400).json({
        status: "ERR",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetUser successfully!",
      data: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetUser failed",
      error: error.message,
    });
  }
};

//GetAllUser
exports.getAllUser = async (req, res) => {
  try {
    const getAllUser = await User.find();

    if (!getAllUser) {
      return res.status(400).json({
        status: "ERR",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetAllUser successfully!",
      data: getAllUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetAllUser failed",
      error: error.message,
    });
  }
};
