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
    this.authenticationService.login(this.loginForm.controls.email.value.toLowerCase(), 
                                    this.loginForm.controls.password.value.toLowerCase())
      .subscribe(res => {
        this.router.navigate(['/logs']);
    }, (err) => {
      this.invalidLogin = true;
      console.log(err);
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

}
