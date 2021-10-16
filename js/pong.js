// (() => { //iife

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Making this responsive
const heightRatio = 1;
canvas.height = canvas.width * heightRatio;

// All colors
const darkBlue = getComputedStyle(document.documentElement).getPropertyValue('--darkBluePong');
const skyBlue = getComputedStyle(document.documentElement).getPropertyValue('--skyBluePong');
const blue = getComputedStyle(document.documentElement).getPropertyValue('--bluePong');
const dark = getComputedStyle(document.documentElement).getPropertyValue('--darkPong');
const red = getComputedStyle(document.documentElement).getPropertyValue('--redPong');
const black = getComputedStyle(document.documentElement).getPropertyValue('--blackPong');


// other globals variables
// const canvasWidth = canvas.width;

// function to set the background
const background = () => {
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
background();

// creating buttons class
class Rectangle {

    constructor(color, x, y, width, height) { //size parameter needs
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    fill() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}

class Button extends Rectangle {

    constructor(color, x, y, width, height, text, oppositeColor, font = '30px "VT323", consolas', active = true) {
        super(color, x, y, width, height);
        this.text = text;
        this.oppositeColor = oppositeColor;
        this.font = font;
        this.active = active
    }

    createText() {
        ctx.fillStyle = this.oppositeColor;
        ctx.font = this.font;
        ctx.fillText(this.text, canvas.width / 2 - this.text.length * 6, this.y + 40 - this.height + 5)
    }

    createButton() {
        this.fill();
        this.createText();
    }

}

class Text {
    constructor(color, text, x, y, fontSize = '20px', fontFamily = ' "VT323", consolas') {
        this.color = color;
        this.fontSize = fontSize;
        const font = this.fontSize + fontFamily;
        this.font = font;
        this.text = text;
        this.x = x;
        this.y = y;
    }

    fill() {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y)
    }
}

// text of options
const optionsText = new Text(skyBlue, 'Select the mode that you want to play', canvas.width / 2 - 'Select the mode that you want to play'.length * 4, 90);
optionsText.fill()


// instancing buttons
const playerVsPlayer = new Button(skyBlue, canvas.width / 2 - canvas.width / 3, canvas.width / 10 * 4, canvas.width * 2 / 3, canvas.width / 15, 'player vs player', dark)
playerVsPlayer.createButton();

const playerVsComputer = new Button(skyBlue, canvas.width / 2 - canvas.width / 3, canvas.width / 10 * 7, canvas.width * 2 / 3, canvas.width / 15, 'player vs computer', dark)
playerVsComputer.createButton();



// clear all the canvas
const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 50);
// // ctx.closePath();
// ctx.fillStyle = 'coral';
// ctx.fill();

