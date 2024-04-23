const handleData = ( response, data ) => {
    if ( !response.ok ) throw data
    return data
}

const handleResponse = ( response ) => {
    return response.json()
    .then( data => handleData( response, data ) ) 
    .catch( error => { throw error } )
}

export const useFetch = ( request, url ) => {
    return fetch( url , request )
    .then( ( response ) => handleResponse( response ) )
    .catch( ( error ) => { throw error } )
}

export const buildRequestBody = ( method, headers, body = {} ) => {
    return {
        body : JSON.stringify( body ),
        headers : headers,
        method : method,
    }
}

export const buildRequest = ( method, headers = {} ) => {
    return {
        headers : headers,
        method : method,
    }
}