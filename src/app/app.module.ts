import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { PrimengModule } from './shared/Primeng.module';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const ngxUiLoaderConfig: any = {
  "bgsColor": "#45648F",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "folding-cube",
  "blur": 0,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#ffffff",
  "fgsPosition": "bottom-right",
  "fgsSize": 20,
  "fgsType": "folding-cube",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(255,255,255,0)",
  "pbColor": "#45648F",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    FormsModule,
    PrimengModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
