import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {UiService} from "./services/uiService";
import {AuthModule} from "./auth/auth.module";
import {TrainingModule} from "./training/training.module";
import {MaterialModule} from "./material.module";
import { AuthService } from './auth/auth-service';
import { TrainingService } from './training/training.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    TrainingModule,
    MaterialModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [UiService, AuthService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
