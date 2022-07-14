import "phaser"

export class Start extends Phaser.Scene {
  constructor() {
    super('start')
  }

  preload(): void {
    this.load.image('background', './src/assets/img/background.png')
  }

  create(): void {
    this.scene.start('preload')
  }
}
