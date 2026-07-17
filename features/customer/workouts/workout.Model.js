

export default class workoutModels{
    constructor(userId,exerciseName,day,muscleGroup,sets,reps,weight,duration,completed) {
        this.userId=userId;
        this.exerciseName=exerciseName;
        this.day=day;
        this.muscleGroup=muscleGroup;
        this.sets=sets;
        this.reps=reps;
        this.weight=weight;
        this.duration=duration;
        this.completed=completed;
        this.createdAt=new Date();
        this.updatedAt=new Date()
    }
}