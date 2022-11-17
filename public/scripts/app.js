var styles = JSON.parse(document.getElementById("allStyles").attributes.styles.nodeValue)
window.onunload = function(){}; //TODO: make this a single-page app, do not use /app/learn or stuff like that.
addEventListener('beforeunload', () => {})
console.log("onunload")
async function initButtons() {
    var learn = document.getElementById("learnset")
    var create = document.getElementById("createset")
    var find = document.getElementById("publicsets")
    var settings = document.getElementById("settings")

    learn.onclick = async (event) => {
        event.preventDefault()

        //redirect("/app/learn")
        window.history.pushState(null, null, "/app/");
        window.history.replaceState(null, null, "/app/learn");
    }

    create.onclick = async (event) => {
        event.preventDefault()

        //redirect("/app/create")
        window.history.pushState(null, null, "/app/");
        window.history.replaceState(null, null, "/app/create");
    }

    find.onclick = async (event) => {
        event.preventDefault()

        //redirect("/app/publicSets")
        window.history.pushState(null, null, "/app/");
        window.history.replaceState(null, null, "/app/publicSets");
    }

    settings.onclick = async (event) => {
        event.preventDefault()

        //shallowRedirect("/app#settings")
        window.history.pushState(null, null, "/app/");
        window.history.replaceState(null, null, "/app/settings");
    }
}

async function init() {
    console.log("Init!")
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

    //TODO: Implement server login tokens, so schools can make login tokens which can be logged in through the school's Electronic Student Enviroment (ELO in dutch).
    // This function may also disable any regular login, if set up.

    if (cookies.token) {
        var userreq = await fetch("/api/getUserInfo", {body: JSON.stringify({token: cookies.token}), method: "POST", headers: {'Content-Type': 'application/json'}})
        const dat = await userreq.json()
        console.log("Got user info!")
        if (dat.tokenValid) {
            if (window.location.href.includes("#intro")) {
                shallowRedirect("/app")
                var loading = document.getElementById("loading")
                loading.innerText = "Welcome, "+dat.username+"!"
                loading.classList.remove(styles.fadingAnim)
                loading.classList.add(styles.fadingOutAnim)
                setTimeout(() => {
                    loading.classList.add(styles.hidden)
                    var title = document.getElementById("title")
                    title.classList.add(styles.moveTitle)
                    setTimeout(() => {
                        title.classList.add(styles.titleNewPos)
                        var uname = document.getElementById("uname")
                        uname.innerText = "Hi, "+dat.username+"!"
                        var screen = document.getElementById("primary-screen")
                        screen.classList.remove(styles.hidden)
                        screen.classList.add(styles.fadeInLogin)
                        initButtons()
                    }, 1000)
                }, 2000)
            } else {
                if (window.location.href.includes("#learn")) {
                    window.history.pushState(null, null, "/app/");
                    window.history.replaceState(null, null, "/app/learn");
                    var loading = document.getElementById("loading")
                    loading.classList.add(styles.hidden)
                    var title = document.getElementById("title")
                    title.classList.add(styles.titleNewPos)
                    title.innerText = "CosmicLearn Learn Mode"
                } else {
                    var loading = document.getElementById("loading")
                    loading.classList.add(styles.hidden)
                    var title = document.getElementById("title")
                    title.classList.add(styles.titleNewPos)
                    var uname = document.getElementById("uname")
                    uname.innerText = "Hi, "+dat.username+"!"
                    var screen = document.getElementById("primary-screen")
                    screen.classList.remove(styles.hidden)
                    screen.classList.add(styles.fadeInLogin)
                    initButtons()
                }

            }
        } else {
            redirect("/?error=invald_token")
        }
    } else {
        redirect("/?error=no_token")
    }

}

init()