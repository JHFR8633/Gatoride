import { buildRequest, buildRequestBody, useFetch } from "./request"

// get available cars
export const dateRequest = ( dates ) => {

    const headers = dates ? 
    {
        'start' : dates.start,
        'end' : dates.end
    }
    :
    {}
    
    const request = buildRequest( 'GET', headers )

     return useFetch( request, "http://localhost:3000/cars/available" )
}

// get all cars
export const carListRequest = () => {

    const request = buildRequest( 'GET' )

    return useFetch( request, "http://localhost:3000/cars/list" )
}

// get all cars in location
export const employeeCarListRequest = ( token ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`
    }
    
    const request = buildRequest( 'GET', headers )

     return useFetch( request, "http://localhost:3000/cars/employee" )
}

// get all cars authorized
export const adminCarListRequest = ( token ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`
    }
    
    const request = buildRequest( 'GET', headers )

     return useFetch( request, "http://localhost:3000/cars/admin" )
}

// create a new car
export const createCar = ( token, data ) => {

    const headers = { 
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/cars/create" )
}

// delete a car
export const deleteCar = ( token, data ) => {

    const headers = { 
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/cars/delete" )
}

// edit car info
export const editCar = ( token, field, value, id ) => {
    
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

    return useFetch( request, "http://localhost:3000/cars/edit" )
}
