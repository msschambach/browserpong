class GameObject {
    constructor() {
        this.oberverHandlers = [];
    }

    subscribe(fn) {
        if (typeof fn == 'function') {
            this.oberverHandlers.push(fn);
        }
    }

    unsubscribe(fn) {
        if (typeof fn == 'function') {
            this.oberverHandlers = this.oberverHandlers.filter(
                function (item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            );
        }
    }

    updateObservers(scope) {
        this.oberverHandlers.forEach(fn => {
            fn(scope);
        });
    }
}

class Ball extends GameObject {
    constructor(canvas, context, xPosition, yPosition, speed) {
        super();
        this.canvas = canvas;
        this.context = context;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.radius = 10;
        this.strokeStyle = '#ffffff';
        this.fillStyle = '#ffffff';
        this.xDelta = speed;
        this.yDelta = speed;

        this.touchesLeftSideOfWindow = false;
        this.touchesRightSideOfWindow = false;

        this.touchesTopSideOfWindow = false;
        this.touchesBottomSideOfWindow = false;

    }

    reset() {
        this.xPosition = this.canvas.width / 2;
        this.yPosition = this.canvas.height / 2;
    }

    draw() {
        this.context.strokeStyle = this.strokeStyle;
        this.context.fillStyle = this.fillStyle;
        this.context.beginPath();
        this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fill();
    }

    move() {

        if (this.touchesTopSideOfWindow || this.touchesBottomSideOfWindow) {
            this.yDelta = -this.yDelta;
        }

        this.xPosition += this.xDelta;
        this.yPosition += this.yDelta;

        this.touchesLeftSideOfWindow = (this.xPosition < 0);
        this.touchesRightSideOfWindow = (this.xPosition > (this.canvas.width - 0));

        this.touchesTopSideOfWindow = (this.yPosition < this.radius);
        this.touchesBottomSideOfWindow = (this.yPosition > (this.canvas.height - this.radius));

        this.updateObservers(this);
    }

    touchesLeftSideOfWindowWithPaddle(paddle) {
        return (this.xPosition < (this.radius + paddle.width)) && (this.yPosition > paddle.yPosition && this.yPosition < (paddle.yPosition + paddle.height))
    }

    touchesRightSideOfWindowWithPaddle(paddle) {
        return (this.xPosition > (this.canvas.width - (this.radius + paddle.width))) && (this.yPosition > paddle.yPosition && this.yPosition < (paddle.yPosition + paddle.height))
    }

    animate() {
        this.move();
        this.draw();
    }
}

class Paddle extends GameObject {
    constructor(canvas, context, xPosition, yPosition, width, height) {
        super();
        this.canvas = canvas;
        this.context = context;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.strokeStyle = '#ffffff';
        this.fillStyle = '#ffffff';
        this.width = width;
        this.height = height;
    }


    draw() {
        this.context.strokeStyle = this.strokeStyle;
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.xPosition, this.yPosition, this.width, this.height);
    }

    move(cursorPosition = {}) {
        this.yPosition = (cursorPosition.y - (this.height / 2)) || this.yPosition;

        this.updateObservers(this);
    }


    animate() {
        this.move();
        this.draw();
    }
}