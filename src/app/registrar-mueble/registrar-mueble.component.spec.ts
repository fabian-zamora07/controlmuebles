import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMuebleComponent } from './registrar-mueble.component';

describe('RegistrarMuebleComponent', () => {
  let component: RegistrarMuebleComponent;
  let fixture: ComponentFixture<RegistrarMuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarMuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
