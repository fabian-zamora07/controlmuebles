import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarInsumosComponent } from './autorizar-insumos.component';

describe('AutorizarInsumosComponent', () => {
  let component: AutorizarInsumosComponent;
  let fixture: ComponentFixture<AutorizarInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizarInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
