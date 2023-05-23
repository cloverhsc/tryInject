import { Component, OnInit } from '@angular/core';
import { ParentService } from '../service/parent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  welcomeMessage = '';

  constructor(private pService: ParentService) {}

  ngOnInit(): void {
    this.pService.passHello().then((data) => {
      this.welcomeMessage = data;
    });
  }
}
