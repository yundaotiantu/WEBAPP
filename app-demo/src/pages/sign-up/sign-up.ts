import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController ,ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user = {
    uname:'',
    upwd:'',
    cpwd:'',
    email:'',
    phone:'',
    gender:'male',
    age:'',
    city:'BeiJing'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams , public httpClient : HttpClient , public alertCtrl:AlertController , public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp():void{
    let msg = {
      nreg:/^\w{4,10}$/,
      ureg:/^\w{6,10}$/,
      creg:/^\w{6,10}$/,
      preg:/^1[34578]\d{9}$/,
      ereg:/\w{6,11}@[A-Za-z]+\.com/
    };
    let url = '/signUp';
    if(this.user.uname==""){
        this.alertCtrl.create({
          title:'输入有误',
          subTitle:'用户名不能为空',
          buttons:['Ok']
        }).present();
        return;
    }else if(!msg.nreg.test(this.user.uname)){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'用户名格式不正确',
        buttons:['Ok']
      }).present();
      this.user.uname="";
      return;
    }else if(this.user.upwd==""){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'密码不能为空',
        buttons:['Ok']
      }).present();
      return;
    }else if(!msg.ureg.test(this.user.upwd)){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'密码格式不正确',
        buttons:['Ok']
      }).present();
      this.user.upwd="";
      return;
    }else if(this.user.cpwd!=this.user.upwd){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'两次密码不一致',
        buttons:['Ok']
      }).present();
      return;
    }else if(!msg.creg.test(this.user.cpwd)){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'确认密码格式不正确',
        buttons:['Ok']
      }).present();
      this.user.cpwd="";
      return;
    }else if(this.user.email==""){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'邮箱不能为空',
        buttons:['Ok']
      }).present();
      return;
    }else if(!msg.ereg.test(this.user.email)){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'邮箱格式不正确',
        buttons:['Ok']
      }).present();
      this.user.email="";
      return;
    }else if(this.user.phone=="") {
      this.alertCtrl.create({
        title: '输入有误',
        subTitle: '手机号码不能为空',
        buttons: ['Ok']
      }).present();
    }else if(!msg.preg.test(this.user.phone)){
      this.alertCtrl.create({
        title:'输入有误',
        subTitle:'手机号码格式不正确',
        buttons:['Ok']
      }).present();
      this.user.phone="";
      return;
    }else{
      this.httpClient.post(url,{user:this.user}).subscribe(
      (res)=>{
        if(res['code']==1){
          this.alertCtrl.create({
            title:'输入有误',
            subTitle:'用户名已经存在',
            buttons:['Ok']
          }).present();
          this.user.uname="";
        }else if(res['code']==2){
          this.alertCtrl.create({
            title:'输入有误',
            subTitle:'邮箱已经存在',
            buttons:['Ok']
          }).present();
          this.user.email="";
        }else if(res['code']==3){
          this.alertCtrl.create({
            title:'输入有误',
            subTitle:'手机号码已经存在',
            buttons:['Ok']
          }).present();
          this.user.phone="";
        }else if(res['code']=='ok'){
          this.alertCtrl.create({
            title:'注册成功，去登陆',
            buttons:['Ok']
          }).present();
          this.navCtrl.push('HomePage');
        }
      },
      (err)=>{
        console.log(err);
      }
    );
    }
  }
}
