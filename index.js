/*
 * Shronk
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Initializes the JS functionality by playing music as soon as the page is
   * interacted with and making the clothes interactive.
   */
  function init() {
    /*
     * info about playing audo found here:
     * https://stackoverflow.com/questions/14356956/playing-audio-after-the-page-loads-in-html
     */

    let startBtn = document.querySelector("button");
    startBtn.addEventListener("click", function() {
      document.querySelector("audio").play();
      document.getElementById("start").classList.add("hidden");
      document.getElementById("game").classList.remove("hidden");
    });

    let clothes = document.getElementById("clothes");
    let cloth = clothes.querySelectorAll("img");

    for (let i = 0; i < cloth.length; i++) {
      cloth[i].addEventListener("click", toggleClothes);
    }
  }

  /**
   * Toggles whether or not Shrek is wearing a certain article of clothing.
   * They don't fit him very well, but it adds to the meme aesthetic.
   */
  function toggleClothes() {
    let shrek = document.getElementById("shrek");
    if (this.className.includes("selected")) {
      removeElement(this, shrek);
    } else {
      addElement(this, shrek);
    }
    this.classList.toggle("selected");
  }

  /**
   * Adds a clothing article to what shrek is wearing
   * @param {object} currentElement - DOM element of the clothing article
   * @param {object} parent - DOM element of the parent of the current element
   */
  function addElement(currentElement, parent) {
    let shrekOutfit = document.createElement("img");
    shrekOutfit.src = currentElement.src;
    parent.appendChild(shrekOutfit);

    if (currentElement.className.includes("hair")) {
      shrekOutfit.classList.toggle("hair-position");
      if (currentElement.className.includes("crown")) {
        let height = document.getElementById("real-shrek").offsetHeight;
        let outfitHeight = shrekOutfit.offsetHeight;
        let top = height/5 - outfitHeight/2;
        if (currentElement.className.includes("tall")) {
          top = height/7 - outfitHeight/2;
        }
        shrekOutfit.style.top = top + "px";
      } else {
        shrekOutfit.classList.toggle("loop-hair");
      }
    } else if (currentElement.className === "dress") {
      shrekOutfit.classList.toggle("dress-position");
      let width = document.getElementById("real-shrek").offsetWidth;
      let outfitWidth = shrekOutfit.offsetWidth;
      let left = width/2 - outfitWidth/2;
      shrekOutfit.style.left = left + "px";
    }
  }

  /**
   * Removes a clothing article if Shrek is already wearing it
   * @param {object} currentElement - DOM element of the clothing article
   * @param {object} parent - DOM element of the parent of the current element
   */
  function removeElement(currentElement, parent) {
    let currentClothes = parent.querySelectorAll("img");
    let currentItem = parent.querySelector("img");
    for (let i = 0; i < currentClothes.length; i++) {
      if (currentClothes[i].src === currentElement.src) {
        currentItem = currentClothes[i];
      }
    }
    parent.removeChild(currentItem);
  }

})();