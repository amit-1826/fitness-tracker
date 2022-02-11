import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  pastExercises = new MatTableDataSource<ExerciseModel>();
  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
  pastExercisesSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.fetchPastExercises();
    this.pastExercisesSubscription = this.trainingService.pastExercisesChanged.subscribe((exercises: ExerciseModel[]) => {
      this.pastExercises.data = exercises;
    }) 
  }

  ngAfterViewInit() {
    this.pastExercises.sort = this.sort;
    this.pastExercises.paginator = this.paginator;
  }

  filterData(event: Event) {
    this.pastExercises.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.pastExercisesSubscription) {
      this.pastExercisesSubscription.unsubscribe();
    }
  }

}
