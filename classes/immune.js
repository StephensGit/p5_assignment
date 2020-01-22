//Immune inherits all the properties from the super class 'molecules'
class Immune extends Molecule
{
     constructor(_x,_y,_vx,_vy,_checked)
    {
        super(_x,_y,_vx,_vy);
    }


    display()
    {
        stroke(255);
        strokeWeight(3);

        fill("rgba(89, 197, 225, 0.5)");

        ellipseMode(CENTER);


        ellipse(this.location.x, this.location.y, p.circleRadius*2, p.circleRadius*2);
        noFill();
        stroke(this.RColor);
        strokeWeight(1);
    }

}
