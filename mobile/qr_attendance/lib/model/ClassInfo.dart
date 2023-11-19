class ClassInfo {
  int? iDLopTc;
  int? iDSv;
  bool? hocLai;
  bool? duyet;
  bool? huyDangKy;
  bool? rutBotHocPhan;
  String? kyHieu;
  String? tenMon;
  String? ngayDangKy;
  String? tuNgay;
  String? denNgay;
  int? caHoc;
  int? hocKy;
  String? namHoc;
  int? dot;

  ClassInfo(
      {this.iDLopTc,
        this.iDSv,
        this.hocLai,
        this.duyet,
        this.huyDangKy,
        this.rutBotHocPhan,
        this.kyHieu,
        this.tenMon,
        this.ngayDangKy,
        this.tuNgay,
        this.denNgay,
        this.caHoc,
        this.hocKy,
        this.namHoc,
        this.dot});

  ClassInfo.fromJson(Map<String, dynamic> json) {
    iDLopTc = json['ID_lop_tc'];
    iDSv = json['ID_sv'];
    hocLai = json['Hoc_lai'];
    duyet = json['Duyet'];
    huyDangKy = json['Huy_dang_ky'];
    rutBotHocPhan = json['Rut_bot_hoc_phan'];
    kyHieu = json['Ky_hieu'];
    tenMon = json['Ten_mon'];
    ngayDangKy = json['Ngay_dang_ky'];
    tuNgay = json['Tu_ngay'];
    denNgay = json['Den_ngay'];
    caHoc = json['Ca_hoc'];
    hocKy = json['Hoc_ky'];
    namHoc = json['Nam_hoc'];
    dot = json['Dot'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['ID_lop_tc'] = this.iDLopTc;
    data['ID_sv'] = this.iDSv;
    data['Hoc_lai'] = this.hocLai;
    data['Duyet'] = this.duyet;
    data['Huy_dang_ky'] = this.huyDangKy;
    data['Rut_bot_hoc_phan'] = this.rutBotHocPhan;
    data['Ky_hieu'] = this.kyHieu;
    data['Ten_mon'] = this.tenMon;
    data['Ngay_dang_ky'] = this.ngayDangKy;
    data['Tu_ngay'] = this.tuNgay;
    data['Den_ngay'] = this.denNgay;
    data['Ca_hoc'] = this.caHoc;
    data['Hoc_ky'] = this.hocKy;
    data['Nam_hoc'] = this.namHoc;
    data['Dot'] = this.dot;
    return data;
  }
}