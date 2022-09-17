const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      match: /.+\@.+\..+/
    },
    mobile: {
      type: String,
      required: "Please provide valid mobile",
      unique: true,
      trim: true,
      match:/^[6-9]\d{9}$/
    },
    collegeId: {
      type: objectId,
      ref: "colleges"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);
