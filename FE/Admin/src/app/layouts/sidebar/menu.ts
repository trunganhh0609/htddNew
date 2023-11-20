import { MenuItem } from './menu.model';

export const ADMIN_MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Quản lý người dùng',
    icon: 'bx bx-detail',
    link: '/user-mng',
  },
  {
    id: 2,
    label: 'Quản lý lớp học',
    icon: 'bx bx-detail',
    link: '/class-mng',
  }
];

export const TEACHER_MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Lớp học',
    icon: 'bx bx-detail',
    link: '/class',
  },
  {
    id: 2,
    label: 'Tính điểm chuyên cần',
    icon: 'bx bx-detail',
    link: '/gen-point',
  },
];

