window.addEventListener('DOMContentLoaded', function () {
    // your button here
    var link = document.getElementById('isecuremanager');
    // onClick's logic below:
    link.addEventListener('click', function () {
        var newURL = "http://localhost:3000/";
        chrome.tabs.create({ url: newURL });
    });
});