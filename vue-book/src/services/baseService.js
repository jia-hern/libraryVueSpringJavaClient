import Store from "../store";
import Router from "../router";

export const authHeader = () => {
  const { currentUser } = Store.state;
  return {
    "Content-type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => {
      return data;
    })
    .catch((error) => {
      const status = error?.response?.status;

      // forbidden or unauthorised
      if (status === 403 || status === 401) {
        Store.dispatch("clearUser").then(() => {
          Router.push({ name: "login" }).catch((e) => console.log(e));
        });
      }
      return Promise.reject(error);
    });
};
