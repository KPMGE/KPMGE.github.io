import Phaser from "phaser"

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  init(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0)
  }

  preload(): void {
    this.preloadImage()
    this.preloadAudio()
  }

  preloadImage(): void {
    this.load.spritesheet('birds', './src/assets/img/birds.png', { frameWidth: 46, frameHeight: 28 })
    this.load.spritesheet('numbers1', './src/assets/img/numbers1.png', { frameWidth: 28, frameHeight: 40 })
    this.load.spritesheet('numbers2', './src/assets/img/numbers2.png', { frameWidth: 18, frameHeight: 24 })
    this.load.spritesheet('medals', './src/assets/img/medals.png', { frameWidth: 48, frameHeight: 48 })
    this.load.atlas('assets', './src/assets/img/assets.png', './src/assets/img/assets.json')
  }

  create(): void {
    this.scene.start("title")
  }

  preloadAudio(): void {
    let audio = ['die', 'hit', 'point', 'swooshing', 'wing']
    audio.forEach(asset => {
      this.load.audio(asset, './src/assets/audio/' + asset + '.wav')
    })
  }
}
