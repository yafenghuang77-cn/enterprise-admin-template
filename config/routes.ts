const routes = [
  { path: '/login', component: './Auth', layout: false },
  { path: '/register', component: './Auth', layout: false },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
];

export default routes;
