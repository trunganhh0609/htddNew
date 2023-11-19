import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:qr_attendance/net-work/attendance-net-work.dart';
import 'package:qr_attendance/screens/auth-screen.dart';
import 'package:qr_attendance/screens/home-screen.dart';
import 'package:qr_attendance/screens/splash-screen.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'controller/user-controller.dart';

void main() => runApp(GetMaterialApp(
  initialRoute: "/",
  routes: {
  '/' :(context) => SplashScreen(),
  '/auth': (context) => AuthScreen(),
  },
));



class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;


  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;
  AttendanceNetWork _attendanceNetWork = AttendanceNetWork();
  var userController = Get.put(UserController());

  @override
  void reassemble(){
    super.reassemble();
      controller?.resumeCamera();
  }

  @override
  void initState(){
    super.initState();
    reassemble();
  }
  @override
  void dispose(){
    controller?.dispose();
    super.dispose();
  }
  // attendance(Map param) async{
  //   await _attendanceNetWork.attendance(param);
  // }
  checkDeviceId(Map param) async{
    Map data = await _attendanceNetWork.checkDevideId(param);
    print(data);
    print(data["response"]);
    if(int.parse(data["response"].toString()) == 0){
      return true;
    }else return false;
  }
  void _onQRViewCreated(QRViewController controller){
    this.controller = controller;
    this.controller!.resumeCamera();
    controller.scannedDataStream.listen((scanData) async {
      var now = DateTime.now();
      String data = scanData.code.toString();
      print(data);
      controller.pauseCamera();
      String lesson = '';
      String idClass = '';
      String startExpiredString = '';
      String expiredString = '';
      String status = '';

      int count = 0;
      int i = 0;
      while(i < data.length){
        if(count == 0){
          if(data[i] != ';'){
            lesson += data[i];
            i++;
          }else{
            count++;
            i++;
          }
        }
        if(count == 1){
          if(data[i] != ';'){
            idClass += data[i];
            i++;
          }else{
            count++;
            i++;
          }
        }
        if(count == 2){
          if(data[i] != ';'){
            startExpiredString += data[i];
            i++;
          }else{
            count++;
            i++;
          }
        }
        if(count == 3){
          if(data[i] != ';'){
            expiredString += data[i];
            i++;
          }else{
            count++;
            i++;
          }
        }
        if(count == 4){
          if(data[i] != ';'){
            status += data[i];
            i++;
          }else{
            count++;
            i++;
          }
        }
      }

      DateTime startexpiredTime = DateTime.parse(startExpiredString);
      DateTime expiredTime = DateTime.parse(expiredString);
      print(expiredTime);
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      if(now.isBefore(expiredTime) && now.isAfter(startexpiredTime)){
        Map param = {
          'userId': prefs.get("uid"),
          'lesson': lesson,
          'idClass': idClass,
          'status': status,
          'deviceId': userController.deviceId.value
        };
        if(await checkDeviceId(param) == true){
          var res = await _attendanceNetWork.attendance(param);
          if(res["response"] == "success"){
            controller.pauseCamera();
            dialog("Điểm danh thành công", "Bạn đã điểm danh thành công", "");
          }else{
            controller.pauseCamera();
            dialog("Điểm danh thất bại", "", "");
          }
        }else{
          controller.pauseCamera();
          dialog('Điểm danh thất bại','Thiết bị này đã điểm danh','Bạn không thể điểm danh quá 1 lần trong buổi điểm danh này!');
        }

      }
    });
  }
  dialog(String tilte, String content1, String content2) {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(tilte),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text(content1),
                Text(content2),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.pushReplacement(
                    context, MaterialPageRoute(builder: (context) => Home()));
              },
            ),
          ],
        );
      },
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            flex: 5,
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
              overlay: QrScannerOverlayShape(
                cutOutSize: MediaQuery.of(context).size.width * 0.8,
                borderWidth: 5,
                borderLength: 20,
                borderRadius: 10,
                borderColor: Colors.redAccent
              ),
            )
          ),
          // Expanded(
          //   flex: 1,
          //   child: Center(
          //     child: (result != null)? Text('Data: ${result!.code}') : Text('Scan code'),
          //   ),)
        ],
      ),
    );
  }
}
