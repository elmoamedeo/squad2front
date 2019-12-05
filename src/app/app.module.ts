import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogEditComponent } from './log/log-edit/log-edit.component';
import { LogComponent } from './log/log-list/log.component';
import { LoginComponent } from './login/login.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ApiService } from 'src/service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogComponent,
    LogDetailComponent,
    LogEditComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
