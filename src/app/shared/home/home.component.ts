import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cliente = false
  usaurios = false
  role = false
  id:any
  data:any
  constructor() {
    const miusauiros = localStorage.getItem('users')
    this.data = JSON.parse(miusauiros||'')

    console.log(this.data)

   }

  ngOnInit(): void {
  }

}
