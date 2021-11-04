import axios from 'axios'

export const addItem = 'addItem'
export const removeItem = 'removeItem'

export const incrementItem = 'incrementItem'
export const decrementItem = 'decrementItem'

export const setTotalPrice = 'setTotalPrice'

export const setBill = 'setBill'

export const incrementItemWithValue = 'incrementItemWithValue'

export const setBillPayement = payload => ({
  type: setBill,
  payload
})

export const setTotalPriceForCheckout = payload => ({
  type: setTotalPrice,
  payload
})

export const addItemBasket = payload => ({
  type: addItem,
  payload
})

export const removeItemBasket = payload => ({
  type: removeItem,
  payload
})

export const incrementItemBasket = payload => ({
  type: incrementItem,
  payload
})

export const incrementItemBasketWithValue = (payload, value) => ({
  type: incrementItemWithValue,
  payload,
  value
})

export const decrementItemBasket = payload => ({
  type: decrementItem,
  payload
})

export const doPayement = (amount, paymentMethod) => {
    const secretApiKey = process.env.REACT_APP_STRIPESKEY
    return fetch(`https://api.stripe.com/v1/payment_intents`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${secretApiKey}`
      },
      params: {
        amount,
        currency: 'eur',
        payment_method_types: ['card'],
        payment_method: paymentMethod,
        confirm: true
      }
    }).then((res) => res.json());
  };
export const getPayement = () => {
    const secretApiKey = process.env.REACT_APP_STRIPESKEY
    return fetch(`https://api.stripe.com/v1/payment_intents`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${secretApiKey}`
      },

    }).then((res) => setBillPayement(res.data.data));
  };
