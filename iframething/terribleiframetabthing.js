const defaultUrl = "https://www.google.com/search?igu=1";
let pages = [];
let currentPage = 0;

function setUrl() {
    let url

    try {
        url = new URL(document.getElementById("urlinput").value);
    } catch (_) {
        url = new URL("https://"+document.getElementById("urlinput").value);
    }

    pages[currentPage].src = url.href;
    updateTabs();
}

function toggleFullscreen() {
    let page = pages[currentPage];
    if (!page.classList.contains("fullscreenpage")) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}
function enterFullscreen() {
    let page = pages[currentPage];

    page.classList.add("fullscreenpage");
    document.getElementById("fullscreenbutton").style = "display:inline";
}

function exitFullscreen() {
    //lazy method
    let page = pages[currentPage];

    page.classList.remove("fullscreenpage");
    document.getElementById("fullscreenbutton").style = "display:none";
}

function makeLink() {
    const link = document.getElementById("link");
    const url = document.getElementById("urlinput").value

    link.href = url;
    link.innerHTML = url;
}

function createTabButton(index) {
    //create tabs and buttons
    const tab = document.createElement("div");
    const tabbutton = document.createElement('button');
    const xbutton = document.createElement('button');

    //assign classes to buttons
    tabbutton.classList.add("tabbutton");
    xbutton.classList.add("xbutton");
    tab.classList.add('tab');

    //maybe add name of tab in the future currently too lazy
    let pagename = pages[index].src.replace('https://','')
    .replace('http://','')
    .replace('www.','');

    tabbutton.innerHTML = pagename.substring(0,10);

    xbutton.innerHTML = "x";

    tabbutton.onclick = () => {
        switchPage(index);
    };

    xbutton.onclick = () => {
        closeTab(index);
    };

    tab.appendChild(tabbutton);

    if (!(pages.length == 1)) {
        tab.appendChild(xbutton);
    }
    
    //append to tab list
    document.getElementById("tabcontainer").appendChild(tab);
}

function updateTabs() {
    /*
        there has got to be a better way to do this
        but im lazy
        asjdfhjkasjf
    */

    const tabDiv = document.getElementById("tabcontainer");
    
    //clear entire div bc im lazy
    //also i didnt know this existed
    tabDiv.replaceChildren();

    //change urlbar value to src of current iframe
    document.getElementById("urlinput").value = pages[currentPage].src;

    for (let pageindex in pages) {
        createTabButton(pageindex);

        //bad but works

        //if the page we're looping over is not the current page and has class page (and page is displayed)
        if ((pageindex != currentPage) && (pages[pageindex].classList.contains("page"))) {
            //hide page
             pages[pageindex].classList.replace("page","hiddenpage");
        }

        //if the page we're looping over isthe current page and has class hiddenpage
        else if ((pageindex == currentPage)&&(pages[pageindex].classList.contains("hiddenpage"))){
            //show page
            pages[pageindex].classList.replace("hiddenpage","page");
        }
    }

}

function closeTab(index) {
    if (index == currentPage) {
        //if last page
        if (index == pages.length-1) {
            currentPage = pages.length - 2;
        } else {
            //current page index is now next page
        }
    }

    const removePage = pages[index];
    //console.log(removePage);

    exitFullscreen();
    
    //remove tab from dom
    document.getElementById("pages").removeChild(removePage);
    pages.splice(index,1);
    
    if (currentPage > pages.length -1) {
        currentPage = 0;
    } 

    //console.log(currentPage)

    updateTabs();
}

function setUrlToDefault() {
    pages[currentPage].src = defaultUrl;
}

function newTab() {
    let pagecontainer = document.getElementById("pages");
    let newPage = document.createElement("iframe");

    newPage.src = defaultUrl;
    newPage.classList.add("page");
    pagecontainer.appendChild(newPage);
    pages.push(newPage);
    switchPage(pages.length-1);
    updateTabs();
}

function switchPage(index) {
    //console.log("swited to page: "+index);
    pages[currentPage].classList.replace("page","hiddenpage");
    pages[index].classList.replace("hiddenpage","page");
    currentPage = index;
}

function reloadTab() {
    pages[currentPage].src += '';
}

function reload() {
    window.location.href = '';
}

window.addEventListener('load',newTab);