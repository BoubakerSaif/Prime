import axios from "axios";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserSchema.js";
import generateToken from "../Utils/generateToken.js";

const authuser = asyncHandler(async (req, res) => {
  const url =
    "https://discord.com/oauth2/authorize?client_id=1275264861231910954&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwelcome&scope=identify+guilds+email";
  res.redirect(url);
});

const loginUser = asyncHandler(async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_CLIENT_URL,
  });
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   "Accept-Encoding": "application/x-www-form-urlencoded",
  // };
  axios.defaults.withCredentials = false;
  const response = await axios.post(
    "https://discord.com/api/oauth2/token",
    params
    // { headers }
  );
  const userResponse = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`,
    },
  });

  const userGuilds = await axios.get(
    "https://discord.com/api/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    }
  );

  const { id, username, avatar, email, verified } = userResponse.data;

  const user = await User.findOne({ discord_id: id });
  if (userGuilds?.data?.filter((el) => el.id == "1273036528196653077")) {
    if (!user) {
      const newUser = await User.create({
        discord_id: id,
        discord_username: username,
        discord_avatar: avatar,
        email: email,
        verified: verified,
      });
      generateToken(res, newUser._id);
      res.status(201).json(newUser);
    } else {
      user.discord_username = username || user.discord_username;
      user.discord_avatar = avatar || user.discord_avatar;
      user.email = email || user.email;
      user.verified = verified || user.verified;
      const updatedUser = await user.save();
      generateToken(res, updatedUser._id);
      res.status(200).json(updatedUser);
    }
  } else {
    throw new Error("You are not member of our community");
  }
  // Usage: Assuming you have the token
  // const token = "USER_OAUTH2_TOKEN";
  // getDiscordGuilds(token).then((guilds) => {
  //   console.log("User is a member of the following guilds:", guilds);
  // });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

export { loginUser, authuser, logoutUser };
