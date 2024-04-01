import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master.component';
import { NgZorroModule } from '../shared-modules/ng-zorro/ng-zorro.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { MyDealsComponent } from './my-deals/my-deals.component';
import { PipePipe } from '../shared-modules/pipe/pipe.pipe';
@NgModule({
  declarations: [
    DashboardComponent,
    MasterComponent,
    AddUserComponent,
    MyDealsComponent,
    PipePipe,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class MasterModule {}
