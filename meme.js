// For this assignment, you’ll be building a meme generator in the browser using HTML, CSS, and JavaScript.

// Your generator should consist of a form:
// that accepts a link to an image, 
// text for the top of the meme, 
// and text for the bottom of the meme. 
// When the user submits the form, use JavaScript to append to the 
// DOM a div which contains the meme, including the image and its text.

// Requirements

// User should be able to submit a form on the page to 
// generate a new meme on the page, 
// and should be able to add multiple memes to the 
// page by submitting the form multiple times.
// Users should be able to click on a button to remove a meme from the page.
// When the meme form is submitted, values in the form inputs should be cleared.
// Be sure to style your meme generator! 
// It should be functional but also look nice.

let topText = document.querySelector("#topText");
let bottomText = document.querySelector("#bottomText");
let image = document.querySelector("#image");
let classicMeme = document.querySelector("#classicModeInactive");
let modernMeme = document.querySelector("#modernModeInactive");
let memePlacement = document.querySelector("#memePlacement");
let textColor = document.querySelector("#textColor");
let style = document.querySelector("#styleHolder");

classicMeme.onclick = function(e){
    
    e.preventDefault();
    if(modernMeme.id === "modernModeActivated"){
        style.innerHTML = "";
        createMeme(memeText,classicMeme);
        modernMeme.id = "modernModeInactive"
    } else {
        createMeme(memeText,classicMeme);
    }
    classicMeme.id = "classicModeActivated";
    
    
}

modernMeme.onclick = function(e){
    
    e.preventDefault();
    if(classicMeme.id === "classicModeActivated"){
        style.innerHTML = "";
        createMeme(memeText,modernMeme);
        classicMeme.id = "classicModeInactive"
    } else {
        createMeme(memeText,modernMeme);
    }
    modernMeme.id = "modernModeActivated";
    
    
}

//Combines separate functions to create meme output
function createMeme(memeText,memeStyle){
    console.log(memeStyle.value);
    if(memeStyle.id === `${memeStyle.value}Inactive`){
        style.innerHTML = `<link rel="stylesheet" href="${memeStyle.value}Style.css" type="text/css"></link>`
    }

    let topWording = memeText(topText);
    let memeImage = graphic();
    let bottomWording = memeText(bottomText);
    let rows = getRowNumber(topWording,bottomWording,memeImage);
    let removeButton = createRemoveButton(rows);
    let memeContainer = createMemeContainer(topWording,bottomWording,memeImage);
    memeContainer.prepend(removeButton);
    
}

//grabs text from form and formats for meme
function memeText(words){
    let phrase = document.createElement("h3");
    phrase.innerText = words.value;
    let topTextContainer = document.createElement("div")
    phrase.className = `${words.id}`;
    phrase.className += " text";
    phrase.style.color = textColor.value;
    console.log(words);
    return phrase;
}

//Grabs image from form and formats for meme
function graphic(){
    let memeImage = document.createElement("img");
    memeImage.className = "memeImage";
    memeImage.src = image.value;
    return memeImage;
}

//Create the remove button for meme
function createRemoveButton(rows){
    let removeButton = document.createElement("button");
    if(rows === 1){
        removeButton.id = "oneRowOfTotalText";
    } else if(rows === 2){
        removeButton.id = "twoRowsOfTotalText";
    } else if(rows === 3){
        removeButton.id = "threeRowsOfTotalText";
    } else if(rows === 4){
        removeButton.id = "fourRowsOfTotalText";
    } else if(rows === 5){
        removeButton.id = "fiveRowsOfTotalText";
    } else if(rows === 6){
        removeButton.id = "sixRowsOfTotalText";
    } 
    removeButton.innerText = "Remove";
    removeButton.className = "removeButton"
    removeButton.addEventListener("click",function(e){
        e.preventDefault();
        e.target.parentElement.remove()
    })
    return removeButton;
}

function getRowNumber(topWording,bottomWording,memeImage){
    let topRows;
    let bottomRows;

    if(topWording.innerText.length = 0){
        topRows = 0;
    } else if(topWording.innerText.length <= 18 && topWording.innerText.length >= 0){
        memeImage.id += "oneRowOfText";
        topRows = 1;
    } else if(topWording.innerText.length >= 19 && topWording.innerText.length <= 36 ) {
        memeImage.id += "twoRowsOfText";
        topRows = 2; 
    } else {
        memeImage.id += "threeRowsOfText";
        topRows = 3;
    }
    
    if(bottomWording.innerText.length <= 18){
        bottomRows = 1;
        if(topRows === 2){
            bottomWording.id = "bottomRowPlacement1";
        } else if(topRows === 3){
            bottomWording.id = "bottomRowPlacement2";
        }
    } else if(bottomWording.innerText.length >= 19 && bottomWording.innerText.length <= 36 ) {
        bottomRows = 2;
        if(topRows === 2){
            bottomWording.id = "bottomRowPlacement2";
        } else if(topRows === 3){
            bottomWording.id = "bottomRowPlacement3";
        }
    } else {
        bottomRows = 3;
        if(topRows === 2){
            bottomWording.id = "bottomRowPlacement2";
        } else if(topRows === 3){
            bottomWording.id = "bottomRowPlacement3";
        }
    }

    return topRows + bottomRows;
}

function createMemeContainer(topWording,bottomWording,memeImage){
    let memeContainer = document.createElement("div")
    memeContainer.className = "memeContainer";


    if(topWording.innerText.length !==0){
        memeContainer.appendChild(topWording);  
    }
    memeContainer.appendChild(memeImage);
    if(bottomWording.innerText.length !==0){
        memeContainer.appendChild(bottomWording);
    }
    memePlacement.appendChild(memeContainer);

    return memeContainer;
}