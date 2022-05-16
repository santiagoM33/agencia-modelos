//const BASE_URI = 'http://159.65.218.115';
const BASE_URI = 'http://localhost:3000';
const token = JSON.parse(localStorage.getItem("token")) ?? null;

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

  
export const getUserStatus = async () => {
    const promise = new Promise(async (response, reject) => {
        try{
            const res = await fetch(`${BASE_URI}/users`)
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

export const updateStatus = async (id, status) => {
    const accessToken = token;
    const requestData = {
        method: 'PUT', 
        
        headers: new Headers({
            'Authorization': `Bearer ${accessToken}`, 
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(status)
        
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
    const accessToken = token;
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