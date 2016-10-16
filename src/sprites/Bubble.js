import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, rightBound, leftBound}) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.shot = false;
    this.game.physics.arcade.enable(this);
    this.body.setCircle(16,16,16);
    //Maybe something more intelligent needed with these values, for example when we have a grid object we can give it or something.
    this.rightBound = rightBound;
    this.leftBound = leftBound;
    
  }

  update () {
        //Keep the bubble bounded
        if(this.body.right >= this.rightBound){
            this.body.velocity.x = -this.body.velocity.x;
        }

        if(this.body.left <= this.leftBound){
            this.body.velocity.x = -this.body.velocity.x;
        }
  }

  shoot() {
      if(this.shot === false){
              this.shot = true;
              //Get the current position of mouse and subtract the current position of the ball, you'll have the direction for the shot.
              //Normalization is needed to ensure that the speed is constant.
              var shotVelocity = new Phaser.Point(0,0);
              this.game.input.activePointer.position.copyTo(shotVelocity);
              shotVelocity.subtract(this.body.center.x,this.body.center.y);
              shotVelocity.normalize();
              shotVelocity.setMagnitude(500);
              this.body.velocity = shotVelocity;
      }
  }

}
