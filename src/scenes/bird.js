import Phaser from "../lib/phaser.js"

export default class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor() {
    super('bird')
  }

  initialize(scene, x, y) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'birds');
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setGravityY(1200);
    this.body.setAllowGravity(false);
    this.isAlive = true;
    this.setSize(30, 20, true);
    this.setupAnims();
  }

  setupAnims() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('birds', { start: 0, end: 2 }),
      frameRate: 16,
      repeat: 2
    });
    this.anims.play('idle');
  }

  jump() {
    if (this.isAlive) {
      this.scene.sound.play('wing');
      this.body.setVelocityY(-370);
      this.anims.play('idle');
      this.playFlapTween();
    }
  }

  playFlapTween() {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      delay: 0,
      angle: -30,
      duration: 300,
      repeat: 0,
    });
    this.scene.tweens.add({
      targets: this,
      delay: 500,
      angle: { from: -30, to: 90 },
      duration: 300,
      repeat: 0
    });
  }

  fall() {

    this.scene.sound.play('hit');
    this.scene.time.addEvent({
      delay: 500,
      callback: function() { this.scene.sound.play('die'); },
      callbackScope: this
    });
    this.setVelocityY(0);
    this.anims.stop();
    this.isAlive = false;
    this.playDieTween();
  }

  playDieTween() {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      key: 'die',
      targets: this,
      angle: 90,
      duration: 200,
      repeat: 0
    });
  }

  die() {

    if (this.isAlive) {
      this.scene.sound.play('hit');
      this.anims.stop();
      this.scene.tweens.killTweensOf(this);
      this.isAlive = false;
    }
  }
}
