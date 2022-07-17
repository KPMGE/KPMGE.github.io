import Phaser from "phaser"
import { PipesGroup } from '../classes/pipesGroup'
import { Bird } from '../classes/bird'
import { Stage } from '../classes/stage'

export class Game extends Phaser.Scene {
  private isEnded
  private isPaused
  private isStarted
  private speed
  private taptap
  private ground
  private bird
  private pipes
  private pipes1
  private pipes2
  private stage
  private okButton
  private scoreButton
  private scoreGroup
  private groundCollider
  private pipesOverlap

  constructor() {
    super('game')
  }

  init() {
    this.isPaused = false;
    this.isStarted = false;
    this.isEnded = false;
    this.speed = 2;
  }

  preload() {
    this.load.image('background', 'assets/img/background.png');
  }

  create() {
    this.createBackground();
    this.createPipes();
    this.createBird();
    this.createStage();
    this.createInput();
    this.createScore();
    this.createCollider();
    this.cameras.main.fadeIn(300);
    this.taptap = this.add.image(144, 293, 'assets', 'taptap');
  }

  update(time, delta) {
    Phaser.Scene.prototype.update.call(this);

    if (!this.isPaused && this.isStarted) {
      this.updateGame();
      this.updateGround();
    }
  }

  createBackground() {
    this.add.image(0, 0, 'assets', 'background1').setOrigin(0, 0);
    this.ground = this.physics.add.staticImage(0, 0, 'assets', 'ground').setOrigin(0, 0);
    const height = 512
    this.ground.y = height - this.ground.height;
    this.ground.depth = 2;
    this.ground.refreshBody();
  }

  createBird() {
    this.bird = new Bird(this, 94, this.cameras.main.centerY);
    this.add.existing(this.bird);
  }

  createPipes() {
    this.pipes = this.physics.add.staticGroup();
    this.pipes = this.physics.add.group();
    this.pipes1 = new PipesGroup(this.physics.world, this, 288);
    const x = 288 + 288 / 2 + this.pipes1.pipe1.width / 2;
    this.pipes2 = new PipesGroup(this.physics.world, this, 288);
  }

  createStage() {
    this.stage = new Stage(this);
    this.stage.bird = this.bird;
    this.stage.addPipes(this.pipes1);
    this.stage.addPipes(this.pipes2);
  }

  createInput() {
    this.input.on('pointerdown', this.onJump, this);
    this.input.keyboard.on('keydown-SPACE', this.onJump, this);
  }

  createCollider() {
    this.groundCollider = this.physics.add.collider(this.bird, this.ground, this.hitGround.bind(this));
    this.pipesOverlap = this.physics.add.overlap(this.bird, this.stage.pipes, this.hitPipes.bind(this));
  }

  createScore() {
    this.scoreGroup = this.add.group();
    this.scoreGroup.create(144, 44, 'numbers1');
  }

  updateGame() {
    for (let i = 0; i < this.speed; i++) {
      this.stage.update();
    }
  }

  updateGround() {
    for (var i = 0; i < this.speed; i++) {
      this.ground.x -= 1;
    }
    if (this.ground.x <= -48) {
      this.ground.x = 0;
    }
  }

  onJump() {
    if (!this.isStarted) {
      this.startGame();
    }
    this.bird.jump();
  }

  startGame() {
    this.time.addEvent({ delay: 1000, callback: this.stage.start, callbackScope: this.stage });
    this.tweens.add({ targets: this.taptap, delay: 0, alpha: 0, duration: 300, repeat: 0, });
    this.bird.body.setAllowGravity(true);
    this.isStarted = true;
  }

  isBusy() {
    return false
  }

  clear() {
    this.stage.clear();
  }

  hitGround() {
    if (!this.isEnded) {
      this.isPaused = true;
      this.isEnded = true;
      this.bird.die();
      this.gameOver();
    }
  }

  hitPipes() {
    // this.pipesOverlap.active = false;
    this.isPaused = true;
    this.cameras.main.flash();
    this.bird.fall();
  }

  gameOver() {
    let container = this.add.container(0, 512);
    let scoreboard = this.add.image(144, 0, 'assets', 'scoreboard').setOrigin(.5, 0);
    scoreboard.depth = 2;
    container.add(scoreboard);
    this.drawGameOverScore(container);
    this.drawGameOverMedal(container);
    this.tweens.add({ targets: container, delay: 350, y: 180, duration: 300 });
    this.time.addEvent({
      delay: 700,
      callback: this.createButtonsGameOver,
      callbackScope: this
    });
  }

  drawGameOverScore(container) {
    let length = this.stage.score.toString().length
    for (let i = 0; i < length; i++) {
      let n = this.stage.score.toString()[i];
      let x = (length - i - 1) * - 13;
      let sprite = this.add.image(230 + x, 44, 'numbers2');
      sprite.setFrame(n);
      container.add(sprite);
    }
  }

  drawGameOverMedal(container) {
    if (this.stage.score >= 10) {
      let sprite = this.add.image(78, 65, 'medals');
      if (this.stage.score >= 40) {
        sprite.setFrame(3);
      } else if (this.stage.score >= 30) {
        sprite.setFrame(2);
      } else if (this.stage.score >= 20) {
        sprite.setFrame(1);
      } else {
        sprite.setFrame(0);
      }
      container.add(sprite);
    }
  }

  createButtonsGameOver() {
    this.okButton = this.add.image(0, 0, 'assets', 'ok_button').setOrigin(0, 0);
    this.okButton.setInteractive().on('pointerdown', this.onGameOverOk, this);
    this.scoreButton = this.add.image(0, 0, 'assets', 'score_button');
    var group = this.add.group();
    group.addMultiple([this.okButton, this.scoreButton]);
    Phaser.Actions.GridAlign(group.getChildren(), {
      x: 144 - this.okButton.width / 2,
      y: 350,
      width: 2,
      height: 1,
      cellWidth: 128,
      cellHeight: 28,
    });
  }

  onGameOverOk() {
    this.okButton.y += 2
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("title"), this);
  }
}
