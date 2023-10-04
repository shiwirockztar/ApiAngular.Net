import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
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
    // children: [
    //   {
    //     path: '',
    //     component:  ,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
