function $import(src) {
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', src);
    scriptElem.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

function defer() {

        function isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    if (!isMobile()) {
        !function (e, t, n) { function a() { var e = t.getElementsByTagName("script")[0], n = t.createElement("script"); n.type = "text/javascript", n.defer = !0, n.src = "https://beacon-v2.helpscout.net", e.parentNode.insertBefore(n, e) } if (e.Beacon = n = function (t, n, a) { e.Beacon.readyQueue.push({ method: t, options: n, data: a }) }, n.readyQueue = [], "complete" === t.readyState) return a(); e.attachEvent ? e.attachEvent("onload", a) : e.addEventListener("load", a, !1) }(window, document, window.Beacon || function () { });
        window.Beacon('init', '89c09081-2a69-4a4f-a10c-bbbb734ba819');
    }

    $import("https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=MYBgkd");

}

function activity() {

    defer();

    activityEvents.forEach(function (eventName) {
        document.removeEventListener(eventName, activity, true);
    });
}

//An array of DOM events that should be interpreted as
//user activity.
var activityEvents = [
    'mousedown', 'mousemove', 'keydown', 'scroll',
    'touchstart'
];

window.onload = function () {
    //add these events to the document.
    //register the activity function as the listener parameter.
    activityEvents.forEach(function (eventName) {
        document.addEventListener(eventName, activity, true);

    });
}
