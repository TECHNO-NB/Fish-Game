const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
ctx.font = "50px Georgia";

var score = 0;
var gameFrame = 0;

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener("mousedown", function (e) {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("touch", function (e) {
  mouse.click = true;
  mouse.x = e.touches[0].clientX - canvasPosition.left;
  mouse.y = e.touches[0].clientY - canvasPosition.top;
});


canvas.addEventListener("mouseup", function (e) {
  mouse.click = false;
});

class Fish {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx / 15;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 15;
    }
  }

  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(this.x, this.y, this.radius, 10);
  }
}

const bubbleArray=[];
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
  }

  update() {
    this.y -= this.speed;
    const dx=this.x - player.x;
    const dy=this.y - player.y
    this.distance=Math.sqrt(dx * dx + dy * dy)
   
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText("Score:"+score, 5, 50);
    ctx.closePath();
    ctx.stroke();
  }
}

let player = new Fish();
const bubble = new Bubble();

function handdleBubble() {
 if(gameFrame % 50 == 0){
    bubbleArray.push(new Bubble());
    
}
for(let i=0;i < bubbleArray.length;i++){
  bubbleArray[i].update();
  bubbleArray[i].draw();


}

for(let i=0; i < bubbleArray.length; i++){
    if(bubbleArray[i].y < 0){
        bubbleArray.splice(i,1)
      }
      if(bubbleArray[i].distance < bubbleArray[i].radius + player.radius){
        if(!bubbleArray[i].counted){
            score++;
            bubbleArray[i].counted=true;
            bubbleArray.splice(i,1)
        }
      }

}
 
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();
  handdleBubble();
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
