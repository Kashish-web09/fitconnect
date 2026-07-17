import { body } from "express-validator";

const workoutAddrules=[
body("exerciseName").trim().notEmpty().withMessage("Enter a valid exercise name"),
body("day").notEmpty().withMessage("Select one option from the list"),
body("muscleGroup").notEmpty().withMessage("Select one option from the list"),
body("sets").trim().notEmpty().withMessage("Sets are required").isInt({min:1}).withMessage("Enter a valid set number").toInt(),
body("reps").trim().notEmpty().withMessage("Reps are required").isInt({min:1}).withMessage("Enter a valid rep number").toInt(),
 body("weight")
        .trim()
        .notEmpty()
        .withMessage("Weight is required")
        .isFloat({ min: 0 })
        .withMessage("Enter a valid weight number")
        .toFloat(),

    body("duration")
        .trim()
        .notEmpty()
        .withMessage("Duration is required")
        .isFloat({ min: 0 })
        .withMessage("Enter a valid duration number")
        .toFloat(),
]
export default workoutAddrules;