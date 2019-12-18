// eslint-disable-next-line no-undef
var API_URL = process.env.REACT_APP_API_URL

export const secureFetch = (url, method, secureHeaders, data) => (
  new Promise((resolve, reject) => {
    return fetch(`${API_URL}${url}`, {
      method: method || 'GET',
      body: data,
      headers: secureHeaders
    }).then(response => {
      if (response.ok) {
        return resolve(response)
      } else {
        switch (response.status) {
        case 401:
          if (url !== '/auth/user/login') {
            console.log(`UNAUTHORIZED ${response.status}`)
            localStorage.clear()
            window.location.pathname = '/login'
          }
          break
        case 404:
          console.log(`Object not found ${response.status}`)
          break
        case 500:
          console.log(`Internal server error ${response.status}`)
          break
        case 422:
          console.log(`Unprocessable Entity ${response.status}`)
          break
        default:
          console.log(`Some error occured ${response.status}`)
          break
        }
        return reject(response)
      }
    })
      .catch(error => {
        return reject(error)
      })
  })
)
