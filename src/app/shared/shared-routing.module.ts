import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ErrorComponent } from './components/error/error.component';
import { AccessComponent } from './components/access/access.component';

const routes: Routes = [
  { path: "notfound", component: NotfoundComponent },
  { path: "error", component: ErrorComponent },
  { path: "access", component: AccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
