let game = document.getElementById('game')
let character = document.getElementById('character')
let both = 0
let charMove;
let counter = 0;
counterArray = [];

function moveLeft() {
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterXpos > 0){
        character.style.left = characterXpos - 2 + "px"
    }
}

function moveRight() {
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterXpos < 375){
        character.style.left = characterXpos + 2 + "px"
    }
}

document.addEventListener('keydown', function(e) {
    if(both == 0){
        both++
        if(e.key == "ArrowLeft") {
            charMove = setInterval(moveLeft, 1)
        }
        if(e.key == "ArrowRight") {
            charMove = setInterval(moveRight, 1)
        }
    }
})

document.addEventListener('keyup', function(e) {
   clearInterval(charMove) 
   both = 0
})

var blocks = setInterval(function() {
    
    let prevBlock_top = 0
    let prevHole_top = 0
    let prevBlock = document.getElementById('block'+(counter-1))
    let prevHole = document.getElementById('hole'+(counter-1))

    if(counter>0){
        prevBlock_top = parseInt(window.getComputedStyle(prevBlock).getPropertyValue('top'))
        prevHole_top = parseInt(window.getComputedStyle(prevHole).getPropertyValue('top'))
    }

    if(prevBlock_top<400 || counter == 0) {
        block = document.createElement('div')
        block.setAttribute('class', "block")
        block.setAttribute('id', "block"+counter)
        block.style.top = prevBlock_top + 100 + "px"
        hole = document.createElement('div')
        hole.setAttribute('class', "hole")
        hole.setAttribute('id', "hole"+counter)
        randomPos= Math.floor(Math.random() * 360)
        hole.style.left = randomPos + 'px'
        hole.style.top = prevHole_top + 100 + "px"
        game.appendChild(block)
        game.appendChild(hole)
        counterArray.push(counter)
        counter++
    }

    characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    drop = 0

    if(characterTop <= 0) {
        alert("Game over, Score: "+(counter - 9))
        clearInterval(blocks);
        location.reload();
    }

    for(var i=0; i<counterArray.length; i++) {
        current = counterArray[i]
        cblock = document.getElementById('block'+current)
        chole = document.getElementById('hole'+current)
        cblock_top = parseInt(window.getComputedStyle(cblock).getPropertyValue('top'))
        chole_left = parseInt(window.getComputedStyle(chole).getPropertyValue('left'))
        cblock.style.top = cblock_top - 0.5 + "px"
        chole.style.top = cblock_top - 0.5 + "px"

        if(cblock_top < -20) {
            counterArray.shift()
            cblock.remove()
            chole.remove()
        }

        if(cblock_top-20 < characterTop && cblock_top > characterTop) {
            drop++;
            if(chole_left <= characterLeft && chole_left + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }

    if(drop == 0) {
        if(characterTop < 400) {
            character.style.top = characterTop + 2 + "px"
        }
    }
    else {
        character.style.top = characterTop - 0.5 + "px"
    }
    
}, 1)
