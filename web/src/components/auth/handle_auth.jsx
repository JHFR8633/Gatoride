export const usePost = (setResponse, data, url) => {
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


export const handleSignUp = (setResponse, data) => {
    usePost(setResponse, data, 'http://localhost:3000/addUser')
}

export const handleLogin = (setResponse, data) => {
    usePost(setResponse, data, 'http://localhost:3000/checkUser')
}

