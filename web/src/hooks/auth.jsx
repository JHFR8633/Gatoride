
import { buildRequest, buildRequestBody, useFetch } from "./request"

// create account
export const singUpRequest = ( data ) => {

    const headers = { 
        'Content-Type' : 'application/json' 
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/users/create" )
}

// get token
export const logInRequest = ( data ) => {

    const headers = {
        'username' : data.username,
        'password' : data.password
    }

    const request = buildRequest( 'GET', headers )

    return useFetch( request, "http://localhost:3000/users/token" )
}

// validate token
export const tokenRequest = ( storedToken ) => {
    
    const headers = {
        'Authorization' : `Bearer ${storedToken}`
    }

    const request = buildRequest( 'GET', headers )

    return useFetch( request, "http://localhost:3000/users/validate" )
}

// edit user info
export const editUser = ( token, field, value, id ) => {
    
    const headers = {
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const data = {
        'field' : field,
        'value' : value,
        'id' : id
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/users/edit" )
}

// edit own info
export const editSelf = ( token, field, value ) => {
    
    const headers = {
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const data = {
        'field' : field,
        'value' : value,
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/users/self" )
}

// get  all users
export const userListRequest = ( token ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`
    }
    
    const request = buildRequest( 'GET', headers )

     return useFetch( request, "http://localhost:3000/users/employee" )
}

// create account for user
export const createUser = ( token, data ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/users/admin" )
}