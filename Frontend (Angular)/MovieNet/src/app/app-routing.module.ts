import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { userGuard } from './services/user.guard';
import { MoviedetailsComponent } from './pages/moviedetails/moviedetails.component';

const routes: Routes = [
  { path: 'detail/:id', component: MoviedetailsComponent },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    // children: [
    //   {
    //     path: '',
    //     component:  ,
    //   },
    // ],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'Signin',
    component: SigninComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [userGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
