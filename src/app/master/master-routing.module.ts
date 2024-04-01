import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master.component';
import { authGuard } from '../shared-modules/auth/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { MyDealsComponent } from './my-deals/my-deals.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
  
    children: [
      {
        path: 'demo',
        component: DashboardComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'my-deals',
        component: MyDealsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
