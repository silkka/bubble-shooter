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
      this.bubbleRadius = 32;
      this.grid = {width: 20, height: 15};
      this.leftBound = 50;
      this.rightBound = this.leftBound + this.grid.width * this.bubbleRadius;

      //DEBUG lines
      this.leftLine = new Phaser.Line(this.leftBound,0,this.leftBound,this.game.world.height);
      this.rightLine = new Phaser.Line(this.rightBound,0,this.rightBound,this.game.world.height);
      this.bottomLine = new Phaser.Line(this.leftBound,this.game.world.height - 2* this.bubbleRadius,this.rightBound,this.game.world.height - 2* this.bubbleRadius);
      this.centerLine = new Phaser.Line(this.leftBound +  (this.rightBound - this.leftBound)/2, this.game.world.height - 2* this.bubbleRadius, this.leftBound +  (this.rightBound - this.leftBound)/2, this.game.world.height);
      
      //Creating one bubble to test shooting
      this.bubble = new Bubble({game: this.game,
        x :this.centerLine.start.x,
        y:this.centerLine.start.y+this.bubbleRadius/2,
        asset:'bluebubble',
        rightBound: this.rightBound,
        leftBound: this.leftBound});
      this.game.add.existing(this.bubble);

      this.bubblesOnGrid = [];

      this.bubblesOnGrid[this.bubblesOnGrid.length] = new Bubble({game: this.game,
        x :400,
        y:400,
        asset:'bluebubble',
        rightBound: this.rightBound,
        leftBound: this.leftBound});
      
      this.bubblesOnGrid[this.bubblesOnGrid.length] = new Bubble({game: this.game,
        x :300,
        y:400,
        asset:'bluebubble',
        rightBound: this.rightBound,
        leftBound: this.leftBound});

      for(var i = 0; i<this.bubblesOnGrid.length;i++){
          this.bubblesOnGrid[i].shot = true;
          this.game.add.existing(this.bubblesOnGrid[i]);
      }


      



  }
  update (){

      if(this.game.input.activePointer.leftButton.isDown){
          this.bubble.shoot();
      }


      
      this.game.physics.arcade.overlap(this.bubble,this.bubblesOnGrid,this.bubbleCollision,null,this);
      
      
  }

  render () {
    if (__DEV__) {
      
      this.game.debug.geom(this.leftLine,"#000000");
      this.game.debug.geom(this.bottomLine,"#000000");
      this.game.debug.geom(this.rightLine,"#000000");
      this.game.debug.geom(this.centerLine,"#000000");
    }
  }


  bubbleCollision(activeBubble,gridBubble){
      activeBubble.body.velocity.x=0;
      activeBubble.body.velocity.y=0;

      

      this.bubble = new Bubble({game: this.game,
        x :this.centerLine.start.x,
        y:this.centerLine.start.y+32/2,
        asset:'bluebubble',
        rightBound: 50,
        leftBound: 50+32*20});
      this.game.add.existing(this.bubble);

       
  }




}
