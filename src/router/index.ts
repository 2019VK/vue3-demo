import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect:'/goodslist',
    children: [
      {
        path: "goodslist",
        name: "goodslist",
        meta: {
          isShow: true,
          title: "商品列表",
        },
        component: () => import("../views/GoodsListView.vue"),
      },
      {
        path: "userlist",
        name: "userlist",
        meta: {
          isShow: true,
          title: "用户列表",
        },
        component: () => import("../views/UserListView.vue"),
      },
      {
        path: "rolelist",
        name: "rolelist",
        meta: {
          isShow: true,
          title: "角色列表",
        },
        component: () => import("../views/RoleListView.vue"),
      },
      {
        path: "authority",
        name: "authority",
        meta: {
          isShow: false,
          title:'权限列表'
        },
        component: () => import("../views/AuthorityView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next) =>{
  const token:string | null = localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    next('/login')
  }else{
    next()
  }
})

export default router;
