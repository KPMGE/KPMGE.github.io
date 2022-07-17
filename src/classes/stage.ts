import Phaser from "phaser"
import { PipesGroup } from "./pipesGroup"

export class Stage {
  scene
  score
  pipes: PipesGroup[]
  bird

  constructor(scene) {
    this.initialize(scene)
  }

  initialize(scene) {
    this.scene = scene;
    this.score = 0;
    this.bird = null;
    this.pipes = [];
  }

  start(scene) {
    console.log("Stage started..", this.pipes)
    if (!this.pipes) return
    this.pipes.forEach(pipe => pipe.active = true);
  }

  clear() {
    this.bird = null
    this.pipes = []
  }

  update() {
    this.pipes.forEach(pipe => {
      let headBirdX = this.bird.x + this.bird.width / 2;
      if (pipe.pipe1.x === headBirdX) {
        this.refreshScore();
      }
    }, this);
    if (this.bird) {
      this.bird.update();
    }
    this.pipes.forEach(pipe => {
      pipe.update();
    });
  }

  refreshScore() {
    this.scene.sound.play('point');
    this.score += 1;
    this.scene.scoreGroup.clear(true);
    let length = this.score.toString().length
    for (let i = 0; i < length; i++) {
      let n = this.score.toString()[i];
      let x = (i * 24) - 12 * (length - 1);
      let sprite = this.scene.scoreGroup.create(144 + x, 44, 'numbers1');
      sprite.setFrame(n);
    }
  }

  addPipes(pipe: PipesGroup) {
    this.pipes.push(pipe)
  }
}
