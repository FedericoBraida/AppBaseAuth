import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExternalsProvidersComponent } from './button-externals-providers.component';

describe('ButtonExternalsProvidersComponent', () => {
  let component: ButtonExternalsProvidersComponent;
  let fixture: ComponentFixture<ButtonExternalsProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonExternalsProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonExternalsProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
