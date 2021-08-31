export const create = (userId, token, match) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/matches/new/${userId}` ,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: match
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
 

export const getAllMatches = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/matches` ,{
         method: "GET",
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))
 }

 export const getMatchesbyGame = (game) =>{
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/matches/game/${game}` ,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

 
export const getMatch = (matchId) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/matches/${matchId}` ,{
         method: "GET",
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))
 }

 export const getMatchbyUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/matches/by/${userId}` ,{
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))
 }