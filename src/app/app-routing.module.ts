import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },

  { 
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'placeadd',
    loadChildren: './place-add/place-add.module#PlaceAddPageModule'
  },
 
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'moderateresto/:id/:title/:address/:role', loadChildren: './moderateresto/moderateresto.module#ModeraterestoPageModule' },
  { path: 'title-edit', loadChildren: './moderate/title-edit/title-edit.module#TitleEditPageModule' },
  { path: 'add-food', loadChildren: './moderate/add-food/add-food.module#AddFoodPageModule' },
  { path: 'edit-sched', loadChildren: './moderate/edit-sched/edit-sched.module#EditSchedPageModule' },
  { path: 'myplace', loadChildren: './myplace/myplace.module#MyplacePageModule' },
 
  { path: 'add-photo', loadChildren: './moderate/add-photo/add-photo.module#AddPhotoPageModule' },
  { path: 'viewmeal/:id/:name/:price/:img', loadChildren: './client/viewmeal/viewmeal.module#ViewmealPageModule' },
  { path: 'reviews', loadChildren: './client/reviews/reviews.module#ReviewsPageModule' },
  { path: 'makereview', loadChildren: './client/makereview/makereview.module#MakereviewPageModule' }
  
 

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
