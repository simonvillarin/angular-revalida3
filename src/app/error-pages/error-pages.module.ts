import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './error404-page/error404-page.component';
import { Error403PageComponent } from './error403-page/error403-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    Error403PageComponent,
  ],
  imports: [
    CommonModule
  ]
  
})
export class ErrorPagesModule { }
