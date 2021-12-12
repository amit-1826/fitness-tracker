import {Injectable} from "@angular/core";
import {ExerciseModel} from "./exercise.model";
import {Observable, of, Subject} from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingChanged: Subject<ExerciseModel> = new Subject<ExerciseModel>();
  exercisesChanged: Subject<ExerciseModel[]> = new Subject<ExerciseModel[]>();
  private availableExercise: ExerciseModel[] = [];
  private runningExercise: any;
  private exercises: ExerciseModel[] = [];

  constructor(private firestore: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.firestore.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map((docArray) => {
        return docArray.map((doc) => {
          const data: any = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            name: data.name,
            duration: data.duration,
            calories: data.calories
          }
        })
      })
    ).subscribe((exercises: ExerciseModel[]) => {
      this.availableExercise = exercises;
      this.exercisesChanged.next(this.availableExercise);
    })
  }

  startTraining(id: string) {
    this.runningExercise = this.availableExercise.find((ex: ExerciseModel) => ex.id == id);
    this.trainingChanged.next(this.runningExercise);
  }

  getCurrentExercise(): ExerciseModel {
    return {...this.runningExercise};
  }

  cancelExercise(progress: number) {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100)});
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
