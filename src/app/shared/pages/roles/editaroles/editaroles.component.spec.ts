import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarolesComponent } from './editaroles.component';

describe('EditarolesComponent', () => {
  let component: EditarolesComponent;
  let fixture: ComponentFixture<EditarolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
