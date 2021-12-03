import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises: ExerciseModel[] = [];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.getAvailableExercises();
  }

  getAvailableExercises() {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  onStart(data: any) {
    this.trainingService.startTraining(data._value);
  }

}
