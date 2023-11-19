import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AttendanceComponent } from './attendance/attendance.component';
import { ClassPointComponent } from './class-point/class-point.component';

import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { ClassComponent } from './class/class.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { GeneratePointComponent } from './generate-point/generate-point.component';
import { UserMngComponent } from './user-mng/user-mng.component';
import { ClassMngComponent } from './class-mng/class-mng.component';
import { ClassMngDetailComponent } from './class-mng/class-mng-detail/class-mng-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'class' },

  { path: 'attendance', component: AttendanceComponent },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'class', component: ClassComponent },
  { path: 'class/class-detail', component: ClassDetailComponent },
  { path: 'gen-point', component: GeneratePointComponent },
  { path: 'gen-point/class-point', component: ClassPointComponent},
  { path: 'user-mng', component: UserMngComponent},
  { path: 'class-mng', component: ClassMngComponent},
  { path: 'class-mng/class-mng-detail', component: ClassMngDetailComponent},
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)},
  { path: 'table', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule), canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
