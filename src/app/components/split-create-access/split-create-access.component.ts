import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-split-create-access',
  templateUrl: './split-create-access.component.html',
  styleUrls: ['./split-create-access.component.css']
})
export class SplitCreateAccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToCreateTest(): void {
    this.router.navigate(['/create-test']);
  }

  public navigateToAccessTest(): void {
    this.router.navigate(['/access-test']);
  }

}
