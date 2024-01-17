"use strict";
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form");
const input = document.querySelector("#inputText");
const list = document.querySelector("ul");
const title = document.querySelector("h1");
const listWrapper = document.querySelector("#listWrapper");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  list.innerHTML = "";

  const inputText = input.value.trim();

  if (inputText === "") {
    input.value = "";
  }

  const arrayOfWords = inputText
    .split("\n")
    .filter((item) => item !== "")
    .map((item) => item.split(" ").filter((item) => item !== ""))
    .flat()
    .map(item => item.toLowerCase()); // отут зробив так, що DO i do - це не 2 унікальних слова
  
  const setOfWords = new Set(arrayOfWords);
  const mapOfWords = new Map();

  arrayOfWords.forEach((word) => {
    if (!mapOfWords.has(word)) {
      mapOfWords.set(word, 1);
    } else {
      mapOfWords.set(word, mapOfWords.get(word) + 1);
    }
  });

  setOfWords.forEach((word) => {
    const item = document.createElement("li");
    item.className = "item";
    const countOfWords = mapOfWords.get(word);
    item.textContent = `${word}: ${countOfWords}`;
    list.append(item);
  });

  listWrapper.classList.add("list__wrapper");
  title.textContent = `Унікальних слів - ${setOfWords.size}`;
});
