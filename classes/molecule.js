//Molecule is a super class. Allll the other classes will inherit it's properties
class Molecule  {
        constructor (
          //returns a random value between the resulted sums below
          _x = random(0 + p.circleRadius * 4, width - p.circleRadius * 4)
          , _y = random(0,height)
          //returns a random number between -.4 & .4
          , _vx = random(-.4,.4)
          , _vy = random(.4, -.4)
          , _checked = false
        )

        {
          this.location = createVector(_x, _y);
          this.velocity = createVector(_vx, _vy);
          this.acceleration = createVector();
          this.RColor = color(255,255,255,50);
          // this.checked = _checked;
          // this.count = 0;
        }

        //The methods inside update get run everytime the update method id called
        //This results in objects moving across the canvas
        update()  {
          this.velocity.add(this.acceleration);
          this.velocity.limit(10);
          this.location.add(this.velocity);
          this.acceleration.mult(0);
        }

        //Function to check if the molecules are touching the wall
        //Send them in the opposit direction if so
        checkEdges()  {
          if (this.location.x > (width - p.circleRadius) || this.location.x < p.circleRadius) {
                    this.velocity.x = this.velocity.x * -1;
            }
          if (this.location.y > (height - p.circleRadius) || this.location.y < p.circleRadius)  {
                    this.velocity.y = this.velocity.y * -1;
            }
          }
  }
