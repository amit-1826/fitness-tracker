import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  pastExercises = new MatTableDataSource<ExerciseModel>();
  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.pastExercises.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit() {
    this.pastExercises.sort = this.sort;
    this.pastExercises.paginator = this.paginator;
  }

  filterData(event: Event) {
    this.pastExercises.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }

}
