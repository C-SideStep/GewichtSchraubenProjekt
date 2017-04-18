var d2Theta1;
var d2Theta2;
var dTheta1;
var dTheta2;
var Theta1;
var Theta2;
var m1;
var m2;
var l1;
var l2;
var X0;
var Y0;
var g;
var time;
var myLine1;
var myLine2;
var myCircle1;
var myCircle2;
function setup() {
d2Theta1 = 0;
d2Theta2 = 0;
dTheta1 = 0;
dTheta2 = 0;
Theta1 = 0;
Theta2 = 2.3*PI*0.5;
m1 = 10;
m2 = 20;
l1 = 150;
l2 = 150;
X0 = 350;
Y0 = 60;
g = 9.8;
time = 0.05;
myLine1 = {x0 : X0, y0 : Y0, x : 0, y : 0};
myLine2 = {x0: 0, y0: 0, x: 0, y: 0};
myCircle1 = {x: X0+l1*sin(Theta1), y: Y0+l1*cos(Theta1), mass: m1};
myCircle2 = {x: X0+l1*sin(Theta1)+l2*Math.sin(Theta2), y: Y0+l1*cos(Theta1)+l2*cos(Theta2), mass: m2};
createCanvas(1000, 1000);
}
function draw() {
  background(0)
  mu      =  1+m1/m2;
  d2Theta1  =  (g*(sin(Theta2)*cos(Theta1-Theta2)-mu*sin(Theta1))-(l2*dTheta2*dTheta2+l1*dTheta1*dTheta1*cos(Theta1-Theta2))*sin(Theta1-Theta2))/(l1*(mu-cos(Theta1-Theta2)*cos(Theta1-Theta2)));
  d2Theta2  =  (mu*g*(sin(Theta1)*cos(Theta1-Theta2)-sin(Theta2))+(mu*l1*dTheta1*dTheta1+l2*dTheta2*dTheta2*cos(Theta1-Theta2))*sin(Theta1-Theta2))/(l2*(mu-cos(Theta1-Theta2)*cos(Theta1-Theta2)));
  dTheta1   += d2Theta1*time;
  dTheta2   += d2Theta2*time;
  Theta1    += dTheta1*time;
  Theta2    += dTheta2*time;

  myCircle1.x = X0+l1*sin(Theta1);
  myCircle1.y = Y0+l1*cos(Theta1);
  myCircle2.x = X0+l1*sin(Theta1)+l2*sin(Theta2);
  myCircle2.y = Y0+l1*cos(Theta1)+l2*cos(Theta2);

  myLine1.x  = myCircle1.x;
  myLine1.y  = myCircle1.y;
  myLine2.x0 = myCircle1.x;
  myLine2.y0 = myCircle1.y;
  myLine2.x  = myCircle2.x;
  myLine2.y  = myCircle2.y;
  
  ellipse(myCircle1.x, myCircle1.y, m1, m1);
  ellipse(myCircle2.x, myCircle2.y, m2, m2);
  stroke(255);
  line(myLine1.x0, myLine1.y0, myLine1.x ,myLine1.y);
  line(myLine2.x0, myLine2.y0, myLine2.x ,myLine2.y);
}