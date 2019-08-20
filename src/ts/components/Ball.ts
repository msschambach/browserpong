import { GameObject } from './core';

export default class Ball extends GameObject {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    xPosition: number;
    yPosition: number;
    radius: number;
    strokeStyle: string;
    fillStyle: string;
    xDelta: number;
    yDelta: number;
    touchesLeftSideOfWindow: boolean;
    touchesRightSideOfWindow: boolean;
    touchesTopSideOfWindow: boolean;
    touchesBottomSideOfWindow: boolean;


    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        xPosition: number,
        yPosition: number,
        speed: number
    ) {
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
        this.yDelta = 0;
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

    debugInfo(context: CanvasRenderingContext2D) {
        const TEXT_X_POSITION = (context.canvas.width / 2) - 50;
        const TEXT_Y_START_POSITION = context.canvas.height - 100;
        context.font = "10px Helvetica";
        context.fillText(`Ball xPos: ${this.xPosition}`, TEXT_X_POSITION, TEXT_Y_START_POSITION);
        context.fillText(`Ball yPos: ${this.yPosition}`, TEXT_X_POSITION, TEXT_Y_START_POSITION + 15);
        context.fillText(`Ball xDelta: ${this.xDelta}`, TEXT_X_POSITION, TEXT_Y_START_POSITION + 30);
        context.fillText(`Ball yDelta: ${this.yDelta}`, TEXT_X_POSITION, TEXT_Y_START_POSITION + 45);
    }
}
