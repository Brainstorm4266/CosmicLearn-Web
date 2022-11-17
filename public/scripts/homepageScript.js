var styles = JSON.parse(document.getElementById("allStyles").attributes.styles.nodeValue)
window.onunload = function(){};
addEventListener('beforeunload', () => {})
console.log("onunload")
var inf = {}

window.login = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    var loginFail = document.getElementById("loginError")
    loginFail.classList.add(styles.hidden)

    // Get data from the form.
    const data = {
      usern: event.target.usern.value,
      pass: event.target.pass.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/login'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const sessionData = await response.json()

    if (sessionData.loginSuccess) {
        var login = document.getElementById("login")
        login.classList.remove(styles.fadingInLoginAnim)
        login.classList.add(styles.fadingOutAnim)
        setTimeout(() => {
            login.classList.add(styles.hidden)
            var loading = document.getElementById("loading")
            loading.innerText = "Welcome, "+sessionData.username+"!"
            loading.classList.remove(styles.hidden)
            loading.classList.add(styles.fadingAnim)

            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            var d = new Date()
            d.setMonth(d.getMonth()+1)
            document.cookie = "token="+sessionData.token+"; expires="+d.toUTCString()+";"
            window.location.href = "/app#intro"
            return
        }, 2000)
    } else {
        loginFail.innerText = sessionData.error
        loginFail.classList.remove(styles.hidden)
    }
}

async function runServInf() {
    var loading = document.getElementById("loading")
    var inf_req = await fetch("/api/getInfo")

    inf = await inf_req.json()

    window.serverInfo = inf

    var cookies = {}

    try {
        const parseCookie = str =>
          str
          .split(';')
          .map(v => v.split('='))
          .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
          }, {});

        cookies = parseCookie(document.cookie)
    } catch {
        cookies = {}
    }

    if (cookies.token) {
        // we got a token! maybe we can log in instantly.
        loading.innerText = "Checking token stored in cookies..."
        const token = cookies.token
        var valtoken_req = await fetch("/api/validateToken", {body: JSON.stringify({token: token}), method: "POST", headers: {'Content-Type': 'application/json',}})
        const token_req_reply = await valtoken_req.json()
        console.log(token_req_reply)
        if (token_req_reply.tokenValid) {
            loading.innerText = "Welcome, "+token_req_reply.username+"!"
            window.location.href = "/app#intro"
            return
        } else {
            loading.innerText = "Token invalid! Requesting login prompt."
        }
    }

    loading.classList.remove(styles.fadingAnim)
    loading.classList.add(styles.fadingOutAnim)
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("servname").innerText = "Server Name: "+inf.name
    setTimeout(() => {
        loading.classList.add(styles.hidden)
        var login = document.getElementById("login")
        login.classList.remove(styles.hidden)
        login.classList.add(styles.fadingInLoginAnim)
        if (urlParams.get("error")) {
            console.log('urlperr')
            if (urlParams.get("error") === "no_token") {
                var loginFail = document.getElementById("loginError")
                loginFail.innerText = "You're not logged in."
                loginFail.classList.remove(styles.hidden)
            } else if (urlParams.get("error") === "invalid_token") {
                var loginFail = document.getElementById("loginError")
                loginFail.innerText = "Your session expired. Please log in again."
                loginFail.classList.remove(styles.hidden)
            }
        }
    }, 2000)
}

runServInf()