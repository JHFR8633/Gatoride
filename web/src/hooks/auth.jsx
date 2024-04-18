
export const usePost = (setResponse, data, url) => {
  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(response => {setResponse({ valid : false, error : response.error, data : ""}); throw new Error(response.error)})
      }
      return response.json().then(response => {setResponse({ valid : true, error : "", data : response.data})})
  })
  .catch(error => {
      console.error(error);      
  });
}

export const usePostAuthorized = (setResponse, data, url, token) => {
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(response => {setResponse({ valid : false, error : response.error, data : ""}); throw new Error(response.error)})
      }
      return response.json().then(response => {setResponse({ valid : true, error : "", data : response.data})})
  })
  .catch(error => {
      console.error(error);      
  });
}

export const useGetAuthorized = ( setToken, setTokenLoaded, setUsername, setEmail, url, token ) => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
})
.then(response => {
    if (!response.ok) {
        return response.json().then(
            response => {
                setTokenLoaded(true); 
                setUsername(null)
                setToken(null); 
                setEmail(null);

                throw new Error(response.error)}
        )
    }
    else {
        return response.json().then(
            response => {
                setUsername(response.data.username)
                setEmail(response.data.email);
                setTokenLoaded(true);
                setToken(token); 
                 
                console.log(response.data)
            }
        )
    }
})
.catch(error => {
    console.error(error);      
});
}