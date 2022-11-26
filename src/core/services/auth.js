'use strict'
import Vue from "vue";

const [TOKEN_KEY, USER_KEY, ROLES_KEY, IS_ADMIN, EXPIRES_IN] = ['token', 'userAuth', 'roles', "isAdmin", '10y']

/*BEGIN ROLES */
export const getRoles = () => {
    return JSON.parse(localStorage.getItem('roles'))
    //return Vue.$cookies.get(ROLES_KEY)
    //return Vue.$cookies.get(ROLES_KEY)
};

export function setRoles(roles) {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles))
    //const res = Vue.$cookies.set(ROLES_KEY, roles, EXPIRES_IN, null, null, true);
}

export function removeRoles() {
    localStorage.removeItem(ROLES_KEY)
    // return Vue.$cookies.remove(ROLES_KEY);
}

/*BEGIN IS_ADMIN */
export const isAdmin = () => {
    return localStorage.getItem(IS_ADMIN) === 'true';
};

export function setIsAdmin(isAdmin) {
    localStorage.setItem(IS_ADMIN, isAdmin)
}

export function removeIsAdmin() {
    localStorage.removeItem(IS_ADMIN)
}


/*BEGIN TOKEN */
export const getSecureToken = () => {
    return Vue.$cookies.get(TOKEN_KEY)
};

export function setSecureToken(token) {
    return Vue.$cookies.set(TOKEN_KEY, token, EXPIRES_IN, null, null, true);
}

export function removeToken() {
    return Vue.$cookies.remove(TOKEN_KEY);
}

/*BEGIN USER */
export const getUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY))
    //return Vue.$cookies.get(USER_KEY)
};

export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    //return Vue.$cookies.set(USER_KEY, user, EXPIRES_IN, null, null, true);
}

export function removeUser() {
    localStorage.removeItem(USER_KEY)
    //return Vue.$cookies.remove(USER_KEY);
}

export function setAuth(object) {
    const {token, user, roles} = object
    setUser(user)
    setRoles(roles)
    setSecureToken(token)
}

export function removeAuth() {
    removeUser()
    removeRoles()
    removeToken()
    removeIsAdmin()
}

export default {getSecureToken, setSecureToken, getRoles, setRoles, getUser, setUser, removeAuth, isAdmin, setIsAdmin};
