import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMuebleComponent } from './modificar-mueble.component';

describe('ModificarMuebleComponent', () => {
  let component: ModificarMuebleComponent;
  let fixture: ComponentFixture<ModificarMuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
