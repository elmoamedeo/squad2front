import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthenticationService } from 'src/service/authentication.service';
import { LogService } from 'src/service/log.service';
import { JwtInterceptor } from 'src/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/_helpers/error.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from 'src/service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogComponent,
    LogDetailComponent,
    LogEditComponent,
    NavbarComponent,
    RegisterComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    // Services
    AuthenticationService,
    UserService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
