import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import { ContratComponent } from './contrat/contrat.component';
import { ContractGridComponent } from './contract-grid/contract-grid.component';
import { ClienteGridComponent } from './cliente-grid/cliente-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ContratComponent,
    ContractGridComponent,
    ClienteGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
