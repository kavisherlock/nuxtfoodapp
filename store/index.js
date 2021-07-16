import { v4 as uuid } from 'uuid'

export const state = () => ({
  fooddata:  [],
  cart: [],
})

export const getters = {
  cartTotal: state => {
    return state.cart.reduce((a, v) => a + (v.price * v.quantity), 0).toFixed(2);
  },
  cartCount: state => {
    return state.cart.reduce((a, v) => a + v.quantity, 0);
  }
}

export const mutations = {
  updateFoodData: (state, data) => {
    state.fooddata = data;
  },
  addToCart: (state, formOutput) => {
    state.cart.push({ ...formOutput, id: uuid() });
  }
}

export const actions = {
  async getFoodData({ state, commit }) {
    if (state.fooddata.length) return;
    try {
      await fetch('https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.AWS_API_KEY,
        }
      }).then(res => res.json())
      .then(data => {
        commit('updateFoodData', data);
      })
    } catch (error) {
      console.log(error);
    }
  }
}
