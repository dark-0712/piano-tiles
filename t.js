'use strict'

document.addEventListener('DOMContentLoaded',setup)



let tileSequence;
let clickingEnabled = false;
let gameover;
let roundclicks;
let playbutton;


function setup() {
    tileSequence = new Map()
    playbutton=document.querySelector('button');

    let allTiles = document.querySelectorAll('td')
    allTiles.forEach(element => {
        element.style.backgroundColor='yellow'
        element.addEventListener('click',evt =>{
            if(clickingEnabled){
                clickTile(evt)
            }
        })
    });
    playbutton.addEventListener('click', () => {
        gameover = false;
        roundclicks = 0;
        playRound()
        allTiles.forEach(element => {
            element.style.backgroundColor = 'yellow'
        });

        playbutton.style.visibility = 'hidden'
    })    
}

let score=0;
function clickTile(evt){
    roundclicks++;
    const tile=evt.target


    if(evt.target.getAttribute('id')===tileSequence.get(roundclicks)){
        tile.style.backgroundColor= 'yellow'
        
        setTimeout(()=>{
            tile.style.backgroundColor='blue'
        },100);
        score+=10;
        document.querySelector('#score').textContent=`SCORE: ${score}`
    
    } else{
        tile.style.backgroundColor='rgb(255,0,0)'
        gameover=true;
        tileSequence.clear()
        document.querySelector('#message').textContent=`GAME OVER | SCORE: ${score}`
        document.querySelector('#message').style.color=`rgb(255,0,0)`
        setTimeout(()=>{
            document.querySelector('#message').textContent=`Welcome to Piano tiles game`
        },5000)
        clickingEnabled=false;
        playbutton.style.visibility='visible'
        playbutton.textContent="Try Again"
        score=0;
    }
    if (tileSequence.size===roundclicks && !(gameover)){
        playRound()
        
    }
}

function randomOneToSixteen() {
    let randomnumber=Math.random()*16
    return Math.floor(randomnumber) + 1
}

function addToSequence(){
    const randomTileNumber = randomOneToSixteen()
    tileSequence.set(tileSequence.size+1, `tile-${randomTileNumber}`)

}
function lightSequence() {
    clickingEnabled=false;
    document.querySelector('table').style.borderColor=`blue`
    setTimeout(()=>{
        clickingEnabled=true;
        roundclicks=0;
        document.querySelector('table').style.borderColor=`rgb(255,178,0)`
    }, (tileSequence.size+1.5) *1000)
    tileSequence.forEach((value ,key ) => {
        const tile = document.querySelector(`#${value}`)
        setTimeout(()=>{
            lightTile(tile)
        },1000*key);
        
    })
}
function lightTile(tile) {
    tile.style.backgroundColor='red'
    setTimeout( () => {
        tile.style.backgroundColor='yellow'
    },500);
}
function playRound(){
    addToSequence()
    document.querySelector('#round-heading').textContent= `Round ${tileSequence.size} ` 
    lightSequence()
}
