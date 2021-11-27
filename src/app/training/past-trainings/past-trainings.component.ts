import { Component, OnInit } from '@angular/core';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {

  pastExercises: ExerciseModel[] = [];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastExercises = this.trainingService.getPastExercises();
  }

}
