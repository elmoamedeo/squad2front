import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log-list/log.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogEditComponent } from './log/log-edit/log-edit.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logs', component: LogComponent},
  { path: 'edit-log/:id', component: LogEditComponent },
  { path: 'log/:id', component: LogDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
