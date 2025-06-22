const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const connectDB = require("./config/connectDB");
// .env faylni yuklash
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB ulanish
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB bilan ulanish muvaffaqiyatli!"))
//   .catch((err) => console.error("❌ MongoDB ulanishda xatolik:", err.message));

// Test route
app.get("/", (req, res) => {
  res.send(`<h1>Salom, server ishlayapti!</h1>
    <script>
      console.log(${process.env.PORT});
    </script>
    `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} portda ishga tushdi`);
});
