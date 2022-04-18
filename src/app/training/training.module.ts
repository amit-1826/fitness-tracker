import {NgModule} from "@angular/core";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {TrainingComponent} from "./training.component";
import {
  CancelTrainingDialogComponent
} from "./current-training/cancel-training-dialog/cancel-training-dialog.component";
import { SharedModule } from "../shared/shared.module";
import {TrainingRoutingModule} from "./training-routing.module";
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    CancelTrainingDialogComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule {}
