import { GameObject, Position } from './core';

export default class Paddle extends GameObject {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    xPosition: number;
    yPosition: number;
    strokeStyle: string;
    fillStyle: string;
    width: number;
    height: number;


    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        xPosition: number,
        yPosition: number,
        width: number,
        height: number
    ) {
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

    move(cursorPosition: Position = {}) {
        this.yPosition = (cursorPosition.y - (this.height / 2)) || this.yPosition;

        this.updateObservers(this);
    }


    animate() {
        this.move();
        this.draw();
    }
}