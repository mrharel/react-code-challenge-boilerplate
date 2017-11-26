const BASE_API = '/api';

export const apiCall = ({
  url,
  body,
  method = 'GET',
  contentType = 'application/json',
}) => new Promise((res, rej) => {
  const headers = new Headers();
  headers.append('content-type', contentType);
  let reqBody = null;
  if (body) {
    reqBody = JSON.stringify(body);
  }

  const fetchOptions = {
    method,
    headers,
    mode: 'cors',
    credentials: 'include',
    body: reqBody,
  };
  fetch(`${BASE_API}${url}`, fetchOptions)
    .then((response) => {
      const isSuccess = response.status === 200;
      return response.json().then(isSuccess ? res : rej);
    })
    .catch((err) => {
      rej(err);
    });
});
