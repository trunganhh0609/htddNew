import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:device_information/device_information.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:qr_attendance/main.dart';
import 'package:qr_attendance/screens/auth-screen.dart';
import 'package:qr_attendance/screens/home-screen.dart';
import 'package:qr_attendance/screens/login.dart';
import 'package:qr_attendance/utils/authentication.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../controller/user-controller.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  var deviceInfo = DeviceInfoPlugin();
  var userController = Get.put(UserController());
  @override
  void initState(){
    super.initState();
    checkId();
    // gotoLoginPage();
    checkToken();
  }
   checkId() async{

     final prefs = await SharedPreferences.getInstance();
     if(prefs.get("deviceId").isNull){
       prefs.setString("deviceId", DateTime.now().millisecondsSinceEpoch.toString());
       userController.deviceId.value = prefs.get("deviceId").toString();
     }else{
       userController.deviceId.value = prefs.get("deviceId").toString();
     }
     print(userController.deviceId.value = prefs.get("deviceId").toString());
     // if (await Permission.phone.request().isGranted) {
     //   // Làm gì đó sau khi được cấp quyền
     //   userController.deviceId.value = await DeviceInformation.deviceIMEINumber;
     //   print(userController.deviceId.value);
     // } else {
     //   // Làm gì đó khi không được cấp quyền
     //   // dialog("Thông báo", "Cấp quyền ứng dụng", "Bạn cần cấp quyền ứng dụng để điểm danh");
     // }

    // if (Platform.isIOS) {
    //   var iosDeviceInfo = await deviceInfo.iosInfo;
    //   userController.deviceId.value = iosDeviceInfo.identifierForVendor!; // unique ID on iOS
    // } else {
    //   var androidDeviceInfo = await deviceInfo.androidInfo;
    //   userController.deviceId.value = androidDeviceInfo.id; // unique ID on Android
    // }
  }
  // dialog(String tilte, String content1, String content2) {
  //   return showDialog<void>(
  //     context: context,
  //     barrierDismissible: false,
  //     builder: (BuildContext context) {
  //       return AlertDialog(
  //         title: Text(tilte),
  //         content: SingleChildScrollView(
  //           child: ListBody(
  //             children: <Widget>[
  //               Text(content1),
  //               Text(content2),
  //             ],
  //           ),
  //         ),
  //         actions: <Widget>[
  //           TextButton(
  //             child: const Text('OK'),
  //             onPressed: () {
  //               Permission.phone.request();
  //             },
  //           ),
  //         ],
  //       );
  //     },
  //   );
  // }
  checkToken() async {
    if(await Authentication.checkToken()){
      gotoLoginPage();
    }else{
      gotoHomePage();
    }
  }
  gotoLoginPage() async {
    await Future.delayed(Duration(seconds: 3), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LoginScreen()));
  }
  gotoHomePage() async {
    await Future.delayed(Duration(seconds: 3), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => AuthScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Home App',
        theme: ThemeData(
          primaryColor: Colors.lightBlueAccent,
        ),
        home: Scaffold(
            body: Stack(
              children: [
                Image.asset('assets/image/img.png', fit: BoxFit.cover,width: MediaQuery.of(context).size.width),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text("QR Attendance",style: TextStyle(fontSize: 40,color: Colors.white,fontWeight: FontWeight.w500)),
                    ],
                  ),
                ),
              ],
            )));
  }
}
