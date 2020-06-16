import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarMueblesComponent } from './revisar-muebles.component';

describe('RevisarMueblesComponent', () => {
  let component: RevisarMueblesComponent;
  let fixture: ComponentFixture<RevisarMueblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarMueblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarMueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
