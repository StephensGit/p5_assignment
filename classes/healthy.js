//Healthy inherits all the properties from the super class 'molecules'
class Healthy extends Molecule
{
    constructor(_x,_y,_vx,_vy,_checked) {
       super(_x,_y,_vx,_vy);
    }

    display()
    {
        noStroke();
        fill("rgba(109, 197, 137, 0.5)");
        ellipseMode(CENTER);
        ellipse(this.location.x, this.location.y, p.circleRadius*2, p.circleRadius*2);
    }
}
