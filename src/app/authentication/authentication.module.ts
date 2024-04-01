import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { NgZorroModule } from '../shared-modules/ng-zorro/ng-zorro.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    NgxTypedWriterModule,
  ],
})
export class AuthenticationModule {}
