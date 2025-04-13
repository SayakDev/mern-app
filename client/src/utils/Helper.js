export function setTokenInLocalStorage(token){
    localStorage.setItem("auth-key", token);
}

export function getTokenFromLocalStorage(token){
    return localStorage.getItem("auth-key");
}