// eslint-disable-next-line no-undef
var API_URL = process.env.REACT_APP_API_URL;

const unAuth = url => {
  if (url !== "/auth/user/login") {
    console.log("UNAUTHORIZED 422");
    localStorage.clear();
    window.location.pathname = "/user/login";
  }
};

const status = {
  401: unAuth,
  404: () => console.log(`Object not found 404`),
  500: () => console.log(`Internal server error 500`),
  422: () => console.log(`Unprocessable Entity 422`)
};

const errorStatus = (url, resStatus) =>
  status[resStatus](url) || console.log(`Some error occured ${resStatus}`);

const serverResponseDispatch = (dispatch, message, type) =>
  dispatch({
    type: "updateServerResponse",
    updateResponse: {
      type,
      message
    }
  });

const formErrorsDispatch = (dispatch, errors) =>
  dispatch({
    type: "updateFormErrors",
    updateFormErrors: errors
  });

export const secureFetch = ({ url, method, secureHeaders, data, dispatch }) =>
  new Promise((resolve, reject) => {
    return fetch(`${API_URL}${url}`, {
      method: method || "GET",
      body: data,
      headers: secureHeaders
    })
      .then(async response => {
        const json = await response.json();
        if (response.ok) {
          serverResponseDispatch(dispatch, json.message, "success");
          formErrorsDispatch(dispatch, {});
          return resolve(json);
        } else {
          errorStatus(url, response.status);
          formErrorsDispatch(dispatch, json.errors ? json.errors : {});
          serverResponseDispatch(dispatch, json.message, "danger");
          return reject(response);
        }
      })
      .catch(error => {
        return reject(error);
      });
  });
