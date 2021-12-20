import {Injectable} from "@angular/core";
import {ExerciseModel} from "./exercise.model";
import {Observable, of, Subject, Subscription} from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {UiService} from "../services/uiService";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingChanged: Subject<ExerciseModel> = new Subject<ExerciseModel>();
  exercisesChanged: Subject<ExerciseModel[]> = new Subject<ExerciseModel[]>();
  pastExercisesChanged: Subject<ExerciseModel[]> = new Subject<ExerciseModel[]>();
  private availableExercise: ExerciseModel[] = [];
  private runningExercise: any;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore, private uiService: UiService) {
  }

  fetchAvailableExercises() {
    this.uiService.showLoaderEvent.next(true);
    this.firebaseSubscriptions.push(this.firestore.collection('availableExercises')
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
      this.uiService.showLoaderEvent.next(false);
      this.availableExercise = exercises;
      this.exercisesChanged.next(this.availableExercise);
    }));
  }

  startTraining(id: string) {
    this.runningExercise = this.availableExercise.find((ex: ExerciseModel) => ex.id == id);
    this.trainingChanged.next(this.runningExercise);
  }

  getCurrentExercise(): ExerciseModel {
    return {...this.runningExercise};
  }

  cancelExercise(progress: number) {
    this.storeExercisesToDb({...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100)});
    this.runningExercise = undefined;
    this.trainingChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.storeExercisesToDb({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = undefined;
    this.trainingChanged.next(this.runningExercise);
  }

  fetchPastExercises(){
    this.firebaseSubscriptions.push(this.firestore.collection('pastExercises').valueChanges()
    .subscribe((exercises: any) => {
      this.pastExercisesChanged.next(exercises);
    }));
  }

  // This function is called from auth service
  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  private storeExercisesToDb(exercise: ExerciseModel) {
    this.firestore.collection('pastExercises').add(exercise);
  }
}
