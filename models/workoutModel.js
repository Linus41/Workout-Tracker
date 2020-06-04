const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//this file holds the workout models?

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name"
        },
        duration: {
            type: Number,
            required: "Enter an exercise duration in minutes"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
}, {
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
    }
});
// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

WorkoutSchema.virtual("totalDistance").get(function () {
    // "reduce" array of exercises down to just the sum of their distances
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.distance;
    }, 0);
});

WorkoutSchema.virtual("totalWeight").get(function () {
    // "reduce" array of exercises down to just the sum of weight lifted
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.weight;
    }, 0);
});
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;