const initializePlayerVsPlayer = () => {

    // creating text of players
    const player1Text = new Text(skyBlue, 'Player 1', canvas.width / 40, canvas.height / 17, '24px')
    const player2Text = new Text(skyBlue, 'Player 2', canvas.width - 'Player 2'.length * 11, canvas.height / 17, '24px')

    // creating restart, pause and home buttons

    class Icon {
        constructor(x, y, w, h, color, line = 2.5, func = {}) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = color;
            this.line = line;
            this.func = func;
        }

        createStroke() {
            ctx.strokeStyle = skyBlue;
            ctx.lineWidth = this.line
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }

    const createIcons = () => {
        //pause button
        const pauseDraw = () => {
            ctx.fillStyle = skyBlue;
            ctx.fillRect(canvas.width / 2 - 80 + 4, canvas.height - 40 + 4, 6.5, 17);
            ctx.fillRect(canvas.width / 2 - 80 + 4 + 8 + 2, canvas.height - 40 + 4, 6.5, 17);
        }
        const pause = new Icon(canvas.width / 2 - 80, canvas.height - 40, 25, 25, pauseDraw);
        pauseDraw();
        pause.createStroke();

        // create restart button
        const restart = new Icon(canvas.width / 2 - 25 - 20, canvas.height - 40, 25, 25);
        restart.createStroke();
        const restartImg = document.getElementById("restart");
        ctx.drawImage(restartImg, canvas.width / 2 - 25 - 20 + 2.5, canvas.height - 40 + 2.5, canvas.width / 20, canvas.height / 20);

        // home icon
        const home = new Icon(canvas.width / 2 + 20, canvas.height - 40, 25, 25);
        home.createStroke();
        const homeImg = document.getElementById('home');
        ctx.drawImage(homeImg, canvas.width / 2 + 20 + 2.5, canvas.height - 40 + 2.5, canvas.width / 20, canvas.height / 20);

    }


    // squares of the center
    const drawSquares = () => {
        ctx.fillStyle = skyBlue;
        for (let i = 0; i < 13; i++) {
            ctx.fillRect(canvas.width / 2 - 7.5, canvas.width * i / 13 + 10, 15, 15)
        }
    }

    // Creating player class
    class Player extends Rectangle {
        constructor(color, x, y, width, height, player) {
            super(color, x, y, width, height);
            this.player = player;
            this.dy = 0;
        }

        stop() {
            this.dy = 0;
        }

        moveUp() {
            this.dy = -4;
        }

        moveDown() {
            this.dy = 4;
        }

        newPos() {
            this.y += this.dy;
            detectWalls(this)
        }
    }

    //Instancing pvp players
    const player1 = new Player(skyBlue, canvas.width * 1 / 20, canvas.height / 2 - canvas.height * 1 / 4 / 2, canvas.width / 25, 100, 'player1');
    const player2 = new Player(skyBlue, canvas.width * 18 / 20, canvas.height / 2 - canvas.height * 1 / 4 / 2, canvas.width / 25, 100, 'player2');


    const update = () => { // function to run every time
        clear();
        background();

        player1.stop();
        player2.stop();

        changeDy();
        player1.newPos();
        player2.newPos();

        player1.fill();
        player2.fill();

        createIcons();
        player1Text.fill();
        player2Text.fill();
        drawSquares();

        requestAnimationFrame(update);
    }

    // look if the key is pressed to change the dy
    const changeDy = () => {
        Object.keys(controller).forEach(key => {
            if (controller[key].pressed) {
                eval(controller[key].func);
            }
        })
    }

    // creating controller object
    const controller = {
        w: {
            pressed: false,
            func: 'player1.moveUp()'
        },
        s: {
            pressed: false,
            func: 'player1.moveDown()'
        },
        ArrowUp: {
            pressed: false,
            func: 'player2.moveUp()'
        },
        ArrowDown: {
            pressed: false,
            func: 'player2.moveDown()'
        }
    }

    // Creating detect walls function, to stop movement when player reach the top/bottom
    const detectWalls = (player) => {
        if (player.y <= 0) {
            player.y = 0;
        }
        if (player.y >= canvas.width - player.height) {
            player.y = canvas.width - player.height;
        }
    }


    // changing movement when key is down
    update();
    addEventListener('keydown', (e) => {
        if (controller[e.key]) {
            controller[e.key].pressed = true;
        }
    });
    addEventListener("keyup", (e) => {
        if (controller[e.key]) {
            controller[e.key].pressed = false;
        }
    });
}



// detecting when click the canvas 
const getMousePosition = (canvas, event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (isClicked(playerVsPlayer, x, y)) {
        initializePlayerVsPlayer()
    }
    if (isClicked(playerVsComputer, x, y)) {}
}

const isClicked = ({ x, y, width, height, active }, xClicked, yClicked) => {
    if (xClicked >= x && xClicked <= width + x && yClicked >= y && yClicked <= y + height && active === true)
        return true
}

canvas.addEventListener("click", (e) => {
    getMousePosition(canvas, e);
});


// })();