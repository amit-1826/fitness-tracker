import {Injectable} from "@angular/core";
import {ExerciseModel} from "./exercise.model";
import {Observable, of, Subject} from "rxjs";

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
  private runningExercise: any;
  private exercises: ExerciseModel[] = [];

  constructor() {
  }

  getAvailableExercises(): ExerciseModel[] {
    return [...this.availableExercise];
  }

  startTraining(id: string) {
    this.runningExercise = this.availableExercise.find((ex) => ex.id == id);
    this.trainingChanged.next(this.runningExercise);
  }

  getCurrentExercise(): ExerciseModel {
    return {...this.runningExercise};
  }

  cancelExercise(progress: number) {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'cancelled', duration: (this.runningExercise.duration * 100) / 100, calories: (this.runningExercise.duration * 100) / 100});
    this.runningExercise = undefined;
    this.trainingChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = undefined;
    this.trainingChanged.next(this.runningExercise);
  }

  getPastExercises(): ExerciseModel[] {
    return this.exercises.slice();
  }
}
