/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Bubble from '../sprites/Bubble'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
//    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack')
//    banner.font = 'Nunito'
//    banner.fontSize = 40
//    banner.fill = '#77BFA3'
//    banner.anchor.setTo(0.5)
//
//    this.mushroom = new Mushroom({
//      game: this.game,
//      x: this.game.world.centerX,
//      y: this.game.world.centerY,
//      asset: 'mushroom'
//    })

    // set the sprite width to 30% of the game width
    //setResponsiveWidth(this.mushroom, 30, this.game.world)
//    this.game.add.existing(this.mushroom)

      var bubbleRadius = 32;
      var grid = {width: 20, height: 15};
      var leftBound = 50;
      var rightBound = leftBound + grid.width * bubbleRadius;
      this.leftLine = new Phaser.Line(leftBound,0,leftBound,this.game.world.height);
      this.rightLine = new Phaser.Line(rightBound,0,rightBound,this.game.world.height);
      this.bottomLine = new Phaser.Line(leftBound,this.game.world.height - 2* bubbleRadius,rightBound,this.game.world.height - 2* bubbleRadius);
      this.centerLine = new Phaser.Line(leftBound +  (rightBound - leftBound)/2, this.game.world.height - 2* bubbleRadius, leftBound +  (rightBound - leftBound)/2, this.game.world.height);
      this.collisionLines = [];
      
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bubble = new Bubble({game: this.game, x :this.centerLine.start.x, y:this.centerLine.start.y+bubbleRadius/2, asset:'bluebubble'});
      this.game.add.existing(this.bubble);
      this.game.physics.arcade.enable(this.bubble);
      this.bubble.body.velocity = new Phaser.Point(0,0);
      //this.bubble.body.velocity = new Phaser.Point(0,-10);
      this.bubbleGrid = [];
      //for(i = 0;i < grid.width;i++){
      //    bubbleGrid[]
      //}
      

  }
  update (){
      if(this.game.input.activePointer.leftButton.isDown){
          if(this.bubble.shot === false){
              this.bubble.shot = true;
              var shotVelocity = new Phaser.Point(0,0);
              this.game.input.activePointer.position.copyTo(shotVelocity);
              shotVelocity.subtract(this.bubble.x,this.bubble.y);
              shotVelocity.normalize();
              shotVelocity.setMagnitude(500);
              this.bubble.body.velocity = shotVelocity;
          }
      }

      if(this.bubble.body.x >= this.rightLine.start.x-32){
          this.bubble.body.velocity.x = -this.bubble.body.velocity.x;
      }

      if(this.bubble.body.x <= this.leftLine.start.x){
          this.bubble.body.velocity.x = -this.bubble.body.velocity.x;
      }

      
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
      
      this.game.debug.geom(this.leftLine,"#000000");
      this.game.debug.geom(this.bottomLine,"#000000");
      this.game.debug.geom(this.rightLine,"#000000");
      this.game.debug.geom(this.centerLine,"#000000");
    }
  }
}
