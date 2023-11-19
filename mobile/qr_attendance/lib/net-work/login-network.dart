import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'dart:convert';

class LoginNetWork{
  final String url = 'http://daotao.hnue.edu.vn/UniSystemAPI/Account/Login';

  Future<Map<String,dynamic>> login(Map<Object,Object> data) async {
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
      return res;
    } else {
      // print(json.decode(utf8.decode(response.bodyBytes)));
      throw Exception('Failed to post cases');
    }
  }

}