import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
@ViewChild('name') nameKey: ElementRef;

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  startSurvey(){
    localStorage.setItem('name', this.nameKey.nativeElement.value);
    this.route.navigate(['survey']);
  }


}
