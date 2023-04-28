import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any = null

  constructor(private authService:AuthserviceService) { }

  ngOnInit(): void {


    this.authService.user.subscribe((res:any)=>{
      if(res.role){
        this.user = res
      }
    })
  }


  logout(){
    const model ={}

    this.authService.login(model).subscribe(res =>{
      this.user = null
      this.authService.user.next(res)
    })
  }

}
