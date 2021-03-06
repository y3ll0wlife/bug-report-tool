/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
  var temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
};

$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".modal").modal();
  $("select").formSelect();
  $(".dropdown-trigger").dropdown();
  $("textarea#reportID, textarea#newContent, textarea#stepsToRepro1").characterCounter();
});

var intervalID = window.setInterval(myCallback, 1000);
var strInternval = window.setInterval(checkIfSTRISActive, 1000);

function checkIfSTRISActive() {
  if (document.getElementById("section").value == 2) {
    document.getElementById("strField").style.display = "block";
    document.getElementById("other").style.display = "none";
  } else {
    document.getElementById("strField").style.display = "none";
    document.getElementById("other").style.display = "block";
  }
}

// Create a "close" button and append it to each list item
var steps = document.getElementsByClassName("collection-item");
var i;
for (i = 0; i < steps.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  steps[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.remove();
  };
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.setAttribute("class", "collection-item");
  li.setAttribute("style", "background-color: transparent; border:none");

  var inputValue = document.getElementById("str").value;
  var t = document.createTextNode(" - " + inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("Steps to Reproduce cannot be empty!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("str").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode(" \u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
    };
  }
}

function myCallback() {
  var x = document.getElementById("command");
  let missing = "Missing ";

  if (document.getElementById("reportID").value == "") missing += "Report-ID#";
  if (document.getElementById("newContent").value == "") missing += "New-content#";
  document.getElementById("copy").disabled = true;

  missing = missing.split("#").join(", ");
  missing = missing.split("-").join(" ");
  missing = missing.substring(0, missing.length - 2);
  x.innerHTML = missing;

  if (document.getElementById("section").value == 2 && document.getElementById("myUL").getElementsByTagName("li").length != 0 && document.getElementById("reportID").value != "") x.innerHTML = "Missin";

  if (x.innerHTML == "Missin") {
    document.getElementById("copy").disabled = false;
    x.innerHTML = "!edit ";
    x.innerHTML += sanitizeHTML(document.getElementById("reportID").value);

    if (document.getElementById("section").value == 1) x.innerHTML += " -t "; // Title
    if (document.getElementById("section").value == 2) x.innerHTML += " -r "; // Repro stesps (STR)
    if (document.getElementById("section").value == 3) x.innerHTML += " -e "; // Expected
    if (document.getElementById("section").value == 4) x.innerHTML += " -a "; // Actual
    if (document.getElementById("section").value == 5) x.innerHTML += " -c "; // Client
    if (document.getElementById("section").value == 6) x.innerHTML += " -s "; // System

    if (document.getElementById("section").value == 2) {
      for (let i = 0; i < steps.length; i++) {
        var lis = document.getElementById("myUL").getElementsByTagName("li");
        //x.innerHTML += sanitizeHTML(lis[i].textContent.replace("×", "").slice(0, -1));
        if (i == 0) x.innerHTML += sanitizeHTML(lis[i].textContent.replace("×", "").replace("-", ""));
        else x.innerHTML += sanitizeHTML(lis[i].textContent.replace("×", ""));
      }
    } else x.innerHTML += sanitizeHTML(document.getElementById("newContent").value);
  }
}

function loadDarkTheme() {
  $("body").css("background-color", "#2c2f33");
  $("footer").css("color", "#959c97");
  $("label").css("color", "#959c97");
  $("li").css("color", "#959c97");
  $("input").css("color", "#ffffff");
  $("textarea").css("color", "#ffffff");

  $("#command").css("color", "#959c97");

  $("#strongThemed0").css("color", "#959c97");
  $("#strongThemed1").css("color", "#959c97");

  $(".modal-content").css("background-color", "#2c2f33");
  $(".modal-footer").css("background-color", "#2c2f33");
  $(".footerText").css("color", "#ffffff");

  $("#iconThemed0").css("color", "#ffffff");
  $("#iconThemed1").css("color", "#ffffff");
  $("#iconThemed2").css("color", "#ffffff");
  $("#iconThemed3").css("color", "#ffffff");

  $("#iconThemedWindows").css("color", "#ffffff");
  $("#iconThemedAndroid").css("color", "#ffffff");
  $("#iconThemediOS").css("color", "#ffffff");
  $("#iconThemedBrowswer").css("color", "#ffffff");

  $("#modalColor").css("background-color", "#2c2f33");

  $(".boldText").css("font-weight", 700);
  $(".boldText").css("color", "#ffffff");

  $(".fieldTitle").css("font-size", 15);
  $(".fieldTitle").css("color", "#646f6a");

  $(".fieldItem").css("font-size", 13);
  $(".fieldItem").css("color", "#ffffff");

  $(".text").css("color", "#ffffff");

  $("#modelFooter").css("background-color", "#2c2f33");
  $("#footerText").css("color", "#ffffff");
}

function loadWhiteTheme() {
  $("body").css("background-color", "#ffffff");
  $("footer").css("color", "#000000");
  $("label").css("color", "#000000");
  $("li").css("color", "#000000");
  $("input").css("color", "#000000");
  $("textarea").css("color", "#000000");

  $("#command").css("color", "#000000");

  $("#strongThemed0").css("color", "#000000");
  $("#strongThemed1").css("color", "#000000");

  $(".modal-content").css("background-color", "#ffffff");
  $(".modal-footer").css("background-color", "#ffffff");
  $(".footerText").css("color", "#000000");

  $("#iconThemed0").css("color", "#000000");
  $("#iconThemed1").css("color", "#000000");
  $("#iconThemed2").css("color", "#000000");
  $("#iconThemed3").css("color", "#000000");

  $("#iconThemedWindows").css("color", "#000000");
  $("#iconThemedAndroid").css("color", "#000000");
  $("#iconThemediOS").css("color", "#000000");
  $("#iconThemedBrowswer").css("color", "#000000");

  $("#modalColor").css("background-color", "#ffffff");

  $(".boldText").css("font-weight", 700);
  $(".boldText").css("color", "#000000");

  $(".fieldTitle").css("font-size", 15);
  $(".fieldTitle").css("color", "#646f6a");

  $(".fieldItem").css("font-size", 13);
  $(".fieldItem").css("color", "#000000");

  $(".text").css("color", "#000000");

  $("#modelFooter").css("background-color", "#ffffff");
  $("#footerText").css("color", "#000000");
}
