const http = urlArr => {
  const requests = urlArr.map( url => fetch(url));
  return Promise.all(requests)
      .then(resp => Promise.all(resp.map(item => item.json())));
};

export default http;