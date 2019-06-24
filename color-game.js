let numSquares = 6;
let colors = generateRandomColors(numSquares);
let pickedColor = pickColor(colors);

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("color_display");
let playerStatusDisplay = document.querySelector("#player_status");
let h1 = document.getElementsByTagName("h1")[0];
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector("#easy_mode");
let hardButton = document.querySelector("#hard_mode");
let modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    // set up game objective.
    colorDisplay.textContent = pickedColor;
    // Set up buttons.
    setupButtons();
    // Set up squares.
    setupSquares();

    reset();
};

function setupButtons(){
    for(let i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // there has to be a better way to do the above.
            this.classList.add("selected");
            if (this.textContent == "Easy"){
                numSquares = 3;
            }
            else{
                numSquares = 6;
            }
            reset();
        })
    }
}

function setupSquares(){
    for(let i = 0; i < squares.length; i++){
        // Add initial color to squares
        squares[i].style.backgroundColor = colors[i];
        // Add click listeners to squares
        squares[i].addEventListener("click", function(){
            // Grab color of clicked square to compare to picked color.
            let clickedColor = this.style.backgroundColor;
    
            if (clickedColor == pickedColor){
                playerStatusDisplay.textContent = "Nailed it"
                resetButton.textContent = "Play again?"
                changeColors(clickedColor);
            }
            else {
                this.style.backgroundColor = "#232323";
                playerStatusDisplay.textContent = "Try again!"
            }
        })
    };
}

function reset(){
    // Generate new colors
    colors = generateRandomColors(numSquares);
    // pick new winning color
    pickedColor = pickColor(colors);
    colorDisplay.textContent = pickedColor;
    // change square colors
    for(let i = 0; i < squares.length; i++){
        // Add initial color to squares
        if (colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else {
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent = "New Game";
    playerStatusDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
});

function changeColors(color_value){
    // loop through all objects that need color adjustments.
    for(let i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color_value;
    };
    h1.style.backgroundColor = color_value
}

function pickColor(list){
    let rand = Math.floor(Math.random() * list.length);
    return list[rand];
}

function generateRandomColors(num){
    // make array
    let arr = [];
    // add num random colors to array num times
    for (let i = 0; i < num; i++){
        // create random color and append to array
        arr.push(randomColor())
    }
    // return array
    return arr;
}

function randomColor(){
    // pick 3 random vals from 0-255
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return ("rgb(" + r + ", " + g + ", " + b + ")")
}