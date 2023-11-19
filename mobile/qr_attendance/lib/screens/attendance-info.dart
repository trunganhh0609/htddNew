import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:qr_attendance/net-work/attendance-net-work.dart';


class AttendanceInfo extends StatefulWidget {

  const AttendanceInfo({super.key});

  @override
  State<AttendanceInfo> createState() => _AttendanceInfo();
}
class _AttendanceInfo extends State<AttendanceInfo>{
  AttendanceNetWork _attendanceNetWork = AttendanceNetWork();
  Future<List<Map>> listClass = Future(() => []);
  @override
  Widget build(BuildContext context) {
    listClass = _attendanceNetWork.getClass('695105008') as Future<List<Map>>;
    return Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: true,
          title: Text("Thông tin chuyên cần"),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            Image.asset('assets/image/img.png', fit: BoxFit.cover,width: MediaQuery.of(context).size.width),
            FutureBuilder<List>(
                future: listClass,
                builder: (context, snapshot){
                  if(snapshot.hasData){
                    List lst = snapshot.data!;
                    print(lst);
                    return Card(
                      child: Text("fdsf"),
                    );
                  }else{
                    return Card(
                        child: Text("nodata"));
                  }

                }
            )
          ],
        )
    );
  }
}
