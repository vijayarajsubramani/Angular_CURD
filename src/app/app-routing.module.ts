import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './Components/create/create.component';
import { EditComponent } from './Components/edit/edit.component';
import { ListComponent } from './Components/list/list.component';
import { RegisterComponent } from './Components/register/register.component';
import { SigninComponent } from './Components/signin/signin.component';
import { AuthGuardService } from './Service/authguard';


const routes: Routes = [
  {path:'add',component:CreateComponent,canActivate:[AuthGuardService]},
  {path:'lists',component:ListComponent,canActivate:[AuthGuardService]},
  {path:'edit',component:EditComponent,canActivate:[AuthGuardService]},
  {path:'register',component:RegisterComponent},
  {path:'',component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
