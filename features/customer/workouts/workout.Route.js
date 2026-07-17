import express from 'express';
import workoutController from './workout.Controller.js';
import workoutAddrules from './workout.Validation.js';
import { validator } from '../../../middleware/commonValidation.Middleware.js';
const workoutRoutes=express.Router();
const workoutsController=new workoutController();

workoutRoutes.get('/',(req,res,next)=>{
    workoutsController.getWorkoutPage(req,res,next)
})
workoutRoutes.get('/add',(req,res,next)=>{
    workoutsController.addWorkoutPage(req,res,next)
})
workoutRoutes.post('/add',workoutAddrules,validator("customerUIFiles/addWorkout"),(req,res,next)=>{
    workoutsController.addWorkout(req,res,next)
})
workoutRoutes.get('/edit/:id',(req,res,next)=>{
    workoutsController.updateWorkoutPage(req,res,next)
})
workoutRoutes.post('/edit/:id',workoutAddrules,validator("customerUIFiles/editWorkout"),(req,res,next)=>{
    workoutsController.updateWorkout(req,res,next)
})
workoutRoutes.get('/delete/:id',(req,res,next)=>{
    workoutsController.deleteWorkout(req,res,next)
})

export default workoutRoutes;