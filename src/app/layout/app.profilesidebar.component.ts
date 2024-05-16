import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../module/auth/service/auth.service.service';
import { Router } from '@angular/router'; // Importa el Router para redirigir al usuario después del cierre de sesión
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {
    user: any;

    constructor( public layoutService: LayoutService, private cookie: CookieService, private authService: AuthServiceService, private messageService: MessageService, private router: Router) {
        this.user = JSON.parse(this.cookie.get('user'));
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    logout() {
        this.authService.logoutUser().subscribe(
          () => {
            this.messageService.add({severity:'info', summary:'Login', detail:'Se cerró la sesión correctamente'});
          },
          error => {
            console.error(error);
            this.messageService.add({severity:'error', summary:'Error', detail:'Hubo un problema al cerrar sesión.'});
          }
        );
      }
      
}
