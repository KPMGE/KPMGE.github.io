import Phaser from "../lib/phaser.js"

export default class Start extends Phaser.Scene {
  constructor() {
    super('start')
  }

  init() { }

  preload() {
    //loading images and spritesheets
    this.load.image('background', './src/assets/img/background.png')
  }

  create() {
    this.scene.start('preload')
  }
}
