var sliderH1;
var sliderH2;
var sliderM1;
var sliderM2;
var btnStart;
var schuhkartons = [];
var Nägel = [];
var divM;
var divH;
var div1;
var div2;
function setup() {
  frameRate(60);
  createCanvas(500,500);
  
  sliderH1 = createSlider(200,height);
  sliderH1.position(0,500);
  sliderH2 = createSlider(200,height);
  sliderH2.position(150, 500)
  sliderM1 = createSlider(10,100);
  sliderM1.position(0, 525);
  sliderM2 = createSlider(10,100);
  sliderM2.position(150, 525);
  btnStart = createButton("Start");
  btnStart.position(400, 500);
  
  btnStart.mouseReleased(function(){
    schuhkartons = [];
    Nägel = [];
    schuhkartons.push(new schuhkarton(100, height - sliderH1.value(), 50, sliderM1.value()));
    schuhkartons.push(new schuhkarton(350, height - sliderH2.value(), 50, sliderM2.value()));
    Nägel.push(new nagel(110, height - 150));
    Nägel.push(new nagel(360, height - 150));
  });
  
  divH = createDiv("Höhe");
  divH.position(300, 500);
  divH.size(100,50);
  divM = createDiv("Gewicht");
  divM.position(300, 525);
  divM.size(100,50);
  div1 = createDiv("");
  div1.position(0, 550);
  div2 = createDiv("");
  div2.position(150, 550);
  
}
function draw() {
  
  background(0);
  if(schuhkartons.length == 0){
    fill("red")
    rect(0, height,100, - map(sliderH1.value() * sliderM1.value(), 2000, 50000, 0, 500));
    div1.html((sliderH1.value() * sliderM1.value())/500+ "%");
    rect(width- 200, height, 100, - map(sliderH2.value() * sliderM2.value(), 2000 , 50000, 0, 500));
    div2.html((sliderH2.value() * sliderM2.value())/500+"%");
  }
  
  fill("yellow");
  if(schuhkartons.length != 0){
  rect(0, height-100, width, 100);
  }
  
  fill("red");
  for(var i = 0; i < schuhkartons.length; i++){
    schuhkartons[i].cycle();
  }
  
  fill("green");
  for(var i = 0; i < Nägel.length; i++){
    Nägel[i].cycle();
  }
  
}
function nagel(x,y){
  this.x = x;
  this.y = y;
  this.connection = null;
  this.v = 0;
  this.f = 0;
  
  this.cycle = function(){
    if(this.connection != null){
      if(this.f >= 0){
      this.v = map(this.f, 0 , 5000, 0, 4/5);
      this.y += this.v;
      this.f -= 3000/2;
      }
      this.connection.y = this.y - 50;
    }
    rect(this.x, this.y, 30, 100);
  }
  
}
function schuhkarton(x,y,l,m){
  this.x = x;
  this.y = y;
  this.l = l;
  this.f = (height - y )*m;
  this.m = m;
  this.v = 0;
  this.a = 1;
  this.connected = false;
  
  this.cycle = function(){
    if(!this.connected){
      if(this.y +  this.v +this.a >= height - 200){
        this.y = height - 200;
        this.a = 0;
        this.v = 0;
        this.connected = true;
        if(this.x == 100){
          Nägel[0].connection = this;
          Nägel[0].f = this.f;
        }
        else{
          Nägel[1].connection = this;
          Nägel[1].f = this.f;
        }
      }
      else{
        this.v += this.a;
        this.y += this.v;
      }
    }
    rect(this.x, this.y, this.l, this.l);
  }
  
}