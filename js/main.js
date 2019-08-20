let canvas;
let canvasContext;
let PongBall;
let LeftPaddle;
let RightPaddle;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

let player1Score = 0;
let player2Score = 0;


function fillRectangle(left, top, width, height, style) {
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
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
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
            player2Score++;
        } else if (ball.touchesRightSideOfWindow) {
            ball.reset();
            player1Score++;
        }
    }

    function rightPaddleController(ball) {
        let rightPaddleCenter = (RightPaddle.yPosition + (RightPaddle.height / 2));


        let paddleShift = 0;

        if (ball.yDelta > 5 || ball.yDelta < -5) {
            /* If ball is going up or down with a 
            speed of around 5 units */
            paddleShift = 17;
        } else if (ball.yDelta <= 5 || ball.yDelta > -5) {
            /* If ball is going up or down with a 
            speed of less than 5 units */
            paddleShift = 3;
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

    const FRAMES_PER_SECOND = 30;
    setInterval(draw, 1000 / FRAMES_PER_SECOND);

    canvas.addEventListener('mousemove', (event) => {
        LeftPaddle.move(locateCursor(event));
    });
}