//The variables class is created for simplicity in changing these variables that are used frequently
//Saves having to go into each individual file
class Variables
{
    constructor()
    {
        this.circleRadius = 7;
        this.numHealthy = 10;
        this.numInfectors = 15;
        this.numImmune = 5;
        //infection probability
        this.infProb = .4;
    }

    update()
    {
        makeMolecules();
    }
}
