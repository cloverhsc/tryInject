import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ParentService } from '../service/parent.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let parentService: ParentService;

  beforeEach(() => {
    const spyParentService = jasmine.createSpyObj('ParentService', ['passHello']);
    spyParentService.passHello.and.returnValue(Promise.resolve('Hello from ChildService'));
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ParentService, useValue: spyParentService }
      ]
    });
    parentService = TestBed.inject(ParentService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "welcome" message when child service returns "Hello Clover"', async () => {
    const welcomeMessage = 'Hello Clover';
    const compiled = fixture.nativeElement;
    parentService.passHello = jasmine.createSpy().and.returnValue(Promise.resolve(welcomeMessage));

    await component.ngOnInit();
    fixture.detectChanges();
    console.log(compiled.querySelector('h3'));
    expect(compiled.querySelector('h3').textContent).toContain(welcomeMessage);


  });
});
