import 'package:flutter/material.dart';
import 'package:qr_attendance/screens/home-screen.dart';
import 'package:qr_attendance/utils/authentication.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Image.asset('assets/image/img.png', fit: BoxFit.cover,width: MediaQuery.of(context).size.width),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Xác thực danh tính để tiếp tục", style: TextStyle(fontSize: 20, color: Colors.white),),
                  SizedBox(height: 30,),
                  ElevatedButton.icon(
                      onPressed: () async {
                        bool auth = await Authentication.authentication();
                        print("can authentication: $auth");
                        if(auth){
                          Navigator.pushReplacement(
                              context, MaterialPageRoute(builder: (context) => Home()));
                        }
                      },
                    icon: Icon(Icons.fingerprint),
                      label: Text("Sử dụng vân tay"),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
