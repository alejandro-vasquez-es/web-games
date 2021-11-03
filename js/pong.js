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
let isPaused = false;

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
    constructor(color, text, x, y, score = '', player ='', fontSize = '20px',completeText = '', fontFamily = ' "VT323", consolas') {
        this.color = color;
        this.fontSize = fontSize;
        const font = this.fontSize + fontFamily;
        this.font = font;
        this.completeText = (text === 'Player 1') ? text + ': '+ score:
                             (text === 'Player 2') ? score + ' :' + text :
                             text;
        this.text = text
        this.x = x;
        this.y = y;
        this.score = score;
        this.player = player;
    }



    fill() {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        this.completeText = (this.player === '1') ? this.text + ': '+ this.score:
                    (this.player === '2') ? this.score + ' :' + this.text :
                    this.text;
        ctx.fillText(this.completeText, this.x, this.y)
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

class Icon {
    constructor(x, y, width, height, active = true, color = skyBlue, line = 2.5) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = active
        this.color = color;
        this.line = line;
    }

    createStroke() {
        ctx.strokeStyle = skyBlue;
        ctx.lineWidth = this.line
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// creating restart, pause and home buttons
const pause = new Icon(canvas.width / 2 - 25 / 2, canvas.height - 30 + 5, 20, 20) //, pauseDraw);
const restart = new Icon(canvas.width / 2 - 25 - 20, canvas.height - 30 + 5, 20, 20);
const home = new Icon(canvas.width / 2 + 20, canvas.height - 30 + 5, 20, 20);

const createIcons = (pauseB = true, restartB = true, homeB = true) => {
    //pause button
    const pauseDraw = () => {
        ctx.fillStyle = skyBlue;
        ctx.fillRect(pause.x + 3.33, pause.y + 2.5, 5, 15);
        ctx.fillRect(pause.x + 5 + 3.3 * 2, pause.y + 2.5, 5, 15);
    }
    if (pauseB) {
        pauseDraw();
        pause.createStroke();
    }

    // create restart button
    
    const restartImg = document.getElementById("restart");
    if( restartB ) {
        restart.createStroke();
        ctx.drawImage(restartImg, restart.x + 2.5, restart.y + 2.5, restart.width - 5, restart.height - 5);
    }

    // home icon
    const homeImg = document.getElementById('home');
    if( homeB ) {
        home.createStroke();
        ctx.drawImage(homeImg, home.x + 2.5, home.y + 2.5, home.width - 5, home.width - 5);
    }
}

const initializePlayerVsPlayer = () => {

    setTimeout(()=>{
        ball.x = Math.round((ball.x -30)/4) * 4 + 30;
        if (ball.dx > 0) {
            ball.dx = 4;
        }else{
            ball.dx = -4;
        }
        controller.w.func = 'player1.moveUp(-4)';
        controller.ArrowUp.func = 'player2.moveUp(-4)';
        controller.s.func = 'player1.moveDown(4)';
        controller.ArrowDown.func = 'player2.moveDown(4)';
    }, 5000);

    setTimeout(()=>{
        controller.w.func = 'player1.moveUp(-3)';
        controller.ArrowUp.func = 'player2.moveUp(-3)';
        controller.s.func = 'player1.moveDown(3)';
        controller.ArrowDown.func = 'player2.moveDown(3)';
    }, 10000);
    setTimeout(()=>{
        controller.w.func = 'player1.moveUp(-2)';
        controller.ArrowUp.func = 'player2.moveUp(-2)';
        controller.s.func = 'player1.moveDown(2)';
        controller.ArrowDown.func = 'player2.moveDown(2)';
    }, 15000);

    // creating text of players
    const player1Text = new Text(skyBlue, 'Player 1', canvas.width / 40, 20, 0, '1', '24px')
    const player2Text = new Text(skyBlue, 'Player 2', canvas.width - 'Player 2: 0'.length * 11, 20,0,'2', '24px')




    // squares of the center
    const drawSquares = () => {
        ctx.fillStyle = skyBlue;
        for (let i = 0; i < 11; i++) {
            ctx.fillRect(canvas.width / 2 - 7.5, canvas.width * i / 13 + 8 + 30, 15, 15)
        }

        // Creating demiliting border lines
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(canvas.width, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 30);
        ctx.lineTo(canvas.width, canvas.height - 30);
        ctx.stroke();
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

        moveUp(dy) {
            this.dy = dy;
        }

        moveDown(dy) {
            this.dy = dy;
        }

        newPos() {
            this.y += this.dy;
            detectWalls(this)
        }
    }

    //Instancing pvp players
    const player1 = new Player(skyBlue, canvas.width * 1 / 40, canvas.height / 2 - canvas.height /4 /2, canvas.width / 25, canvas.height / 6, 'player1'); //canvas.height / 2 - canvas.height * 1 / 4 / 2
    const player2 = new Player(skyBlue, canvas.width * 37 / 40, canvas.height / 2 - canvas.height /4 /2, canvas.width / 25, canvas.height / 6, 'player2');


    const drawingExtraStuff = () => {
        createIcons();
        player1Text.fill();
        player2Text.fill();
        drawSquares();
    }

    const update = () => { // function to run every time
        if (!isPaused) {
            clear();
            background();

            player1.stop();
            player2.stop();

            ball.fill()
            
            changeDy();
            player1.newPos();
            player2.newPos();

            player1.fill();
            player2.fill();
            
            drawingExtraStuff();
            requestAnimationFrame(update);
            ball.newPos();
        }
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
            func: 'player1.moveUp(-2)'
        },
        s: {
            pressed: false,
            func: 'player1.moveDown(2)'
        },
        ArrowUp: {
            pressed: false,
            func: 'player2.moveUp(-2)'
        },
        ArrowDown: {
            pressed: false,
            func: 'player2.moveDown(2)'
        }
    }
    // // helpers
    // Creating detect walls function, to stop movement when player reach the top/bottom
    const detectWalls = (rect) => {
        if (rect.y <= 30) {
            rect.y = 30;
        }
        if (rect.y >= canvas.width - rect.height - 30) {
            rect.y = canvas.width - rect.height - 30;
        }
    }
    
    const getRandomLoc = () =>{
        const locs = [210, 190];
        const getRandomNum = () => (Math.round(Math.random() *1));

        let x = (getRandomNum() === 0) ? locs[0] : locs[1];
        let y = (getRandomNum() === 0) ? locs[0] : locs[1];

        return [x,y];
    }

    const changeScore = (ballObj, {score: score1},{score: score2}) =>{
        if (ballObj.x > canvas.width / 2){
            score1++;
        }else{
            score2++;
        };
        let winObject = (score1 === 5) ? ({win: true, winner: 1}) : (score2 === 5) ? ({win: true, winner: 2}) : ({win: false, winner: undefined});
        return [score1, score2, winObject];
    }

    // ball
    class Ball extends Rectangle {
        constructor(x, y, dx, dy, { color = skyBlue, width = 20, height = 20 } = {}) {
            super(color, x, y, width, height)
            this.dx = dx;
            this.dy = dy;
        }

        detectWallsBall() {
            if (this.y <= 30 || this.y >= canvas.width - this.height - 30) {
                this.dy = this.dy * -1;
            }
        }

        detectOutside(newLoc = getRandomLoc()) {
            if (this.x >= 400 || this.x + this.width <= 0){
                const [score1, score2, {win, winner}] = changeScore(this, player1Text, player2Text);
                player1Text.score =  score1;
                player2Text.score =  score2;
                if(Math.abs(this.dx) === 2){
                    if(score1 === 2) this.dx *= 2;
                    if(score2 === 2) this.dx *= 2;
                }
                this.dx *= -1;
                this.dy = Math.round(Math.random() * 3 -2);
                this.x = newLoc[0];
                this.y = newLoc[1];
                if (win) {
                    winGame({winner, score1, score2})
                }
            } 
        }
            

        detectPlayers() {
            if ((player1.y - this.height < this.y && player1.height + player1.y > this.y) && // ball is between platform (y axis)
                (player1.x + player1.width === this.x)) { //x ball is smaller than x platform + width
                this.dx *= -1;
                const thirdPart = player1.height/ 3;
                if (player1.y - this.height < this.y && this.y < player1.y + thirdPart-this.height){
                    this.dy = -2
                    console.log('top')
                }else if(player1.y + thirdPart - this.height < this.y && this.y < player1.height / 2 + player1.y ){
                    this.dy = -0.7
                    console.log('mid top')
                }
                else if(this.y < player1.height / 2 + player1.y){
                }
            }

            if ((player2.y - this.height < this.y && player2.height + player2.y > this.y) &&
                (player2.x - this.width === this.x)) {
                this.dx *= -1
            }

        }

        newPos() {
            this.detectWallsBall();
            this.detectPlayers();
            this.detectOutside();
            this.x += this.dx;
            this.y += this.dy;
        }

    }

    // instancing ball
    const ball = new Ball(200, 40, 2, 1);


    // win the game
    const winGame =({winner, score1, score2})=>{
        clear();
        isPaused = true;
        background()
        const winText = new Text(skyBlue, `Player ${winner} has won :D`, canvas.width / 2  - `Player ${winner} has won :D`.length*4 , canvas.height / 3);// - `Player ${winner} has won :D`.length
        winText.fill();
        const resultsText = new Text(skyBlue, `Final score -> p1: ${score1} - ${score2}: p2`, canvas.width / 2  - `Final score -> p1: ${score1} - ${score2}: p2`.length*4 , canvas.height *2/3);// - `Player ${winner} has won :D`.length
        resultsText.fill();
        createIcons(false);
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
        initializePlayerVsPlayer();
    }
    if (isClicked(pause, x, y)) {
        isPaused = isPaused ? false : true;
    }
    if (isClicked(restart, x, y)) {
        isPaused = false;
        initializePlayerVsPlayer();
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