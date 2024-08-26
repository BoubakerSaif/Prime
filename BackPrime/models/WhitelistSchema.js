import mongoose from "mongoose";

const whitelistSchema = mongoose.Schema(
  {
    typeWhitelist: { type: String },
    fullName: { type: String },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    steam_link: { type: String, unique: true },
    age: { type: Number },
    email: { type: String, unique: true },
    char_name: { type: String },
    char_age: { type: Number },
    res_question: [String],
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);
export default mongoose.model("Whitelist", whitelistSchema);
