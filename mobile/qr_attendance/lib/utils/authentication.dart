
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:local_auth/local_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Authentication{
  static final _auth = LocalAuthentication();

  static Future<bool> canAuthenticate() async =>
      await _auth.canCheckBiometrics || await _auth.isDeviceSupported();

  static Future<bool> authentication() async{
    try{
      if(!await canAuthenticate()) return false;
      return await _auth.authenticate(localizedReason: "get into the app");
    }catch(e){
      print(e);
      return false;
    }
  }

  static Future<bool> checkToken() async{
    final _prefs = await SharedPreferences.getInstance();
    return _prefs.getString('Token') == null || JwtDecoder.isExpired(_prefs.getString('Token').toString());
  }
}