'use strict';
// please do not delete the 'use strict' line above

const colorCode = { "r": 0, "g": 0, "b": 0 };
const div = document.querySelector("div");
let checkRgb;
let count = 0;
let targetSpan;
let allSpan;

initializationOfSpan();

function initializationOfSpan() {
    allSpan = document.querySelectorAll("span");
    allSpan.forEach(span => span.remove());
    count = 0;
    const colors = JSON.parse(localStorage.getItem("favoriteColors"));
    if (colors) {
        colors.forEach(color => createSpan(color));
        allSpan = document.querySelectorAll("span");
        allSpan.forEach(span => {
            span.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                span.remove();
                count--;
                saveDate();
            });
        });
        allSpan = "";
    }
}

function createSpan(color) {
    const favoriteColorSpan = document.createElement("span");
    div.appendChild(favoriteColorSpan);
    document.querySelectorAll("span")[count].id = `${count}`;
    targetSpan = document.getElementById(count);
    if (typeof color === "string") {
        targetSpan.style.background = color;
    } else if (typeof color === "object") {
        targetSpan.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
    count++;
    allSpan = "";
    addChangeColorSystem();
}

function addChangeColorSystem() {
    if (allSpan === "") {
        allSpan = document.querySelectorAll("span");
        allSpan.forEach(span => {
            span.addEventListener("click", function() {
                setSomethingColor(span.style.background)
            });
        });
    }
}

const colorChangeButton = document.getElementById("color-button");

function setSomethingColor(setingColor) {
    document.body.style.backgroundColor = setingColor;
    colorChangeButton.style.background = setingColor;
}

colorChangeButton.addEventListener("click", changeColor);

function changeColor() {
    console.log("Change Color Button clicked!");
    Object.keys(colorCode).forEach(key => colorCode[key] = Math.round(Math.random() * 255));
    setSomethingColor(`rgb(${colorCode.r}, ${colorCode.g}, ${colorCode.b})`);
    checkRgb = document.body.style.backgroundColor;
    initializationOfSpan();
}

const addFavoriteColorButton = document.getElementById("add-favorite-button");

addFavoriteColorButton.addEventListener("click", addFavoriteColor);

function addFavoriteColor() {
    console.log("Add Favorite Button clicked!");
    if (checkRgb === document.body.style.backgroundColor) {
        checkRgb = "";
        createSpan(colorCode);
        saveDate();
    }
    initializationOfSpan();
}

function saveDate() {
    const favoriteColors = [];
    allSpan = document.querySelectorAll("span");
    allSpan.forEach(span => favoriteColors.push(span.style.background));
    localStorage.setItem("favoriteColors", JSON.stringify(favoriteColors));
}

addFavoriteColorButton.addEventListener("contextmenu", deleteFavoriteColor);

function deleteFavoriteColor(event) {
    event.preventDefault();
    localStorage.removeItem("favoriteColors");
    initializationOfSpan();
}
