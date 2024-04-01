import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  spinner!: boolean;
  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private service: LoginService,
    private notification: NzNotificationService
  ) {
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('tokenExpiration');
  }

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  submitForm(): void {
    this.spinner = true;
    if (this.validateForm.valid) {
      this.service
        .loginForm({
          userName: this.validateForm.value.userName,
          password: this.validateForm.value.password,
        })
        .subscribe({
          next: (res: any) => {
            var token = res?.token;
            this.spinner = false;
            if (token) {
              const tokenExpirationTime = 12 * 60 * 60 * 1000;
              const expirationDate = new Date().getTime() + tokenExpirationTime;
              sessionStorage.setItem('token', token);
              sessionStorage.setItem(
                'tokenExpiration',
                expirationDate.toString()
              );
              localStorage.setItem('agentId', res?.agentId);
              this.router.navigate(['dashboard/add-user']);
            }
          },
          error: (err) => {
            this.notification.create(
              'error',
              'Unauthorized',
              'Please input your valid username or password.'
            );
            this.spinner = false;
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.spinner = false;
        }
      });
    }
  }
}
