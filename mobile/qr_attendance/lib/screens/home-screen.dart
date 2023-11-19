import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:qr_attendance/screens/attendance-info.dart';
import 'package:qr_attendance/screens/login.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../controller/user-controller.dart';
import '../main.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final _prefs = SharedPreferences.getInstance();
  var userController = Get.put(UserController());
  String userInfo = '';
  @override
  void initState() {
    super.initState();
    getFullName();
  }
  getFullName() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("userInfo").toString();
  }
  gotoScan() {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => MyApp()));
  }
  logout() async{
    final prefs = await SharedPreferences.getInstance();
    prefs.remove("uid");
    prefs.remove("Token");
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => loginscreen()));
  }
  showAlertDialog(BuildContext context) {

    // set up the buttons
    Widget cancelButton = TextButton(
      child: Text("Hủy"),
      onPressed:  () {Navigator.of(context).pop();},
    );
    Widget continueButton = TextButton(
      child: Text("Đồng ý"),
      onPressed:  () {logout();},
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("Đăng xuất"),
      content: Text("Bạn có chắc chắn muốn đăng xuất?"),
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
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
                    children: [
                      Container(
                        padding: EdgeInsets.symmetric(vertical: 50),
                        child: Row(
                          children: [
                            Spacer(),
                            IconButton(
                                onPressed: () => {
                                showAlertDialog(context)
                                },
                                icon: Icon(Icons.logout),color: Colors.white,)
                          ],
                        ),
                      ),

                      Container(
                        margin: EdgeInsets.fromLTRB(0,0,0,200),
                        child: FutureBuilder(
                          future: getFullName(),
                          builder: (BuildContext context, AsyncSnapshot snapshot) {
                            if (snapshot.connectionState == ConnectionState.waiting) {
                              return CircularProgressIndicator();
                            }
                            if (snapshot.hasData) {
                              return Text("Xin chào " + snapshot.data,
                                  style: TextStyle(
                                      fontSize: 25,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white));
                            }
                            return Container();
                          },
                        )
                      ),
                      ElevatedButton.icon(
                        icon: Icon(Icons.qr_code_scanner),
                          onPressed:(){ gotoScan();},
                          style: ButtonStyle(
                            padding:MaterialStateProperty.all<EdgeInsets>(EdgeInsets.all(15.0)),
                            shape: MaterialStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0))),
                          ),
                          label: const Text("Điểm danh",
                            style: TextStyle(fontSize: 20),)
                      ),
                      // Container(
                      //   margin: EdgeInsets.fromLTRB(0,80,0,0),
                      //   child: ElevatedButton.icon(
                      //       icon: Icon(Icons.contacts_sharp),
                      //       onPressed:(){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => AttendanceInfo()));
                      //         },
                      //       style: ButtonStyle(
                      //         padding:MaterialStateProperty.all<EdgeInsets>(EdgeInsets.all(15.0)),
                      //         shape: MaterialStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0))),
                      //       ),
                      //       label: const Text("Thông tin chuyên cần",
                      //         style: TextStyle(fontSize: 20),)
                      //   ),
                      // ),
                      // CircularProgressIndicator()
                    ],
                  )
                ),
              ],
            )));
  }
}
