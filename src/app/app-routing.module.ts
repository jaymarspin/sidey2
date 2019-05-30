import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {LoginGuard} from './guards/login-guard.guard'
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
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
  { path: 'moderateresto/:id/:title/:address/:role/:distance/:lat/:long', loadChildren: './moderateresto/moderateresto.module#ModeraterestoPageModule' },
  { path: 'title-edit', loadChildren: './moderate/title-edit/title-edit.module#TitleEditPageModule' },
  { path: 'add-food/:id/:name', loadChildren: './moderate/add-food/add-food.module#AddFoodPageModule' },
  { path: 'edit-sched', loadChildren: './moderate/edit-sched/edit-sched.module#EditSchedPageModule' },
  { path: 'myplace', loadChildren: './myplace/myplace.module#MyplacePageModule' },
 
  { path: 'add-photo', loadChildren: './moderate/add-photo/add-photo.module#AddPhotoPageModule' },
  { path: 'viewmeal/:id/:name/:price/:img', loadChildren: './client/viewmeal/viewmeal.module#ViewmealPageModule' },
  { path: 'reviews', loadChildren: './client/reviews/reviews.module#ReviewsPageModule' },
  { path: 'makereview', loadChildren: './client/makereview/makereview.module#MakereviewPageModule' },
  { path: 'category', loadChildren: './moderate/category/category.module#CategoryPageModule' },
  { path: 'menu', loadChildren: './moderate/menu/menu.module#MenuPageModule' },
  { path: 'albums', loadChildren: './moderate/albums/albums.module#AlbumsPageModule' },
  { path: 'minfo', loadChildren: './moderate/minfo/minfo.module#MinfoPageModule' },
  { path: 'resto-gallery', loadChildren: './client/resto-gallery/resto-gallery.module#RestoGalleryPageModule' },
  { path: 'photoviewer', loadChildren: './client/photoviewer/photoviewer.module#PhotoviewerPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
