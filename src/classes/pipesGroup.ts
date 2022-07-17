import Phaser from "phaser"

export class PipesGroup extends Phaser.Physics.Arcade.Group {
  private gap
  private pipe1
  private pipe2

  constructor(world, scene, x) {
    super(world, scene)
    this.initialize(scene, x)
  }

  initialize(scene, x) {
    let world = scene.physics.world;

    Phaser.Physics.Arcade.Group.call(this, world, scene);
    this.active = false;
    this.gap = 90;
    this.pipe1 = this.createPipe(x, 0, 'pipe1').setOrigin(0.5, 1);
    this.pipe2 = this.createPipe(x, 0, 'pipe2').setOrigin(0.5, 0);
    this.pipe1.x += this.pipe1.width / 2;
    this.pipe2.x += this.pipe2.width / 2;
    this.randomPipes();
  }

  createPipe(x, y, texture) {
    const pipe = this.create(x, y, 'assets', texture)

    if (!pipe) throw new Error('cannot create pipe!')

    pipe.setImmovable(true);
    return pipe;
  }

  update() {
    if (this.active) {
      this.updatePipes()
    }
  }

  updatePipes() {
    this.children.each(child => {
      // child.x -= 1;
    });

    if (!this.isOnScreen()) {
      this.randomPipes();
      this.children.each(child => {
        // child.x = 288 + child.width;
      });
    }
  }

  isOnScreen() {
    return this.pipe1.getBounds().right >= 0;
  }

  randomPipes() {
    let y = Phaser.Math.Between(110, 290);
    this.pipe1.y = y - this.gap / 2;
    this.pipe2.y = y + this.gap / 2;
  }
}
