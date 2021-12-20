import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TrainingService} from "../training.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseModel } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {UiService} from "../../services/uiService";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: ExerciseModel[];
  showLoader = false;
  loaderSubscription: Subscription;
  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.showLoaderEvent.subscribe((showLoader) => {
      this.showLoader = showLoader;
    });
    this.getAvailableExercises();
  }

  getAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesChanged.subscribe((exercises: ExerciseModel[]) => {
      this.availableExercises = exercises;
    })
  }

  onStart(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}
