import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { userGuard } from './services/user.guard';
import { MoviedetailsComponent } from './pages/moviedetails/moviedetails.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // ],
  },
  {
    path: 'home',
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
    path: 'detail/:Id',
    component: MoviedetailsComponent,
    pathMatch: 'full',
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
    // pathMatch: 'full',
    children: [
      {
        path: 'gallery',
        component: GalleryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// canActivate: [userGuard],
