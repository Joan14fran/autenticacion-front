import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../service/home.service.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.checkTokenValidity();
  }

  checkTokenValidity() {
    this.homeService.getSomething().subscribe(
      response => {
        console.log(response);
        // Haz lo que necesites con la respuesta
      },
      error => {
        console.error(error);
        // Maneja los errores aquí
      }
    );
  }
}
