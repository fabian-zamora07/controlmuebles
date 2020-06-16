import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInsumosComponent } from './modificar-insumos.component';

describe('ModificarInsumosComponent', () => {
  let component: ModificarInsumosComponent;
  let fixture: ComponentFixture<ModificarInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
