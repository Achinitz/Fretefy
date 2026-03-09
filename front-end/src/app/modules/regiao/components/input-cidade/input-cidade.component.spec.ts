import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeInputComponent } from './input-cidade.component';

describe('CidadeInputComponent', () => {
  let component: CidadeInputComponent;
  let fixture: ComponentFixture<CidadeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
