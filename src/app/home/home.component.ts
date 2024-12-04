import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dateToday: Date;
  msg: string;
  sign: boolean;
  sigOut: boolean = false;
  signDate: string = null;
  late: boolean = false;
  latey:boolean=false;
  lateR: boolean = false;
  excusesList: any[] = [
    { id: 1, value: "Public Holiday" },
    { id: 2, value: "Offical Errand/Assignment" },
    { id: 3, value: "Permitted by Supervior (Sent a mail)" },
    { id: 4, value: "Weather/Rain" },
    { id: 5, value: "No Excuse" }
  ];
  excuse:any;

  constructor(private attendanceService: AttendanceService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sign = false;
    this.attendanceService.getByUserAndDay('',new Date).subscribe(response=>{
      if(response==null){
        this.sign = false;
        this.msg = response.responseMessage;
      } else{
        this.dateToday=response.uploadedAt;
        this.sign=true;
        this.msg="You signed in at"
      }
    })
    // this.attendanceService.GettAttendanceTime(this.user.appId).subscribe((response: any) => {
    //   if (response.responseCode == 1) {
    //     this.dateToday = response.dataSet.timeIn;
    //     this.sign = true;
    //     this.msg = "You signed in at";
    //     this.lateR = response.dataSet.lateReason != null ? true : false;
    //     this.latey = response.dataSet.late;
    //   }
    //   if (response.responseCode == 2) {
    //     this.sign = false;
    //     this.msg = response.responseMessage;
    //   }
    // });
  }

  signIn() {
    // let userT = { userId: this.user.appId }
    // this.attendanceService.AddAttendance(userT).subscribe((response: any) => {
    //   if (response.responseCode == 1) {
    //     this.matSnackBar.open(response.responseMessage, 'Close', {
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       duration: 5000
    //     });
    //     this.dateToday = response.dataSet.timeIn;
    //     this.sign = true;
    //     this.msg = "You signed in at";
    //     this.late = response.dataSet.late == true ? true : false;
    //   }
    //   if (response.responseCode == 2) {
    //     this.matSnackBar.open(response.responseMessage, 'Close', {
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //     });
    //   }
    // }, error => console.log(error));
  }
  signOut() {
    // let userT = { userId: this.user.appId }
    // this.attendanceService.SignOut(userT).subscribe((response: any) => {
    //   if (response.responseCode == 1) {
    //     this.matSnackBar.open(response.responseMessage, 'Close', {
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       duration: 5000
    //     });
    //     this.dateToday = response.dataSet.timeOut;
    //     this.sign = true;
    //     this.sigOut = true;
    //     this.msg = "You signed out at";
    //   }
    //   if (response.responseCode == 2) {
    //     this.matSnackBar.open(response.responseMessage, 'Close', {
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //     });
    //   }
    // }, error => console.log(error));
  }

  lateReason(event:any){
  //   let reason= this.excusesList.find(x=>x.id==Number(event.target.value));
  //   let model={
  //     userId:this.user.appId,
  //     lateReason:reason.value
  //   }
  //   this.attendanceService.Excuse(model).subscribe(response => {
  //     console.log(response);
  //     this.lateR = true;
  //   }, error => { console.log(error); this.lateR = false; });

  // }
  // get user(): User {
  //   return JSON.parse(localStorage.getItem('goal_tracker_user')) as User;
  // }

}}
