import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './Components/create/create.component';
import { ListComponent } from './Components/list/list.component';
import { EditComponent } from './Components/edit/edit.component';
import { RegisterComponent } from './Components/register/register.component';
import { SigninComponent } from './Components/signin/signin.component';
import { HeaderComponent } from './Components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    RegisterComponent,
    SigninComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
