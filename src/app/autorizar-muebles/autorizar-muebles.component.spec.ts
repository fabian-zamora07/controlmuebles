import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarMueblesComponent } from './autorizar-muebles.component';

describe('AutorizarMueblesComponent', () => {
  let component: AutorizarMueblesComponent;
  let fixture: ComponentFixture<AutorizarMueblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizarMueblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarMueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
