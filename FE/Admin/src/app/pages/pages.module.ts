import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';

import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';

import { IconsModule } from './icons/icons.module';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AttendanceComponent } from './attendance/attendance.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClassComponent } from './class/class.component';
import { AuthInterceptor } from '../interceptor/interceptor';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { CommonService } from '../services/common/common.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';

import { SettingAttendanceComponent } from './class/setting-attendance/setting-attendance.component';
import { QrAttendanceComponent } from './class/qr-attendance/qr-attendance.component';
import { GeneratePointComponent } from './generate-point/generate-point.component';
import { ClassPointComponent } from './class-point/class-point.component';
import { CreatePointFormComponent } from './class-point/create-point-form/create-point-form.component';
import { UserMngComponent } from './user-mng/user-mng.component';
import { ClassMngComponent } from './class-mng/class-mng.component';
import { UserMngFormComponent } from './user-mng/user-mng-form/user-mng-form.component';
import { ClassMngFormComponent } from './class-mng/class-mng-form/class-mng-form.component';
import { ClassMngDetailComponent } from './class-mng/class-mng-detail/class-mng-detail.component';
import { ClassMngDeailFormComponent } from './class-mng/class-mng-detail/class-mng-deail-form/class-mng-deail-form.component';
import { DropdownModule } from 'primeng/dropdown';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [CalendarComponent, AttendanceComponent, ClassComponent, ClassDetailComponent, SettingAttendanceComponent, QrAttendanceComponent, GeneratePointComponent, ClassPointComponent, CreatePointFormComponent, UserMngComponent, ClassMngComponent, UserMngFormComponent, ClassMngFormComponent, ClassMngDetailComponent, ClassMngDeailFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    IconsModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    NgxQRCodeModule,
    TableModule,
    ButtonModule,
    ToastModule,
    NgSelectModule,
    MultiSelectModule,
    DropdownModule
  ],
  providers: [
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ]
})
export class PagesModule { }
