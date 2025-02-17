import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/",
//         name: "Home",
//         component: () => import("@/views/home/index.vue"),
//         meta: {},
//         children: []
//     }
// ];

const aboutRouter = {
    path: "/about",
    name: "About",
    component: () => import("@/views/about/index.vue"),
    meta: {},
    children: []
} as RouteRecordRaw;

// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
    eager: true,
});

// 将路由全部导入数组
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach(key => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);

//导入生成的路由数据
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next();
});

router.afterEach(async (_to) => {
    NProgress.done();
});

export default router;
