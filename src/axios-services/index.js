import axios from "axios";

const { REACT_API_URL = "https://sleepy-citadel-97219.herokuapp.com/api" } =
  process.env;

export const callApi = async ({ url, method = "GET", token, body }) => {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    const resp = await axios(REACT_API_URL + url, options);
   
    return resp.data;
  } catch (error) {
    console.error(error);
  };
};

export async function getCartByUser(user, token) {
  try {
    const cart = await callApi({ url: "/orders/cart", body: user, token });
    return cart;
  } catch (err) {
    console.error(err);
  };
};

export async function getOrdersByUser() {
  try {
    const { data: orders } = await axios.get("/api/orders");
    return orders;
  } catch (err) {
    console.error(err);
  };
};
export async function getAllUsers() {
  try {
    const { data: users } = await axios.get("/api/users");
    return users;
  } catch (err) {
    console.error(err);
  };
};

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  };
};
