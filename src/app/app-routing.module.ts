import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {CurrentTrainingComponent} from "./training/current-training/current-training.component";
import {TrainingComponent} from "./training/training.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then((module) => module.TrainingModule) ,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
