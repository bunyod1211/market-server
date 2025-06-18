const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB ulanish muvaffaqiyatli ✅');
}).catch(err => {
  console.error('MongoDB ulanishda xatolik ❌', err.message);
});

// Asosiy route
app.get('/', (req, res) => {
  res.send('Server ishga tushdi 🎉');
});

// User qo'shish
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// Barcha userlarni olish
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
