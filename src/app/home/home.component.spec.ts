import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ParentService } from '../service/parent.service';
import { delay, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let parentService: ParentService;

  beforeEach(() => {
    const spyParentService = jasmine.createSpyObj('ParentService', ['passHello']);
    spyParentService.passHello.and.returnValue(of('Hello from ChildService').pipe(delay(2000)));
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

  it('should show "Hello Clover" message when child service returns "Hello Clover"', waitForAsync(() => {
    const welcomeMessage = 'Hello Clover';
    const compiled = fixture.nativeElement;
    parentService.passHello = jasmine.createSpy().and.returnValue(of(welcomeMessage).pipe(delay(2000)));

    component.ngOnInit();
    expect(parentService.passHello).toHaveBeenCalled()
    setTimeout(() => {
      fixture.detectChanges();
      fixture.whenStable();
      console.log(compiled.querySelector('h3'));
      console.log(component.welcomeMessage);
      expect(compiled.querySelector('h3').textContent).toContain(welcomeMessage);
    }, 2000)
    // fixture.detectChanges();
    // fixture.whenStable();
    // console.log(component.welcomeMessage);
    // console.log(compiled.querySelector('h3'));
    // expect(compiled.querySelector('h3').textContent).toContain(welcomeMessage);


  }));
});
