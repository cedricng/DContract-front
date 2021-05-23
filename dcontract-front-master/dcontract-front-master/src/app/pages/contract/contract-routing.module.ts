import { ProjectsComponent } from './projects/projects.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: ProjectsComponent,
},
  {
    path: "list",
    component: ContractListComponent,
},
{
  path: "details",
  component: ContractDetailsComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
