import {Injectable} from "@angular/core";
import {ExerciseModel} from "./exercise.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingChanged: Subject<ExerciseModel> = new Subject<ExerciseModel>() ;
  private availableExercise: ExerciseModel[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'plank', name: 'Plank', duration: 90, calories: 10},
    {id: 'sit-ups', name: 'Sit Ups', duration: 180, calories: 24},
    {id: 'burpees', name: 'Burpees', duration: 120, calories: 13},
  ]
  runningExercise: any;

  constructor() {
  }

  getAvailableExercises() {
    return [...this.availableExercise];
  }

  startTraining(id: string) {
    this.runningExercise = this.availableExercise.find((ex) => ex.id == id);
    this.trainingChanged.next(this.runningExercise);
  }

  getCurrentExercise() {
    return {...this.runningExercise};
  }

  cancelExercise() {
    this.runningExercise = undefined;
    this.trainingChanged.next(this.runningExercise);
  }

  completeExercise() {
    
  }
}
