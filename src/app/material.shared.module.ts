import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";

const MODULES = [
  MatToolbarModule,
  MatButtonModule
];
@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialSharedModule {}