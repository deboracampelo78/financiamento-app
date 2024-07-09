import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteGridComponent } from './cliente-grid.component';

describe('ClienteGridComponent', () => {
  let component: ClienteGridComponent;
  let fixture: ComponentFixture<ClienteGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
