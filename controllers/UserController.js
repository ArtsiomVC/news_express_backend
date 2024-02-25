import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ errorMessage: 'Пользователь с таким E-Mail существует.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    const newUser = await doc.save();

    const token = jwt.sign({
      _id: newUser._id
    }, 'secret123', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData} = newUser._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ errorMessage: 'Не удалось зарегистрироваться.' });
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        errorMessage: 'Логин или пароль не верный.',
      });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({
        errorMessage: 'Логин или пароль не верный.',
      });
    }

    const token = jwt.sign({
      _id: user._id
    }, 'secret123', {
      expiresIn: '30d',
    });
    const { passwordHash, ...userData} = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...userData} = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Нет доступа' });
  }
}
