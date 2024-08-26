import axios from "axios";
import asyncHandler from "express-async-handler";
import WhitelistSchema from "../models/WhitelistSchema.js";

const addWhitelist = asyncHandler(async (req, res) => {
  const {
    typeWhitelist,
    fullName,
    userInfo,
    steam_link,
    age,
    email,
    char_name,
    char_age,
    res_question,
    status,
  } = req.body;

  try {
    const whitelist = await WhitelistSchema.create({
      typeWhitelist,
      fullName,
      userInfo,
      steam_link,
      age,
      email,
      char_name,
      char_age,
      res_question,
      status,
    });
    res.status(201).json(whitelist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const delWhitelist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const Whitelist = await WhitelistSchema.findByIdAndDelete(id);

  res.status(201).json(Whitelist);
});

const getPoliceWhitelists = asyncHandler(async (req, res) => {
  const policeWhitelists = await WhitelistSchema.find({
    typeWhitelist: "police",
  }).populate("userInfo");

  res.status(200).json(policeWhitelists);
});

const getEmsWhitelists = asyncHandler(async (req, res) => {
  const emsWhitelists = await WhitelistSchema.find({
    typeWhitelist: "ems",
  }).populate("userInfo");

  res.status(200).json(emsWhitelists);
});

const getNormalWhitelists = asyncHandler(async (req, res) => {
  const normalWhitelists = await WhitelistSchema.find({
    typeWhitelist: "normal",
  }).populate("userInfo");

  res.status(200).json(normalWhitelists);
});

const acceptWhitelist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const whitelist = await WhitelistSchema.findById(id);
    if (whitelist) {
      whitelist.status = "Accepted";
      const updatedWhitelist = await whitelist.save();
      res.status(200).json(updatedWhitelist);
    } else {
      res.status(404);
      throw new Error("Whitelist entry not found");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const rejectWhitelist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const whitelist = await WhitelistSchema.findById(id);
    if (whitelist) {
      whitelist.status = "Rejected";
      const updatedWhitelist = await whitelist.save();
      res.status(200).json(updatedWhitelist);
    } else {
      res.status(404);
      throw new Error("Whitelist entry not found");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

export {
  //# Add and del whitelist #//
  addWhitelist,
  delWhitelist,
  //# Get the whitelist By Type #//
  getPoliceWhitelists,
  getEmsWhitelists,
  getNormalWhitelists,
  //# Accept and reject whitelist #//
  acceptWhitelist,
  rejectWhitelist,
};
