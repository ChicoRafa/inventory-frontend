import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Category } from '../category/components/category/category';

export const childRoutes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'category', component: Category }
]


@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
