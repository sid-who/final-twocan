import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ApiServiceService } from './api-service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public restApi: ApiServiceService, public router: Router,private http: HttpClient) { }

  checkUser(username, password)
  {
    //let temp;
    const params1 = new HttpParams()
      .append('password', password)
      .append('userID', username);
      this.http.post<any>('http://twocan-zuul.us-east-2.elasticbeanstalk.com/users/login?' + 'password=' + password + '&' +'userID='+username, {params1}).subscribe(data => {
       // alert(data);
        if(data === true)
        {
          sessionStorage.setItem('username', username);
        }
        
      })

      // alert(sessionStorage.getItem('username'));
      
      if(sessionStorage.getItem('username') != null)
      {
        return true;
      }
      else
      {
       // alert('false again, you fucked up...USER');
        return false;
      }
  }

  checkAdmin(username, password)
  {
    let temp;
    const params = new HttpParams()
      .append('password', password)
      .append('userID', username);
      this.http.post<any>('http://twocan-zuul.us-east-2.elasticbeanstalk.com/users/login?' + 'password=' + password + '&' +'userID='+username, {params}).subscribe(data => {
        //alert(data);
        if(data === true)
        {
          sessionStorage.setItem('admin', username);
        }
      })

      if(sessionStorage.getItem('admin') != null)
      {
        return true;
      }
      else
      {
        //alert('false again, you fucked up...USER');
        return false;
      }
  }

  authenticate(username, password)
  {
    let returnDisp;
    if(username != "admin")
    {
      returnDisp = this.checkUser(username, password);
    }
    else
    {
      // alert(this.checkAdmin(username, password));
      returnDisp = this.checkAdmin(username, password);
      // alert(returnDisp + '@checkAdmin') 
    }
    // alert(returnDisp + ' == returnDisp')
    return returnDisp;

  }

  // checkAdmin(username, password)
  // {
  //   let temp;
  //   const params = new HttpParams()
  //     .append('password', password)
  //     .append('userID', username);
  //     this.http.post<any>('http://twocan-zuul.us-east-2.elasticbeanstalk.com/users/login?' + 'password=' + password + '&' +'userID='+username, {params}).subscribe(data => {
  //       //alert(data);
  //       //temp = data;
  //       alert(data);
  //       if(data === true)
  //       {
  //         temp = "true";
  //         sessionStorage.setItem('admin', username);
  //         //return true;
  //       }
  //       else
  //       {
  //         temp = "false";
  //       }
  //       /*else
  //       {
  //         alert("Boolean??")      
  //       }*/
  //     })
  //     /*if(temp == true)
  //     {
  //       sessionStorage.setItem('admin', username);
  //     }
  //     alert(temp + " == temp");
  //     return temp;*/
  //     //return false;
  //     //return temp;
  //     if(temp === "true")
  //     {
  //       return true;
  //     }
  //     else
  //     {
  //       return false;
  //     }
  // }

  /*authenticate(username,password){
    if(username == "Jorge" && password == "password"){
      sessionStorage.setItem('username',username)
      let key = username;
      //localStorage.setItem(key,this.username);
      return true;
    }
    else{
      return false;
    }
  }
  checkAdmin(username,password){
    if(username === "admin" && password === "admin"){
      sessionStorage.setItem('username',username)

      return true;
    }
    else{
      return false;
    }
  }*/
  isUserLoggedIn(){
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)

  }
  isAdminLoggedIn(){
    let admin = sessionStorage.getItem('admin')
    //console.log(!(admin === null))
    return !(admin === null)
  }
  logout(){
    sessionStorage.removeItem('username');
  }
}
