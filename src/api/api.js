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

export const getMe = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user/${id}`, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());
};

// ------------------------------------------------------------------------------ //

export const editUser = (id, token, body) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/user/${id}`, {
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

// ------------------------------------------------------------------------------ //

export const getUserOrders = (id, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/order/user/${id}`, {
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

export const makeProduct = (body, token) => {
  return fetch(`https://ynov-fullstack.herokuapp.com/api/v1/products/`, {
    method: "POST",
    headers: {
      "x-access-token": token,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
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
