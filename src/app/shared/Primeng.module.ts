import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import { RippleModule } from "primeng/ripple";
import { RouterModule } from "@angular/router";
import {TieredMenuModule} from 'primeng/tieredmenu';
import {SidebarModule} from 'primeng/sidebar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RatingModule} from 'primeng/rating';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';
import {MenuModule} from 'primeng/menu';
import { TabViewModule } from "primeng/tabview";
import {TabMenuModule} from 'primeng/tabmenu';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipModule} from 'primeng/chip';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InputOtpModule } from 'primeng/inputotp';
import { KnobModule } from 'primeng/knob';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

// import { ChartModule } from 'primeng/chart';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
    ],exports:[
      SidebarModule,
      TabMenuModule,
      DividerModule,
      ChipModule,
      DataViewModule,
      SlideMenuModule,
      BadgeModule,
      PanelModule,
      KnobModule,
      // ChartModule,
      ConfirmDialogModule,
      InputOtpModule,
      StepsModule,
      MultiSelectModule,
      AutoCompleteModule,
      DropdownModule,
      ConfirmPopupModule,
      ToolbarModule,
      TableModule,
      MenuModule,
      CardModule,
      RatingModule,
      InputIconModule,
      IconFieldModule,
      SplitterModule,
        InputNumberModule,
        ToastModule,
        ButtonModule,
        CalendarModule,
        MegaMenuModule,
        InputMaskModule,
        TieredMenuModule,
        InputSwitchModule,
        InputTextModule,
        CheckboxModule,
        InputTextareaModule,
        PasswordModule,
        InputSwitchModule,
        RippleModule,
        DialogModule,
        RouterModule,
        FileUploadModule,
        TabViewModule,
        RadioButtonModule
    ]
  })
  export class PrimengModule {}
