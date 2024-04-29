import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard'; // Importa la clase AuthGuard

describe('AuthGuard', () => {
  let guard: AuthGuard; // Declara una variable para almacenar la instancia de AuthGuard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard); // Crea una instancia de AuthGuard usando TestBed.inject()
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Verifica que la instancia de AuthGuard haya sido creada correctamente
  });
});
