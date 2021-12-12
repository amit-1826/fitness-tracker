import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TrainingService} from "../training.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseModel } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises: ExerciseModel[];
  constructor(private trainingService: TrainingService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getAvailableExercises();
  }

  getAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesChanged.subscribe((exercises: ExerciseModel[]) => {
      this.availableExercises = exercises;
    })
  }

  onStart(form: NgForm) {
    console.log('data: ', form);
    this.trainingService.startTraining(form.value.exercise);
  }

}
