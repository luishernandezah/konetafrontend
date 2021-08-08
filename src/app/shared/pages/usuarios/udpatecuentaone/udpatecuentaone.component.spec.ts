import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdpatecuentaoneComponent } from './udpatecuentaone.component';

describe('UdpatecuentaoneComponent', () => {
  let component: UdpatecuentaoneComponent;
  let fixture: ComponentFixture<UdpatecuentaoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdpatecuentaoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdpatecuentaoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
