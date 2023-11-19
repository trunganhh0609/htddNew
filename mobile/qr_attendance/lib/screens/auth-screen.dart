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
        child: Center(
          child: Column(
            children: [
              Text("Login to Attendance App"),
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
                  label: Text("Use Finger Print"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
