import * as Views from "../views";
const routes = [
  {
    name:"Home",
    path: "/",
    component: Views.Home,
    protectedRoute: false,
  },
  {
    name:"Gallery",
    path: "/Gallery",
    component: Views.Gallery,
    protectedRoute: false,
  },
  {
    name:"Order",
    path: "/Order",
    component: Views.Order,
    protectedRoute: false,
  },
  {
    name:"Test",
    path: "/Test",
    component: Views.Test,
    protectedRoute: false,
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
