import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "./training.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingSubscription =  this.trainingService.trainingChanged.subscribe((exercise) => {
      this.onGoingTraining = exercise ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
  }

}
