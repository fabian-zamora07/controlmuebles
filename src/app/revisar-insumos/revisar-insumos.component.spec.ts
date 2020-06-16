import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarInsumosComponent } from './revisar-insumos.component';

describe('RevisarInsumosComponent', () => {
  let component: RevisarInsumosComponent;
  let fixture: ComponentFixture<RevisarInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
