import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TrainingService} from "../training.service";
import {Observable, Subscription} from 'rxjs';
import { ExerciseModel } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {UiService} from "../../services/uiService";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: ExerciseModel[] | null;
  showLoader = false;
  loaderSubscription: Subscription;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loaderSubscription = this.uiService.showLoaderEvent.subscribe((showLoader) => {
      this.showLoader = showLoader;
    });
    this.getAvailableExercises();
  }

  getAvailableExercises() {
    this.fetchExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((exercises: ExerciseModel[] | null) => {
      this.availableExercises = exercises;
    })
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStart(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
