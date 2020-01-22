//Infector inherits all the properties from the super class 'molecules'
class Infector extends Molecule
{
    constructor(_x,_y,_vx,_vy,_checked)
    {
        super(_x,_y,_vx,_vy);
    }


    display()
    {
        //inner circle for infected molecule
        noStroke();
        fill("rgba(238, 63, 68, 1)");
        ellipseMode(CENTER);
        ellipse(this.location.x, this.location.y, p.circleRadius*2, p.circleRadius*2);
        //outer circle for infected molecule that's pulsates
        noFill();
        stroke(255,255,255);
        strokeWeight(2);
        drawingContext.setLineDash([4,6]);
        let extrarad = map(counter, 0, 60,0,40);
        ellipse(this.location.x,this.location.y, (p.circleRadius*2) + extrarad, (p.circleRadius*2) + extrarad);
        drawingContext.setLineDash([]);

    }
    //clicked function returns true or false
    //it's used to determine if the mouseX and mouseY values are within an infected molecule
    clicked(x,y) {
      var d = dist(this.location.x, this.location.y, x, y);
        if (d < p.circleRadius )  {
          return true;
        }
        else {
          {
            return false;
          }
        }
    }

}
