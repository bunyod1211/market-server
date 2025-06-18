// server/config/db.js
const express = require("express");
const mongoose = require('mongoose');

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB ga muvaffaqiyatli ulandi ✅');
  } catch (err) {
    console.error('MongoDB ulanishda xatolik ❌', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
