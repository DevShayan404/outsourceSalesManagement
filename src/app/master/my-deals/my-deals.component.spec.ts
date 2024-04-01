import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealsComponent } from './my-deals.component';

describe('MyDealsComponent', () => {
  let component: MyDealsComponent;
  let fixture: ComponentFixture<MyDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
