import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { ContractModule } from './pages/contract/contract.module';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FaqComponent } from './pages/faq/faq.component';
import { UserModule } from './pages/user/user.module';
import { DndDirective } from './directives/dnd.directive';
import { Error404Component } from './pages/error404/error404.component';
import {FormsModule} from '@angular/forms';
import {AWSService} from './services/AWSService';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FaqComponent,
    DndDirective,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    UserModule,
    ContractModule,
    SharedModule,
    FormsModule,

  ],
  providers: [AWSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
