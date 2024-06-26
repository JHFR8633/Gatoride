import { buildRequest, buildRequestBody, useFetch } from "./request"

// create reservation as user
export const reservationRequest = ( dates, car, token ) => {
    const headers = {
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const body = { 
        'start' : dates.start,
        'end' : dates.end,
        'car_id' : car
    }

    const request = buildRequestBody( 'POST', headers, body )

    return useFetch( request, "http://localhost:3000/reservations/create" )
}

// create reservation for user
export const createReservation = ( token, data ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`,
        'Content-Type' : 'application/json' 
    }

    const request = buildRequestBody( 'POST', headers, data )

    return useFetch( request, "http://localhost:3000/reservations/admin" )
}

// get your own reservations
export const reservationRequestUser = ( token ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`,
    }

    const request = buildRequest( 'GET', headers )

    return useFetch( request, "http://localhost:3000/users/reservations" )
}

// get all reservations
export const reservationListRequest = ( token ) => {

    const headers = {
        'Authorization' : `Bearer ${ token }`
    }
    
    const request = buildRequest( 'GET', headers )

     return useFetch( request, "http://localhost:3000/reservations/employee" )
}
