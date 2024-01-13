import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class AttendanceNetWork{
  final String url = 'http://10.0.2.2:8091/api/';
  // final String url = 'http://14.225.210.175:8090/api/';
  final String TAurl = 'http://daotao.hnue.edu.vn/UniDormAPI/SQLExecute/ExecuteQuerryString';
  Future attendance(Map data) async {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    String token = '';
    token = (await pref.getString("Token"))!;
    final Response response = await http.post(
      Uri.parse('${url}attendance'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token
      },
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      print("ok");
      final res = json
          .decode(utf8.decode(response.bodyBytes));
      return res;
    } else {
      throw Exception('Failed to post cases');
    }
  }

  Future<Map<String,dynamic>> checkDevideId(Map param) async {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    String token = '';
    token = (await pref.getString("Token"))!;
    final Response response = await http.post(
        Uri.parse('${url}checkDeviceId'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': "Bearer " + token
        },
        body: jsonEncode(param)
    );
    if (response.statusCode == 200) {
      print(response);
      final res = json
          .decode(utf8.decode(response.bodyBytes));
      return res;
    } else {
      throw Exception('Failed');
    }
  }

  Future<Map<String,dynamic>> checkStudentInClass(Map param) async {
    final SharedPreferences pref = await SharedPreferences.getInstance();
    String token = '';
    token = (await pref.getString("Token"))!;
    final Response response = await http.post(
        Uri.parse('${url}checkStudentInClass'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': "Bearer " + token
        },
        body: jsonEncode(param)
    );
    if (response.statusCode == 200) {
      print(response);
      final res = json
          .decode(utf8.decode(response.bodyBytes));
      return res;
    } else {
      throw Exception('Failed');
    }
  }

  Future<List<Map<String, dynamic>>> getClass(String studentID) async {
    Map<Object,Object> data = {
      "PASSWORD":  '\$es5rRk#G6RSr275Rq!',
      "QuerryString": "[sp_svDanhSachLopTinChi_MaSv] " + studentID
    };
    final Response response = await http.post(
        Uri.parse('${TAurl}'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ikh1eWVuTlRUIiwiVXNlcm5hbWUiOiJIdXllbk5UVCIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNjc5MjkwMjAzLCJleHAiOjE2ODAxNTQyMDMsImlhdCI6MTY3OTI5MDIwMywiaXNzIjoiaHR0cDovL3VuaXNvZnQuZWR1LnZuLyIsImF1ZCI6Imh0dHA6Ly91bmlzb2Z0LmVkdS52bi8ifQ.kv4DD1WA07kogBDcB2qtilP-1Ii7v2lOJX-uHBGxK1s'
        },
        body: jsonEncode(data)
    );
    if (response.statusCode == 200) {
      final res = json.decode(utf8.decode(response.bodyBytes));
      print(res);
        // var list = parsed
        //     .map<Object>((json) => Object().fromJson(json))
        //     .toList();
        return res['Content'];
      } else {
        throw Exception('Failed');
      }
  }
}