export const login = (body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const register = (body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const getMe = (token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};
export const AddBuyers = (id,token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/products/${id}/buyer/add`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};
export const ContainBuyers = (id,token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/products/${id}/buyer/contains`, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};
// ------------------------------------------------------------------------------ //

export const editUser = (token, body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user`, {
    method: "PATCH",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const editOrder = (id, token, body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/${id}`, {
    method: "PATCH",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const editProduct = (id, token, body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/product/${id}`, {
    method: "PATCH",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
// ------------------------------------------------------------------------------ //

export const deleteOrder = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/${id}`, {
    method: "DELETE",
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const deleteProduct = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/product/${id}`, {
    method: "DELETE",
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const deleteUser = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user/${id}`, {
    method: "DELETE",
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};
export const isAdmin = (token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user/isAdmin`, {
    method: "GET",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },

  }).then((res) => res.json());
};
export const GetOrderByProductId = ({id,token}) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/order/product/${id}`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};
export const GetOrderToBuy = ({token}) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/orders/buyer?status=En%20attente%20de%20paiement`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};
export const GetOrderPaid = ({token}) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/orders/buyer?status=Paiement%20terminé`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};
export const GetInterrestProduct = (token) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/products/buyer`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};
// ------------------------------------------------------------------------------ //

export const getUserOrders = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/user/${id}`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const GetBuyerOrders = ( token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/user`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

// ------------------------------------------------------------------------------ //

export const makeOrder = (body, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/orders/`, {
    method: "POST",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const CreateProduct = (body, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/products/`, {
    method: "POST",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const GetAllCateg = () => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};

export const GetProductByUser = (token) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/products/seller`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};
export const GetBuyesByProduct = (id,token) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/products/${id}/buyers`,
    {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
    }
  ).then((res) => res.json());
};

export const CreateOrder = ({buyer,product,token}) => {
  return fetch(
    `https://ynov-fullstack.herokuapp.com/api/v1/orders`,
    {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({buyer:buyer,product:product}),
    }
  ).then((res) => res.json());
};
// ------------------------------------------------------------------------------ //

export const adminShowOrders = (token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/orders/`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const ShowProducts = (token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/products/`, {}).then((res) =>
    res.json()
  );
};

export const adminShowUsers = (token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/users/`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const adminShowOrder = (token, id) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/${id}`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

export const ShowProductById = (id) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/product/${id}`, {}).then(
    (res) => res.json()
  );
};

export const adminShowUser = (token, id) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user/${id}`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

// ------------------------------------------------------------------------------ //
