import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IUser, User } from 'src/model/user.model';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  invalidRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  public createFromForm(): IUser {
    return{
      ...new User(),
      name: this.registerForm.get('name').value.toLowerCase(),
      email: this.registerForm.get('email').value.toLowerCase(),
      password: this.registerForm.get('password').value,
      accessToken: "",
      role: "USER",
      active: true
    }
  }

  onSubmit() {
    this.userService.createUser(this.createFromForm())
      .subscribe(
        res => {
          this.router.navigate(['login']);
        }, (err) => {
          this.invalidRegister = true;
          console.log(err);
        });
  }

}
