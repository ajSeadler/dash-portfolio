export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'HOME',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-add-line-duotone',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
  {
    heading: 'PROFESSIONAL STUFF',
    children: [
      {
        name: 'Github',
        icon: 'solar:code-circle-outline',
        id: uniqueId(),
        url: '/ui/typography',
      },
      {
        name: 'Portfolio',
        icon: 'solar:programming-outline',
        id: uniqueId(),
        url: '/ui/table',
      },
      {
        name: 'Career',
        icon: 'solar:case-outline',
        id: uniqueId(),
        url: '/ui/form',
      },
      {
        name: 'Education',
        icon: 'solar:book-outline',
        id: uniqueId(),
        url: '/ui/shadow',
      },
    ],
  },
  // {
  //   heading: 'AUTH',
  //   children: [
  //     {
  //       name: 'Login',
  //       icon: 'solar:login-2-linear',
  //       id: uniqueId(),
  //       url: '/auth/login',
  //     },
  //     {
  //       name: 'Register',
  //       icon: 'solar:shield-user-outline',
  //       id: uniqueId(),
  //       url: '/auth/register',
  //     },
  //   ],
  // },
  {
    heading: 'FUN STUFF',
    children: [
      {
        name: 'A Quick Laugh',
        icon: 'solar:smile-circle-outline',
        id: uniqueId(),
        url: '/icons/solar',
      },
      {
        name: 'A Quick Game',
        icon: 'solar:gamepad-outline',
        id: uniqueId(),
        url: '/sample-page',
      },
    ],
  },
];

export default SidebarContent;
