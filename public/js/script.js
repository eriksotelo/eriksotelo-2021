"use strict";

const heart = document.querySelectorAll(".heart");
const heartItem = document.querySelectorAll(".heartItem");
const bookmark = document.querySelectorAll(".bookmark");
// const designLikes = document.getElementById(".designLikes");

// heart.addEventListener("click",function (){
//   heart.classList.toggle("clickedHeart");
// };

// bookmark.addEventListener("click",function (){
//   bookmark.classList.toggle("clickedBookmark");
// };

for (var i = 0; i < heart.length; i++) {
  heart[i].addEventListener("click", function () {
    let currentLikes =
      this.parentElement.parentElement.nextElementSibling.innerHTML;
    let counter = parseFloat(currentLikes.replace(/,/g, ""));
    console.log(counter);
    this.classList.toggle("clickedHeart");
    if (this.classList.contains("clickedHeart")) {
      console.log(currentLikes);
      this.parentElement.parentElement.nextElementSibling.innerHTML =
        (counter + 1).toLocaleString("en-US") + " likes";
      // (this.parentElement.parentElement.nextElementSibling.innerHTML =
      //   counter + 1).toLocaleString("en-US");
      // return newCounter;
      // document.getElementById("heartItem").nextElementSibling.innerHTML =
      //   "1.5K";
    } else {
      this.parentElement.parentElement.nextElementSibling.innerHTML =
        (counter - 1).toLocaleString("en-US") + " likes";
      // return newCounter - 1;
      // this.parentElement.parentElement.nextElementSibling.innerHTML =
      //   "1.4K likes";
      // document.getElementById("heartItem").nextElementSibling.innerHTML =
      //   "1.4K";
    }
  });
}

for (var i = 0; i < bookmark.length; i++) {
  bookmark[i].addEventListener("click", function () {
    this.classList.toggle("clickedBookmark");
  });
}
// Add or remove like

// for (var i = 0; i < likes.length; i++) {
//   likes[i].addEventListener("click", function () {
//     console.log(this.closest("div"));
//   });
// }
