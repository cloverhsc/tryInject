import { Injectable, OnInit } from '@angular/core';
import { ChildService } from './child.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService implements OnInit {

  constructor(private childService: ChildService) {}

  ngOnInit(): void {
    this.childService.sendHello().subscribe((data) => {
      console.log(data);
    });
  }

  async passHello(): Promise<string> {
    let message = '';
    this.childService.sendHello().subscribe((data) => {
      console.info('data', data);
      message = data;
    });

    const res1 = await lastValueFrom(this.childService.sendHello());

    // assign the value of res1 to message
    message = res1;
    return message;
  }
}
