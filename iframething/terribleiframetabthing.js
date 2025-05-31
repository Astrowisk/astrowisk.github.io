const defaultUrl = "https://www.google.com/search?igu=1";
let pages = [];
let currentPage = 0;

function setUrl() {
    pages[currentPage].src = document.getElementById("urlinput").value;
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
}

function switchPage(index) {
    console.log(index,pages);
    pages[currentPage].classList.replace("page","hiddenpage");
    pages[index].classList.replace("hiddenpage","page");
    currentPage = index;
}

window.addEventListener('load',newTab);