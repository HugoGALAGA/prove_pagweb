import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTester } from './api-tester';

describe('ApiTester', () => {
  let component: ApiTester;
  let fixture: ComponentFixture<ApiTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTester]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiTester);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
