
let gameName = "Guess The Word"
document.title = gameName;
document.querySelector( "h1" ).innerHTML = gameName;
document.querySelector( "footer" ).innerHTML = `${gameName} Game Created By Elzero Web School`;

let numbersOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

// manage words 
let wordToGuess = "";
const words = ["Creat", "Update","Delete","Master","Branuc","Mainly","Elzero","School"]
wordToGuess = words[ Math.floor( Math.random() * words.length ) ].toLowerCase();
let messageArea = document.querySelector( ".message" )


function generateInput () {
  const inputsContainer = document.querySelector( ".inputs" );
  for ( let i = 1; i < numbersOfTries; i++ ) {
    const tryDiv = document.createElement( "div" );
    tryDiv.classList.add( `try-${ i }` )
    tryDiv.innerHTML = `<span>Try ${ i }</span>`;

    if ( i !== 1 ) tryDiv.classList.add( "disabled-inputs" )
    
    for ( let j = 1; j <= numberOfLetters; j++ ) {
      const input = document.createElement( "input" );
      input.type = "text";
      input.id = `guess-${ i }-letter-${ j }`;
      input.setAttribute( "maxlength", "1" );
      tryDiv.appendChild( input )
    }
    inputsContainer.appendChild( tryDiv )
  }
  inputsContainer.children[ 0 ].children[ 1 ].focus();
  const inputsInDisabledDiv = document.querySelectorAll( ".disabled-inputs input" );
  inputsInDisabledDiv.forEach( ( input ) => ( input.disabled = true ) );
  const inputs = document.querySelectorAll( "input" )
  inputs.forEach( ( input, index ) => {
    input.addEventListener( "input", function() {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[ index + 1 ];
      if(nextInput) nextInput.focus()
    } )
    
    // revision
    input.addEventListener( "keydown", function( event ) {
      const currentIndex = Array.from( inputs ).indexOf(event.target)
      if ( event.key === "ArrowRight" ) {
        const nextInput = currentIndex + 1;
        if(nextInput < inputs.length) inputs[nextInput].focus()
      } else if ( event.key === "ArrowLeft" ) {
        const previosInput = currentIndex - 1
        if(previosInput >= 0) inputs[previosInput].focus()
      }
      
    } )
    // end event fnuction 
  })
}

const guessButton = document.querySelector( ".check" );
guessButton.addEventListener("click", handleGuesses)

console.log(wordToGuess)
function handleGuesses () {
  let successGuess = true;
  for ( let i = 1; i <= numberOfLetters; i++){
    const inputFiled = document.querySelector(`#guess-${currentTry}-letter-${i}`) 
    const letter = inputFiled.value.toLowerCase();
    const actualLetter = wordToGuess[ i - 1 ];
    // game logic 
    if (letter === actualLetter) {
      inputFiled.classList.add("yes-in-place")
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFiled.classList.add( "not-in-place" );
      successGuess = false;
    } else {
      inputFiled.classList.add( "no" )
      successGuess = false;
    }
  }
  if ( successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${ wordToGuess }</span>`;
    let allTries = document.querySelectorAll( ".inputs > div" );
    allTries.forEach( ( tryDiv )=>{
      tryDiv.classList.add("disabled-inputs")
    } )
    guessButton.disabled = true;
    guessButton.classList.add( "disabled-inputs" )
    
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs")
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input` )
    currentTryInputs.forEach((input)=> (input.disabled = true))
    currentTry++;
    console.log(currentTry)

  }
}


window.onload = function() {
  generateInput();
}