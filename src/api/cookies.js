import Cookies from "universal-cookie";

export const Auth = (token, expires) => {
  const cookies = new Cookies();
  
  cookies.set("token", token, { expires: new Date(expires) });
};

export const getAuth = () => {
  const cookies = new Cookies();
  return cookies.get("token");
};

export const Disconnect = () => {
  const cookies = new Cookies();
  return cookies.remove("token");
};
export const AddCart = (product) => {
  // -------------------------- ADD CART
  const cookies = new Cookies();
  if (cookies.get("cart")) {
    let w = cookies.get("cart");
    const isId = (element) => element.id === product._id;
    let z = w.findIndex(isId);
    if (z != -1) {
      w[z].qty += 1;
    } else {
      w.push({ id: product._id, qty: 1 });
    }
    cookies.remove("cart");
    cookies.set("cart", w);
  } else {
    var p = [];
    p.push({ id: product._id, qty: 1 });
    cookies.set("cart", p);
  }
};
export const removeCart = (product) => {
  // -------------------------- ADD CART
  const cookies = new Cookies();
  if (cookies.get("cart")) {
    let w = cookies.get("cart");
    const isID = (element) => element.id === product._id;
    let z = w.findIndex(isID);
    if (z != -1 && w[z].qty > 1) {
      w[z].qty -= 1;
    } else {
      w.splice(z, 1);
    }
    cookies.remove("cart");
    cookies.set("cart", w);
  }
};
