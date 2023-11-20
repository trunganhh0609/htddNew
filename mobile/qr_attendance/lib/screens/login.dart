import 'dart:ui';


import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:qr_attendance/controller/user-controller.dart';
import 'package:qr_attendance/net-work/login-network.dart';
import 'package:qr_attendance/utils/authentication.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'home-screen.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  var userController = Get.put(UserController());
  TextEditingController nameEditingController = TextEditingController();
  TextEditingController passwordEditingController = TextEditingController();
  String uid = '';
  String pwd = '';
  LoginNetWork _loginNetWork = LoginNetWork();
  bool passenable = true;

  login(Map<Object,Object> param) async{
    final prefs = await SharedPreferences.getInstance();

    Map<String,dynamic> res = await _loginNetWork.login(param);
    if(res['jwt'] != null){
      bool auth = await Authentication.authentication();
      print(auth);
      if(auth){
        prefs.setString('uid', res['Data']['id'].toString());
        prefs.setString('userInfo', res['Data']['name']);
        prefs. setString('Token',res['jwt'].toString());
        userController.userInfo.value = res['Data'];
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
      }
    }else{
      ScaffoldMessenger
          .of(
          context)
          .showSnackBar(
          snackBar(
              'Đăng nhập thất bại!'));
    }

  }
  SnackBar snackBar(String content) {
    return SnackBar(
      content: Text(content, style: TextStyle(fontSize: 15),),
      duration: const Duration(milliseconds: 1500),
      // width: 280.0, // Width of the SnackBar.
      padding: const EdgeInsets.symmetric(
        horizontal: 8.0, vertical: 15 // Inner padding for SnackBar content.
      ),
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Image.asset('assets/image/img.png', fit: BoxFit.cover,width: MediaQuery.of(context).size.width),
          Container(
            margin: EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                    margin: EdgeInsets.symmetric(vertical: 50),
                    child: const Text('Đăng nhập',
                        style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.w500,
                            color: Colors.white))),
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                  child: TextField(
                    style: TextStyle(color: Colors.white),
                    controller: nameEditingController,
                    onChanged: (name) {
                      setState(() {
                        uid = name;
                      });
                    },
                    decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                          borderSide:
                          BorderSide(color: Colors.white, width: 2.0),
                          borderRadius: BorderRadius.circular(30)),
                      labelText: "Mã sinh viên",
                      labelStyle: TextStyle(color: Colors.white),
                      hintText: "Nhập mã sinh viên",
                      hintStyle: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                  child: TextField(
                    obscureText: passenable,
                    style: TextStyle(color: Colors.white),
                    controller: passwordEditingController,
                    onChanged: (password) {
                      setState(() {
                        pwd = password;
                      });
                    },
                    decoration: InputDecoration(

                      enabledBorder: OutlineInputBorder(
                          borderSide:
                          BorderSide(color: Colors.white, width: 2.0),
                          borderRadius: BorderRadius.circular(30)),
                      labelText: "Mật khẩu",
                      labelStyle: TextStyle(color: Colors.white),
                      hintText: "Nhập mật khẩu",
                      hintStyle: TextStyle(color: Colors.white),
                      suffixIcon: IconButton(
                        color: Colors.white,
                          onPressed: (){ //add Icon button at end of TextField
                            setState(() { //refresh UI
                              if(passenable){ //if passenable == true, make it false
                                passenable = false;
                              }else{
                                passenable = true; //if passenable == false, make it true
                              }
                            });
                      }, icon: Icon(passenable == true?Icons.remove_red_eye:Icons.password))
                    ),
                  ),
                ),


                Container(
                  margin: EdgeInsets.only(top: 30),
                  child: ElevatedButton(
                    child: Text('Đăng nhập',style:TextStyle(fontSize: 14.0)),
                    onPressed: () {

                      Map<Object,Object> param = {
                        'userName': uid,
                        'password' : pwd,
                      };
                      login(param);

                      // Navigator.pushReplacement(context,
                      //     MaterialPageRoute(builder: (context) => Category()));

                    },
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}