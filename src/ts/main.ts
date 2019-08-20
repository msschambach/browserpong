import Paddle from './components/Paddle';
import Ball from './components/Ball';

let canvas: HTMLCanvasElement;
let canvasContext: CanvasRenderingContext2D;
let PongBall: Ball;
let LeftPaddle: Paddle;
let RightPaddle: Paddle;

const PADDLE_HEIGHT: number = 100;
const PADDLE_THICKNESS: number = 10;
const FRAMES_PER_SECOND = 60;

let humanPlayerScore: number = 0;
let aiPlayerScore: number = 0;


function fillRectangle(left: number, top: number, width: number, height: number, style: string) {
    canvasContext.strokeStyle = style;
    canvasContext.fillStyle = style;
    canvasContext.fillRect(left, top, width, height);
}


function locateCursor(event) {
    let canvasRect = canvas.getBoundingClientRect();
    let rootElement = document.documentElement;

    let mouseX = event.clientX - canvasRect.left - rootElement.scrollLeft;
    let mouseY = event.clientY - canvasRect.top - rootElement.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}


function draw() {
    // Make the canvas background black
    fillRectangle(0, 0, canvas.width, canvas.height, '#000000');

    // Animate the left paddle
    LeftPaddle.animate();

    // Animate the right paddle
    RightPaddle.animate();

    // Animate the ball
    PongBall.animate();

    // Write Scores
    canvasContext.font = "30px Barriecito";
    canvasContext.fillText(String(humanPlayerScore), 100, 100);
    canvasContext.fillText(String(aiPlayerScore), canvas.width - 100, 100);
    PongBall.debugInfo(canvasContext);
}


window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    PongBall = new Ball(canvas, canvasContext, 20, 20, 8);
    LeftPaddle = new Paddle(canvas, canvasContext, 0, 250, PADDLE_THICKNESS, PADDLE_HEIGHT);
    RightPaddle = new Paddle(canvas, canvasContext, canvas.width - PADDLE_THICKNESS, 250, PADDLE_THICKNESS, PADDLE_HEIGHT);

    function ballObserver(ball) {
        if (ball.touchesLeftSideOfWindowWithPaddle(LeftPaddle)) {
            ball.xDelta = -ball.xDelta;
            ball.yDelta = (ball.yPosition - (LeftPaddle.yPosition + LeftPaddle.height / 2)) * 0.35;
        } else if (ball.touchesRightSideOfWindowWithPaddle(RightPaddle)) {
            ball.xDelta = -ball.xDelta;
            ball.yDelta = (ball.yPosition - (RightPaddle.yPosition + RightPaddle.height / 2)) * 0.35;
        } else if (ball.touchesLeftSideOfWindow) {
            ball.reset();
            aiPlayerScore++;
        } else if (ball.touchesRightSideOfWindow) {
            ball.reset();
            humanPlayerScore++;
        }
    }

    function rightPaddleController(ball) {
        let rightPaddleCenter = (RightPaddle.yPosition + (RightPaddle.height / 2));


        let paddleShift = 0;

        if (ball.yDelta > 5 || ball.yDelta < -5) {
            /* If ball is going up or down with a 
            speed of around 5 units and above */
            paddleShift = 17;
        } else if (ball.yDelta <= 5 || ball.yDelta >= -5) {
            /* If ball is going up or down with a 
            speed of less than 5 units */
            paddleShift = 5;
        } else if (ball.yDelta < 1) {
            paddleShift = ball.yDelta * 10;
        } else {
            paddleShift = ball.yDelta;
        }


        if ((rightPaddleCenter < ball.yPosition) && (ball.yDelta > 2 || ball.yDelta < -2)) {
            RightPaddle.yPosition += paddleShift;
        }

        if ((rightPaddleCenter > ball.yPosition) && (ball.yDelta > 2 || ball.yDelta < -2)) {
            RightPaddle.yPosition -= paddleShift;
        }

    }

    PongBall.subscribe(ballObserver);
    PongBall.subscribe(rightPaddleController);

    canvas.addEventListener('mousemove', (event) => {
        LeftPaddle.move(locateCursor(event));
    });

    setInterval(draw, 1000 / FRAMES_PER_SECOND);
}