
// setup word array of five words

const words = [
    "one",
    "two",
    "three",
    "four",
    "five"
];

// setup numeric array of 5 numbers

let numbers = [ 1, 2, 3, 4, 5];


// output contents of  array


/*  if true then is a word, boolean expression either true or false
    whether the value is a word or number, true=word, false=number */

var isWord = true; // whether the value is a word or number, true=word, false=number
if (isWord) {

 // if a word iterate through word array

let text = "";


// use a for loop to iterate through words array

for (let i = 0; i < words.length; i++) {
    text = text + words[i] + "<br>";
}

// output word array in newlines

document.getElementById("list-words").innerHTML = text;

} else {
    

// define numb variable and concantenate number with <br> to output array on newlines

let numb = "";

// use a for loop to iterate through numbers array

for (let i = 0; i < numbers.length; i++) {
    numb = numb + numbers[i] + "<br>";
}

document.getElementById("list-numbers").innerHTML = numb;  // outputs contents of number array

}

// using a switch statement

let favouriteColour = "blue";

switch (favouriteColour) {
    case "yellow":
        alert("Your favourite colour is Yellow");
        break;

    case "red":
        alert("Your favourite colour is Red");
        break;

    case "blue":
        alert("Your favourite colour is Blue");
        break;

     default:
        alert("no known colour specified");
        break;
}

