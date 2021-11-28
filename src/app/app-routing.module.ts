import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path: "", component: PostListComponent, pathMatch: "full"},
  {path: "create", component: PostCreateComponent},
  {path: "edit/:id", component: PostCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
