(function() {
    window.statsLayer = window.statsLayer || '';

    function viewportSize() {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        return vw + 'x' + vh;
    }

    function getClientId() {
        let clientId = getCookie("clientId");
        if (clientId === "") {
            clientId = Math.random() + '.' + Math.random();
            setCookie("clientId", clientId, 365);
        }
        return clientId;
    }

    window.addEventListener('load', (event) => {
        try {
            const trackingId = window.statsLayer;
            const clientId = getClientId();
            const data = {
                "location" : window.location.href,
                "title" : document.title,
                "clientId" : clientId,
                "trackingId" : trackingId,
                "viewportSize" : viewportSize(),
                "language" : navigator.language,
                "hitType" : "pageview",
                "userAgent" : navigator.userAgent,
                "date" : new Date(),
            };
            const API = 'http://localhost:3000/api';
            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            console.log(data);
        }catch (e) {
            console.log(e);
        }
    });
    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();
