const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slug: { type: String, unique: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
