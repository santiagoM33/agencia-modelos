//const BASE_URI = 'http://159.65.218.115';
const BASE_URI = 'http://localhost:3000';
const accessToken = JSON.parse(localStorage.getItem("token")) ?? null;


/*---------------------     LOGIN     ------------------------ */
/*---------------------     LOGIN     ------------------------ */
export const loginAccountAuth = async data => {
        const requestData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({'Content-type': 'application/json'})
        }
        const promise = new Promise(async (response, reject) => {
            try{
                const res = await fetch(`${BASE_URI}/login`, requestData)
                const body = await res.json();
                    if (res.ok) {
                        return response(body)
                    } else {
                        return reject(body)
                    }
            } catch (err) {
                reject({errors: [err]})
            }
        })
    return promise;
}

/*---------------------     REGISTER     ------------------------ */
/*---------------------     REGISTER     ------------------------ */

export const registerDataAccount = async data => {
    const requestData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Content-type': 'application/json'})
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/register`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const registerServices = async service => {
    //console.log(service)
    const requestData = {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(service),
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/services`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

/*---------------------     RESET     ------------------------ */
/*---------------------     RESET     ------------------------ */
export const resetPasswordRequest = async email => {
    const requestData = {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: new Headers({ 'Content-type': 'application/json' })
    }

    const promise = new Promise(async (res, rej) => {
        try {
            const resp = await fetch(`${BASE_URI}/reset-password-request`, requestData);
            const body = await resp.json();
            if (resp.ok) { return res(body) }
            else { return rej(body) }
        } catch (err) {
            return rej({ errors: [err] });
        }
    });

    return promise;
}

export const resetPassword = async (email, password, code) => {
    const requestData = {
        method: 'POST',
        body: JSON.stringify({ email, password, code }),
        headers: new Headers({ 'Content-type': 'application/json' })
    }

    const promise = new Promise(async (res, rej) => {
        try {
            const resp = await fetch(`${BASE_URI}/reset-password`, requestData);
            const body = await resp.json();
            if (resp.ok) { return res(body) }
            else { return rej(body) }
        } catch (err) {
            return rej({ errors: [err] });
        }
    });

    return promise;
}

/*---------------------     UPDATE     ------------------------ */
/*---------------------     UPDATE     ------------------------ */

export const updateStatus = async (id, status) => {
    const requestData = {
        method: 'PUT', 
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: status
        
    }
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users/${id}`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const updateUserData = async user => {
    const requestData = {
        method: 'PUT', 
        
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(user)
        
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users/${user.id}`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const updateService = async service => {
    const requestData = {
        method: 'PUT', 
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(service)
        
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/services/${service.id}`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const updateEscorts = async escorts => {
    const requestData = {
        method: 'PUT', 
        body: JSON.stringify(escorts)
        
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/escorts/${escorts.userId}`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}


export const updateMe = async me => {
    const requestData = {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(me)
        
    }

    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/escorts/me`, requestData)
            const body = await res.json();
                if (res.ok) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

/*---------------------     GETS     ------------------------ */
/*---------------------     GETS     ------------------------ */

export const getUsers = async signal => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users`, {signal: signal})
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const getEscorts = async signal => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/escorts`, {signal: signal})
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const getServices = async signal => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/services`, {signal: signal})
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const getRoles = async signal => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/roles`, {signal: signal})
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const getUsersStatus = async (signal, data) => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users/?status=${data.status}`, {signal: signal})
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}

export const getUsersById = async id => {
    const requestData = {
        method: 'GET', 
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
        })
        
    }
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users/${id}`, requestData)
            const body = await res.json();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}


/* -------------------------- DELETE ------------------------------ */
/* -------------------------- DELETE ------------------------------ */

export const deleteService = async id => {
    const requestData = {
        method: 'DELETE', 
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
        })
        
    }
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/services/${id}`, requestData)
            const body = await res.text();
                if (res !== 0) {
                    return response(body)
                } else {
                    return reject(body)
                }
        } catch (err) {
            reject({errors: [err]})
        }
    })
    return promise;
}