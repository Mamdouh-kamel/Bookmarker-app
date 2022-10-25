var nameError = document.getElementById("nameError");
var urlError = document.getElementById("urlError");
var urlMsg = document.getElementById("urlMsg");
var existError = document.getElementById("existError");

// ---------------------------------------------saveBookmark--------------------------------------------------------------

document.getElementById("myForm").addEventListener("submit", saveBookmark);
function saveBookmark(e) {
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];


  if (!validation(siteName, siteUrl , bookmarks)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  

  clearForm();
  displayData();
  e.preventDefault();
}

// ---------------------------------------------deleteURL--------------------------------------------------------------

function deleteURL(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayData();
}

// ---------------------------------------------displayData--------------------------------------------------------------

function displayData() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarksResults = document.getElementById("bookmarksResults");

  bookmarksResults.innerHTML = ``;

  for (i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="table-content rounded-pill text-white-50 p-4 my-2">' +
      "<h3>" +
      name +
      "</h3>" +
      ' <a class="btn btn-primary" target="_blank" href="' +
      url +
      '"><i class="fa-solid fa-paper-plane"></i></a> ' +
      " <a onclick=\"deleteURL('" +
      url +
      '\')" class="btn btn-danger" href="#"><i class="fa-regular fa-trash-can"></i></a> ' +
      "</div>";
  }
}

// ---------------------------------------------clearForm--------------------------------------------------------------

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  nameError.classList.replace("d-block" , "d-none");
  urlError.classList.replace("d-block" , "d-none");
  urlMsg.classList.replace("d-block" , "d-none");
  existError.classList.replace("d-block" , "d-none");
}

// ---------------------------------------------validation--------------------------------------------------------------

function validation(siteName, siteUrl, bookmarks) {
  if (!siteName) {
    nameError.classList.replace("d-none", "d-block");
    return false;
  }
  else{
    nameError.classList.replace("d-block" , "d-none");
  }

  if (!siteUrl) {
    urlError.classList.replace("d-none", "d-block");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    urlMsg.classList.replace("d-none", "d-block");
    return false;
  }
  if (!checkName(siteName, bookmarks)){
    return false
  }
  return true;
  
}



function checkName(siteName, bookmarks) {

  for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].name === siteName){
        existError.classList.replace("d-none", "d-block");
        return false
      }
  }

  return true;
}

