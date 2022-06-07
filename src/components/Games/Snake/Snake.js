import React from 'react'
import './style.css'
import { useState, useEffect } from 'react';
const Snake = () => {

    const [score, setScore] = useState(0);
    const [hiscore, sethiScore] = useState(0);

    let inputDir = { x: 0, y: 0 };
    let foodSound = new Audio('music/food.mp3');
    let gameOverSound = new Audio('music/gameOver.mp3');
    let moveSound = new Audio('music/move.mp3');
    let musicSound = new Audio('music/music.mp3');
    let speed = 10;
    // let score = 0;
    let lastPaintTime = 0;
    let snakeArr = [{
        x: 13, y: 15
    }];
    var gameOn = true;
    var status = "b";
    var food = { x: 6, y: 7 };
    // var scoreBox = document.getElementById("scoreBox");
    var start = document.querySelector(".start");
    var boom = document.querySelector(".boom");
    // var hiscoreval = 0;
    // var hiscoreBox = document.getElementById("hiscoreBox");
    let board = document.getElementById("board");
    function main(ctime) {
        if (gameOn)
            window.requestAnimationFrame(main);
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }

    function gameEngine() {
        // Update snake array and food
        if (isCollide(snakeArr)) {
            gameOverSound.play();
            inputDir = { x: 0, y: 0 };
            setTimeout(function () {
                musicSound.play();
            }, 1000)
            setScore(0);
            var topH = document.querySelector(".head").getBoundingClientRect();
            boom.style.top = topH.top - 60 + "px";
            boom.style.left = topH.left - 60 + "px";
            boom.style.display = "block";
            setTimeout(function () {
                boom.style.display = "none";
            }, 5000)
            start.innerHTML = "GAME OVER";
            var p = document.createElement("p");
            p.innerHTML = "Press Enter to Continue";
            start.append(p);
            start.style.display = "block";
            status = "e";
            gameOn = false;
        }
        //after eat regenerate next food
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            setScore(score + 1);
            if (score > hiscore) {
                sethiScore(score);
                localStorage.setItem("hiscore", JSON.stringify(hiscore));
                // hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            foodSound.play();
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
            let a = 2;
            let b = 16;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        }
        //Moving Snake
        for (var i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
        //Display snake and food

        // display snake
        board.dangerouslySetInnerHTML = "";
        snakeArr.forEach((e, index) => {
            var snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0)
                snakeElement.classList.add('head');
            else
                snakeElement.classList.add('snake');
            board.append(snakeElement);
            var snakeHead = document.querySelector(".head");
            if (inputDir.y === -1) {
                snakeHead.style.transform = "scale(1.5) rotate(180deg)";
            }
            if (inputDir.y === 1) {
                snakeHead.style.transform = "scale(1.5) rotate(0deg)";
            }
            if (inputDir.x === -1) {
                snakeHead.style.transform = "scale(1.5) rotate(90deg)";
            }
            if (inputDir.x === 1) {
                snakeHead.style.transform = "scale(1.5) rotate(270deg)";
            }
        })

        // food snake
        var foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.append(foodElement);

    }

    function isCollide(sarr) {
        //If you bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
                return true;
            }
        }

        if (snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0) {
            return true;
        }
        return false;
    }


    useEffect(() => {

        //Game Functions



        // Main Logic

        let prevhiscore = localStorage.getItem("hiscore");
        if (prevhiscore === null) {
            sethiScore(0);
            localStorage.setItem("hiscore", JSON.stringify(hiscore));
        } else {
            sethiScore(prevhiscore)
            // hiscoreBox.innerHTML = "HiScore: " + hiscore;
        }

        window.requestAnimationFrame(main);
        window.addEventListener('keydown', e => {

            if (status === "b") {
                gameOn = true;
                window.requestAnimationFrame(main);
            }
            if (status !== "b" && e.key !== "Enter")
                return;
            if (snakeArr.length === 1 && gameOn) {
                inputDir = { x: 0, y: -1 };
                document.querySelector(".start").innerHTML = "";
            }
            moveSound.play();
            console.log(snakeArr.length);
            switch (e.key) {
                case "ArrowUp":
                    if (inputDir.y !== 1 || snakeArr.length === 1) {
                        inputDir.x = 0;
                        inputDir.y = -1;
                    }
                    break;
                case "ArrowDown":
                    if (inputDir.y !== -1 || snakeArr.length === 1) {
                        inputDir.x = 0;
                        inputDir.y = 1;
                    }
                    break;
                case "ArrowLeft":
                    if (inputDir.x !== 1 || snakeArr.length === 1) {
                        inputDir.x = -1;
                        inputDir.y = 0;
                    }
                    break;
                case "ArrowRight":
                    if (inputDir.x !== -1 || snakeArr.length === 1) {
                        inputDir.x = 1;
                        inputDir.y = 0;
                    }
                    break;
                case "Enter":
                    start.innerHTML = "Press Any Key to Continue";
                    snakeArr = [{
                        x: 13, y: 15
                    }];
                    window.requestAnimationFrame(main);
                    boom.style.display = "none";
                    status = "b";
                    musicSound.pause();
                    break;
                default:
                    break;
            }
        })

    })
    return (
        <div className="body">
            <div className="start">Press any Key to Start the Game</div>
            <div id="scoreBox">Score: {score}</div>
            <div id="hiscoreBox">Hi Score: {hiscore}</div>
            <div id="board"></div>
            <img src="../../images/boom.gif" className="boom" alt="boom" />
        </div>
    )
}

export default Snake
