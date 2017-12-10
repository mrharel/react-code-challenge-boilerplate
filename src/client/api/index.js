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

const mockData = {
  resturants: [
    { id: "1", title: 'Humos' },
    { id: "2", title: 'Pizza' },
    { id: "3", title: 'Humburger' },
    { id: "4", title: 'Thai' },
    { id: "5", title: 'Falafel' },
  ],
  bookings: [
    { day: 'Sun', user_resturant: [{ resturant: "1", user: "a@a.com" }] },
    { day: 'Mon', user_resturant: [] },
    { day: 'Tue', user_resturant: [] },
    { day: 'Wed', user_resturant: [] },
    { day: 'Thu', user_resturant: [] },
  ],
  users: [
    { user: "a@a.com", name: "Amir Harel" },
  ],
};

export const apiLoadDataFromServer = () => {
  return new Promise((res) => {
    res(mockData);
  });
};

export const apiAddBooking = (email, resturantId, dayId) => new Promise((res) => {
  res();
});
