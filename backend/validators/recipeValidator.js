import { ExpressValidator, validationResult } from "express-validator";

const recipeRules = [
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("name is required or must be a string"),
  body("cookTime")
    .notEmpty()
    .isBoolean()
    .withMessage("cook time must be provided"),
];

const handleRecipeValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ errors: error.array() });
  }
  next()
};
