/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Bubble from '../sprites/Bubble'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
      //These bounds probably need something more intelligent. These are just some made up values
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      var bubbleRadius = 32;
      var grid = {width: 20, height: 15};
      var leftBound = 50;
      var rightBound = leftBound + grid.width * bubbleRadius;

      //DEBUG lines
      this.leftLine = new Phaser.Line(leftBound,0,leftBound,this.game.world.height);
      this.rightLine = new Phaser.Line(rightBound,0,rightBound,this.game.world.height);
      this.bottomLine = new Phaser.Line(leftBound,this.game.world.height - 2* bubbleRadius,rightBound,this.game.world.height - 2* bubbleRadius);
      this.centerLine = new Phaser.Line(leftBound +  (rightBound - leftBound)/2, this.game.world.height - 2* bubbleRadius, leftBound +  (rightBound - leftBound)/2, this.game.world.height);
      
      //Creating one bubble to test shooting
      this.bubble = new Bubble({game: this.game,
        x :this.centerLine.start.x,
        y:this.centerLine.start.y+bubbleRadius/2,
        asset:'bluebubble',
        rightBound: rightBound,
        leftBound: leftBound});
      this.game.add.existing(this.bubble);
      


      

  }
  update (){
      if(this.game.input.activePointer.leftButton.isDown){
          this.bubble.shoot();
      }
  }

  render () {
    if (__DEV__) {
      
      this.game.debug.geom(this.leftLine,"#000000");
      this.game.debug.geom(this.bottomLine,"#000000");
      this.game.debug.geom(this.rightLine,"#000000");
      this.game.debug.geom(this.centerLine,"#000000");
    }
  }
}
