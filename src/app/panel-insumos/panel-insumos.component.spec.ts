import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInsumosComponent } from './panel-insumos.component';

describe('PanelInsumosComponent', () => {
  let component: PanelInsumosComponent;
  let fixture: ComponentFixture<PanelInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
