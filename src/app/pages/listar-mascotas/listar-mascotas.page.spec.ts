import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarMascotasPage } from './listar-mascotas.page';

describe('ListarMascotasPage', () => {
  let component: ListarMascotasPage;
  let fixture: ComponentFixture<ListarMascotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
