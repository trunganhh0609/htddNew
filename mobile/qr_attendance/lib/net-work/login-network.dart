import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'dart:convert';

class LoginNetWork{
  final String url = 'http://10.0.2.2:8091/auth/login';

  Future<Map<String,dynamic>> login(Map<Object,Object> data) async {
    try{
      final Response response = await http.post(
        Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        print("ok");
        final res = json.decode(utf8.decode(response.bodyBytes));
        print(res);
        return res;
      }
    }catch(err){
      print(err);
      return {};
    }
    return {};
  }

}