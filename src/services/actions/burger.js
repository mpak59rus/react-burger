import { BASE_URL } from "../../utils/base-url";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const ORDER_CLEAR = "ORDER_CLEAR";
export const OPEN_CARD = "OPEN_CARD";
export const CLOSE_CARD = "CLOSE_CARD";
export const GET_VIEW = "GET_VIEW";
export const ADD_COMPONENT = "ADD_COMPONENT";
export const REMOVE_COMPONENT = "REMOVE_COMPONENT";
export const CHANGE_BUN = 'CHANGE_BUN'
export const SORT_COMPONENT = 'SORT_COMPONENT'

export function getIngredient() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${BASE_URL}/ingredients`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAIL,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAIL,
        });
      });
  };
}

export function getOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAIL,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAIL,
        });
      });
  };
}

export const getView = (card) => ({
  type: OPEN_CARD,
  view: card,
});
