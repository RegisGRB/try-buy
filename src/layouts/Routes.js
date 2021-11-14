import * as Views from "../views";
const routes = [
  {
    name: "Home",
    path: "/",
    component: Views.Home,
    protectedRoute: false,
  },
  {
    name: "Gallery",
    path: "/Gallery",
    component: Views.Gallery,
    protectedRoute: false,
  },
  {
    name: "Order",
    path: "/Order",
    component: Views.Order,
    protectedRoute: false,
  },
  {
    name: "Test",
    path: "/Test",
    component: Views.Test,
    protectedRoute: false,
  },
  {
    name: "Product",
    path: "/Product/:id",
    component: Views.Product,
    protectedRoute: false,
  },
  {
    name: "SignIn",
    path: "/SignIn",
    component: Views.SignIn,
    protectedRoute: false,
  },
  {
    name: "Profile",
    path: "/Profile/:dash",
    component: Views.Profile,
    protectedRoute: true,
  },
  {
    name: "Profile",
    path: "/Profile",
    component: Views.Profile,
    protectedRoute: true,
  },
  {
    name: "Admin",
    path: "/Admin/:dash",
    component: Views.Admin,
    protectedRoute: true,
    Admin: true,
  },
  {
    name: "Admin",
    path: "/Admin",
    component: Views.Admin,
    protectedRoute: true,
    Admin: true,
  },
  {
    name: "Configurator",
    path: "/Configurator",
    component: Views.Configurator,
    protectedRoute: true,
    Admin: false,
  },
];

function checkroutes(attribute){
  let x = {}
  routes.forEach(element => {
    if(element.path === attribute || element.name === attribute){
     x = element
    }
  });
  return x
}
export {routes,checkroutes};
