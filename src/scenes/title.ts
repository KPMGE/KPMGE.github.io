import "phaser"

export class Title extends Phaser.Scene {
  private title
  private bird
  private interface
  private startButton
  private scoreButton

  constructor() {
    super('title')
  }

  init() {
    this.cameras.main.flash();
  }

  create() {
    this.createBackground();
    this.createTitle();
    this.createButtons();
  }

  createBackground() {
    this.add.image(0, 0, 'assets', 'background1').setOrigin(0, 0);
    let ground = this.add.image(0, 0, 'assets', 'ground').setOrigin(0, 0);
    const canvasHeight = 512
    ground.y = canvasHeight - ground.height;
  }

  createTitle() {
    this.bird = this.add.sprite(252, 186, 'birds');
    this.title = this.add.image(144, 186, 'assets', 'flappy_bird');
    this.tweens.add({
      y: 192,
      targets: [this.title, this.bird],
      duration: 600,
      repeat: -1,
      yoyo: true
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('birds', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    });
    this.bird.play('idle');
  }

  createButtons() {
    this.interface = this.add.group();
    this.startButton = this.add.image(0, 0, 'assets', 'start_button').setOrigin(0, 0);
    this.startButton.setInteractive().on('pointerdown', this.onStart, this);
    this.scoreButton = this.add.image(0, 0, 'assets', 'score_button');
    this.interface.addMultiple([this.startButton, this.scoreButton]);
    Phaser.Actions.GridAlign(this.interface.getChildren(), {
      x: 144 - this.startButton.width / 2,
      y: 350,
      width: 2,
      height: 1,
      cellWidth: 128,
      cellHeight: 28,
    });
  }

  onStart() {
    this.startButton.y += 2
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("game"), this);
  }
}
