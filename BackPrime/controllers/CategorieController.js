import axios from "axios";
import asyncHandler from "express-async-handler";
import CategorieSchema from "../models/CategorieSchema.js";

const addCategorie = asyncHandler(async (req, res) => {
  const { cat_name, cat_description } = req.body;

  const existingCategorie = await CategorieSchema.findOne({ cat_name });

  if (existingCategorie) {
    res.status(400);
    throw new Error("Category with this ID or name already exists");
  }

  const categorie = await CategorieSchema.create({
    cat_name,
    cat_description,
  });

  res.status(201).json(categorie);
});

const delCategorie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const Categorie = await CategorieSchema.findByIdAndDelete(id);

  res.status(201).json(Categorie);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const Categories = await CategorieSchema.find();

  res.status(201).json(Categories);
});

const updateCategorie = asyncHandler(async (req, res) => {
  const { cat_name, cat_description } = req.body;

  const { id } = req.params;

  try {
    const categorie = await CategorieSchema.findById(id);
    if (categorie) {
      categorie.cat_name = cat_name || categorie.cat_name;
      categorie.cat_description = cat_description || categorie.cat_description;
      const updatedCategorie = await categorie.save();
      res.status(201).json(updatedCategorie);
    } else {
      throw new Error("Categorie not found");
    }
  } catch (err) {
    throw new Error(err);
  }
});

export { addCategorie, delCategorie, getAllCategories, updateCategorie };
