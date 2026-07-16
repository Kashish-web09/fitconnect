import { body } from "express-validator";

export const adminSignupRules=[
    body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
            body("phoneno").trim().notEmpty().withMessage("Mobile no. is required").isMobilePhone("en-IN")    .withMessage("Enter a valid Indian mobile number"),
                body("password") .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 18 })
    .withMessage("Password must be 8-18 characters long"),
    body("confirmPass")
  .notEmpty()
  .withMessage("Confirm Password is required")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  })
]
export const adminSigninRule=[
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
