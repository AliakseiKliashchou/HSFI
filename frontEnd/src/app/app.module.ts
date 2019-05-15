import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {Routes, RouterModule} from '@angular/router';

import {MatButtonModule, MatCheckboxModule, MatMenu, MatMenuModule, MatIconModule, MatInput, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {MatFormFieldModule, MatFormField, MatHint, MatFormFieldBase, MatError} from '@angular/material/form-field';
import { LogInComponent } from './components/header/log-in/log-in.component';
import { CreateNewAccountComponent } from './components/header/create-new-account/create-new-account.component';
import { FaoComponent } from './components/header/create-new-account/fao/fao.component';
import { NpcComponent } from './components/header/create-new-account/npc/npc.component';
import { OperatorsComponent } from './components/header/create-new-account/operators/operators.component';
import { ChooseCategoryComponent } from './components/choose-category/choose-category.component';
import { VendorRegistrationDeskComponent } from './components/choose-category/vendor-registration-desk/vendor-registration-desk.component';
import { ScratchCardDeskComponent } from './components/choose-category/scratch-card-desk/scratch-card-desk.component';
import { HotlineComponent } from './components/choose-category/hotline/hotline.component';
import { InspectionDeskComponent } from './components/choose-category/inspection-desk/inspection-desk.component';
import { ReportComponent } from './components/choose-category/report/report.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaoProfileComponent } from './components/header/create-new-account/fao/fao-profile/fao-profile.component';
import { NpcProfileComponent } from './components/header/create-new-account/npc/npc-profile/npc-profile.component';
import { OperatorProfileComponent } from './components/header/create-new-account/operators/operator-profile/operator-profile.component';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';



const appRoutes: Routes = [
  {path:'',component: HomeComponent},
  {path:'fao', component: FaoComponent},
  {path:'fao_profile', component: FaoProfileComponent},
  {path:'npc', component: NpcComponent},
  {path:'npc_profile', component:  NpcProfileComponent},
  {path:'operators', component: OperatorsComponent},
  {path:'operators_profile', component: OperatorProfileComponent},
  {path:'hotline', component: HotlineComponent},
  {path:'inspectionDesk', component: InspectionDeskComponent},
  {path:'report', component: ReportComponent},
  {path:'scratchCardDesk', component: ScratchCardDeskComponent},
  {path:'vendorregistrationDesk', component: VendorRegistrationDeskComponent}

];


@NgModule({
  declarations: [
    AppComponent,   
    HeaderComponent, 
    LogInComponent, 
    CreateNewAccountComponent, 
    FaoComponent, 
    NpcComponent, 
    OperatorsComponent, 
    ChooseCategoryComponent, 
    VendorRegistrationDeskComponent,
    ScratchCardDeskComponent,
    HotlineComponent, 
    InspectionDeskComponent, 
    ReportComponent, 
    HomeComponent, 
    FooterComponent, 
    FaoProfileComponent, 
    NpcProfileComponent, 
    OperatorProfileComponent, 
    FileSelectDirective,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatDatepickerModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),

    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
