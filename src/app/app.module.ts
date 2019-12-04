import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log-list/log.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogEditComponent } from './log/log-edit/log-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogComponent,
    LogDetailComponent,
    LogEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
