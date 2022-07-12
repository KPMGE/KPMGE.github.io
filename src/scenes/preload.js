import Phaser from "../lib/phaser.js"

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  init() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
  }

  preload() {
    this.preloadImage();
    this.preloadAudio();
    // this.load.on('progress', this.onProgress.bind(this));
    // this.load.on('complete', this.onComplete.bind(this));
  }

  preloadImage() {
    this.load.spritesheet('birds', './src/assets/img/birds.png', { frameWidth: 46, frameHeight: 28 });
    this.load.spritesheet('numbers1', './src/assets/img/numbers1.png', { frameWidth: 28, frameHeight: 40 });
    this.load.spritesheet('numbers2', './src/assets/img/numbers2.png', { frameWidth: 18, frameHeight: 24 });
    this.load.spritesheet('medals', './src/assets/img/medals.png', { frameWidth: 48, frameHeight: 48 });
    this.load.atlas('assets', './src/assets/img/assets.png', './src/assets/img/assets.json');
  }

  create() {
    this.scene.start("title");
  }

  preloadAudio() {
    var audio = ['die', 'hit', 'point', 'swooshing', 'wing'];
    audio.forEach(asset => {
      this.load.audio(asset, './src/assets/audio/' + asset + '.wav');
    });
  }

  onComplete() {
    console.log("Completo cara")
    this.scene.start("title");
  }
}
