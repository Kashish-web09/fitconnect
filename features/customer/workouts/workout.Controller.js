import workoutRepo from "./workout.Repository.js";
import workoutModels from "./workout.Model.js";

export default class workoutController{
    constructor(){
        this.workoutRepo=new workoutRepo();
    }
    async getWorkoutPage(req,res,next){
        try {
            const workouts=await this.workoutRepo.workout();
             res.render("customerUIFiles/workout",{
                title:"Workout Page",
                workouts,
                                    errors:{}

            })
        } catch (err) {
            next(err)
        }
    }
   
    async addWorkoutPage(req,res,next){
                try {
        return res.render("customerUIFiles/addWorkout",{
            title:"Add Workout Page",
                                errors:{}

        })
        } catch (err) {
            next(err)
        }

    }
     async addWorkout(req,res,next){
                try {
                    const userId=req.userId;
            const {exerciseName,day,muscleGroup,sets,reps,weight,duration}=req.body;
            const newWorkout=new workoutModels(
                userId,
                exerciseName,
                day,
                muscleGroup,
                sets,
                reps,
                weight,
                duration,
                false
            )
            await this.workoutRepo.addWorkout(newWorkout);
            return res.redirect("/customer/workout")
        } catch (err) {
            next(err)
        }

    }
    async updateWorkoutPage(req,res,next){
                try {
                const wokroutId=req.params.id;
                const workout=await this.workoutRepo.getWorkoutById(wokroutId);
            return res.render("customerUIFiles/editWorkout",{
                workout,
                                    errors:{}

            })
        } catch (err) {
            next(err)
        }

    }
    async updateWorkout(req,res,next){
                try {
                        const wokroutId=req.params.id;
            const data=req.body;
const result=await this.workoutRepo.updateWorkout(wokroutId,data);
if(result.modifiedCount===0){
    return res.status(404).send("workout not found")
}

return res.redirect('/customer/workout')
        } catch (err) {
            next(err)
        }

    }
    async filterWorkout(req,res,next){
                try {
            
        } catch (err) {
            next(err)
        }

    }
    async deleteWorkout(req,res,next){
                try {
            const wokroutId=req.params.id;
        
            const result=await this.workoutRepo.deleteWorkout(wokroutId);
if(result.deleteCount===0){
                return res.status(404).send("Workout not found");

}
return res.redirect('/customer/workout')

        } catch (err) {
            next(err)
        }

    }
}