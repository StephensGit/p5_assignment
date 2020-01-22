//Creating an array molecules to store all the molecule objects
let molecules = [];
//create a new variable object and assign it p
let p = new Variables();
//These variables are used in creating the pulsating circle around the infected molecule
let counter = 0;
let counterMax = 60;
let counterDirection = true;

function setup() {
    let sketch = createCanvas(1110, 500);
    sketch.parent('canvasHolder');

    var gui = new dat.GUI();

    var f1 = gui.addFolder('Draw Controls');
        f1.add(p, 'circleRadius', 5, 15).step(1);

    var f2 = gui.addFolder('Update Controls');
        f2.add(p, 'numHealthy', 0, 20).step(1);
        f2.add(p, 'numInfectors', 0, 20).step(1);
        f2.add(p, 'numImmune', 0, 10).step(1);
        f2.add(p, 'update');

    makeMolecules();

}
//This function contains three for loops that are create all the objects(molecules) when the page loads
//and everytime the makeMolecules method is called
function  makeMolecules() {
    // create the array again here so it is refreshed everytime the update button is pressed
    molecules = [];
    for(let i = 0; i < p.numInfectors; i++) {
      molecules.push(new Infector());
    }
    for(let i = 0; i < p.numHealthy; i++) {
      molecules.push(new Healthy());
    }
    for(let i = 0; i < p.numImmune; i++)  {
      molecules.push(new Immune());
    }
}

//function that loops throught the molecules array to check if the mouse x & y value are within the infected
//circles co-ordinates
//If
function mousePressed() {
    for(let i = 0; i < molecules.length; i++){
      //the mouse x&y values are passed in to the the clicked method
      //if true the molecule that is selected is removed from the array(canvas) using splice
      if(molecules[i].clicked(mouseX,mouseY)) {
        molecules.splice(i,1);
        console.log("CLICKED");
      }
    }
  }

//makeMolecules function needs to be called everytime on the update to
//check if the draw controls have been updated and to create the objects when the page loads
function update() {
    makeMolecules();
}

//Draw method draws contains all the code to draw everyhting onto the canvas
function draw() {
    background("rgb(254,212,214)");

    //nested loop used here to run through the molecules array and to check every objects x&y values
    //against each other
    for(let i = 0; i < molecules.length; i++){
    //this loop starts at i+1 as not to check the same object against itself
    for(let j = i+1; j < molecules.length; j++){
      //ax and ay stores the x&y values for their locations from each iteration of the loop
      let ax = molecules[i].location.x;
      let ay = molecules[i].location.y;
      //ax and ay stores the x&y values for their locations from each iteration of the loop
      let bx = molecules[j].location.x;
      let by = molecules[j].location.y;
      //stores the diamter of the ellipse
      let dia = p.circleRadius*2;
      //collidesCircleCircle function returns true or false if two objects x,y co-ordinates are intersecting
      if(collideCircleCircle(ax, ay, dia, bx, by, dia)){
          //atan2 calculates the angle form a specified point to the co-ordinate origin as measured
          let angleI = Math.atan2(-molecules[i].velocity.x,-molecules[i].velocity.y)* 180 / Math.PI;
          let angleJ = Math.atan2(-molecules[j].velocity.x,-molecules[j].velocity.y)* 180 / Math.PI;
          //the dist function in p5 calculates the distance between two points
          //in this case it's checking the distance between each of the circles as it iterates through the loop
          let dx = ax-bx;
          let dy = ay-by;
          let dist = Math.sqrt(dx*dx + dy*dy);
          //if statement runs if distance is less than diamter by 2
          if(dist < p.circleRadius*2 - 2){

            let gap = (p.circleRadius*2)-dist;

            molecules[i].location.x += (gap/2)*(Math.cos(angleI))
            molecules[i].location.y += (gap/2)*(Math.sin(angleI))
            molecules[j].location.x += (gap/2)*(Math.cos(angleJ))
            molecules[j].location.y += (gap/2)*(Math.sin(angleJ))
          }

          let normalX = dx/dist;
          let normalY = dy/dist;

          // let midpointX = (ax+bx)/2;
          // let midpointY = (ay+by)/2;

          let dVector = (molecules[i].velocity.x - molecules[j].velocity.x)*normalX;
              dVector += (molecules[i].velocity.y - molecules[j].velocity.y)*normalY;

          let dvx = dVector * normalX;
          let dvy = dVector * normalY;

          molecules[i].velocity.x -= dvx;
          molecules[i].velocity.y -= dvy;

          molecules[j].velocity.x += dvx;
          molecules[j].velocity.y += dvy;

          //create a random value between 0&1 and store it in num
          let num = random(1);
          // console.log(num);
          //if num value is less than the probability rate the if statement continues
          if(num < p.infProb) {
          //if statements to check if two molecules intersecting are healthy and infectors
          //this code creates a new object if the above if statement results to true,
          //meaning it will create a new molecule object
          //this basically switches a healthy object out of the array with the new infected object Created
          //It appears in the old position of the healthy molecule as to appear it's infected it
          if (molecules[i].constructor.name == "Healthy" && molecules[j].constructor.name == "Infector") {
            //creates a new object
            let tempObj = new Infector(molecules[i].location.x, molecules[i].location.y, molecules[i].velocity.x, molecules[i].velocity.y)
            molecules.splice(i, 1, tempObj);
          }

          if (molecules[j].constructor.name == "Healthy" && molecules[i].constructor.name == "Infector") {
            let tempObj = new Infector(molecules[j].location.x, molecules[j].location.y, molecules[j].velocity.x, molecules[j].velocity.y)
            molecules.splice(j, 1, tempObj);
          }
        }
      }
    }
   }
    //all these methods get run for every iteration of the loop
    for(let i = 0; i < molecules.length; i++){
       molecules[i].display();
       molecules[i].update();
       molecules[i].checkEdges();
   }
   //earlier a counter variable was assigned to 0 and a counter max was assigned to 60
   //this is what allows the ellipse on the infected molecule to pulsate
    if(counter < counterMax && counterDirection == true) {
     counter++;
    if(counter > counterMax){
     counterDirection = false;
     }
   }
   else {
     counterDirection = false;
     counter--;
   if (counter == 0) {
       counterDirection=true;
     }
   }

    //END DRAW
  }
