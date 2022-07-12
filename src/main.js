import Phaser from './lib/phaser.js'
import Start from './scenes/start.js'
import Preload from './scenes/preload.js'
import Title from './scenes/title.js'

new Phaser.Game({
  type: Phaser.AUTO,
  width: 288,
  height: 512,
  pixelart: true,
  backgroundColor: '#000000',
  scene: [Start, Preload, Title],
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {
      //   y: 1000
      // },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 288,
      height: 512
    },
    max: {
      width: 1152,
      height: 2048
    }
  }
})
