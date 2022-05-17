import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './Components/create/create.component';
import { ListComponent } from './Components/list/list.component';
import { RegisterComponent } from './Components/register/register.component';
import { SigninComponent } from './Components/signin/signin.component';
import { HeaderComponent } from './Components/header/header.component';
import { authInterceptorProviders } from './Service/interceptor';
import { AuthGuardService } from './Service/authguard';
import { PaginationComponent } from './Components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    RegisterComponent,
    SigninComponent,
    HeaderComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PaginationModule.forRoot() 
   ],
  providers: [authInterceptorProviders,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
