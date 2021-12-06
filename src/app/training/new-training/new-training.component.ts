import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises: Observable<any[]>;
  constructor(private trainingService: TrainingService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getAvailableExercises();
  }

  getAvailableExercises() {
    this.availableExercises = this.firestore.collection('availableExercises').valueChanges();
  }

  onStart(data: any) {
    this.trainingService.startTraining(data._value);
  }

}
