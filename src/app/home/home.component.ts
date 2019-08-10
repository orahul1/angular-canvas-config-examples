import { Circle } from './../drawCircle';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;  /* canvas element ref */
  private c: CanvasRenderingContext2D;
  circleArray = [];


  constructor(private el: ElementRef) { }

  ngOnInit() {
    /* blurred because the canvas virtual size is zoomed to its HTML element actual size.
       to overcome we need to adjust canvas virtual size */
    let canvasRef = this.el.nativeElement.querySelector('canvas');
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight;

    /* returning a drawing context => returning  functions and properties to c(context) */
    this.c = this.canvas.nativeElement.getContext("2d");
    /* random circle */
    for (let index = 0; index < 200; index++) {
      let radius = 10;
      let x = Math.random() * (innerWidth - radius * 2) + radius; // initial position of x [avoid new spawn circle hitting side of the screen]
      let y = Math.random() * (innerHeight - radius *2) + radius; // initial postion of y
      let dx = (Math.random() - 0.5 + 2) * 2; // velocity of x (dx can be -ve or +ve => Math.random gives 1-0.5 so subtracting 0.5 will give random -ve or +ve)
      let dy = (Math.random() - 0.5 + 2) * 2; // velocity of y [multi 3 because its fucking slow]
      this.circleArray.push(new Circle(this.c,x,y,radius,dx,dy));
    }
    this.animate();
    // this.drawSquare();
  }


  // drawSquare(){
  //   /* create square fillRect(x,y,width, height) */
  //   this.c.fillStyle = '#ff3334';
  //   this.c.fillRect(100, 100, 150, 150);
  //   this.c.fillStyle = '#f55334';
  //   this.c.fillRect(400, 300, 150, 150);
  //   this.c.fillStyle = '#f11334';
  //   this.c.fillRect(800, 100, 150, 150);
  //   this.drawLine();  
  // }

  // drawLine(){
  //   this.c.beginPath(); /* starting a path */
  //   this.c.moveTo(50, 300); /* position of path MoveTo(x,y) */
  //   this.c.lineTo(800, 150); /* create a line to new point */
  //   this.c.lineTo(900, 150); /* create a line to new point */
  //   this.c.lineTo(1000, 100); /* create a line to new point */
  //   this.c.strokeStyle = 'orange';
  //   this.c.stroke();
  //   this.c.closePath();
  //   this.drawCircle();
  // }

  // drawCircle(){
  //   /* Arc / Circle */
  //   this.c.beginPath(); /* If not => last line will connect to circle */
  //   this.c.arc(200,300,60,0,Math.PI * 2,false);
  //   this.c.strokeStyle = 'blue';
  //   this.c.fillStyle = 'blue';
  //   this.c.fill();
  //   this.c.stroke();
  //   this.c.closePath();
  //   this.randomCircles();
  // }

  // randomCircles(){
  //   let colors = ['red', 'green', 'yellow', 'blue', 'orange']
  //   for (let i = 0; i < 50; i++) {
  //     this.c.beginPath();
  //     let x = Math.random() * window.innerHeight; /* to place circel inside the canvas */
  //     let y = Math.random() * window.innerWidth; /* to place circel inside the canvas */
  //     this.c.arc(x,y,10,0, Math.PI * 2 , false);
  //     let randomColor = Math.floor(Math.random() * colors.length);
  //     this.c.strokeStyle = colors[randomColor]; /* outline color */
  //     this.c.fillStyle = colors[randomColor];
  //     this.c.fill(); /* fill colors */
  //     this.c.stroke();
  //     this.c.closePath();
  //     this.animate();
  //   }
  // }


 /* single Circle animation */

  // this.c.beginPath();
  // this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  // this.c.strokeStyle = 'blue';
  // this.c.fillStyle = 'blue';
  // this.c.fill();
  // this.c.stroke();

    /* animation */
  animate() {
    /* create loop */
  requestAnimationFrame(() => this.animate());
  this.c.clearRect(0, 0, innerWidth, innerHeight);
  for (let index = 0; index < this.circleArray.length; index++) {
       this.circleArray[index].update(index);
    }
  }
}




