import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authenticationService: AuthenticationService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(res => {
      this.router.navigate(['/logs']);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
