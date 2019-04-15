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
  { path: 'moderateresto/:id/:title/:address', loadChildren: './moderateresto/moderateresto.module#ModeraterestoPageModule' },
  { path: 'title-edit', loadChildren: './moderate/title-edit/title-edit.module#TitleEditPageModule' },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
