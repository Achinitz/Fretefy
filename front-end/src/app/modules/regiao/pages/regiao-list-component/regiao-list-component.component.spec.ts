import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiaoListComponent } from './regiao-list-component.component';

describe('RegiaoListComponent', () => {
  let component: RegiaoListComponent;
  let fixture: ComponentFixture<RegiaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegiaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
