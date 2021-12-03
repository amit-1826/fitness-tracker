import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {

  pastExercises = new MatTableDataSource<ExerciseModel>();
  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastExercises.data = this.trainingService.getPastExercises();
    console.log(this.pastExercises);
  }

}
