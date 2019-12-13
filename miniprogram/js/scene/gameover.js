import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';

export default class Gameover extends Phaser.State {
  constructor(game) {
    super("Gameover");
    this.game = game;
  }

  create() {
    const background = this.add.sprite(0, 0, 'background');
    background.width = this.world.width;
    background.height = this.world.height;

    var board = this.add.group();
    board.scale.set(this.game.screen_ratio);
    board.x = this.world.width * 0.5;
    board.y = this.world.height * 0.5;

    const gameover_board = this.add.sprite(0, 0, 'gameover_board');
    gameover_board.scale.set(0.5);
    gameover_board.anchor.set(0.5);
    board.add(gameover_board);

    const restart = this.add.button(0, 0, 'restart', this.restart);
    restart.scale.set(0.5);
    restart.anchor.set(0.5);
    restart.y = gameover_board.height * 0.2;
    board.add(restart);

    const return_to_menu = this.add.button(0, 0, 'return_to_menu', this.ReturnToMenu);
    return_to_menu.scale.set(0.5);
    return_to_menu.anchor.set(0.5);
    return_to_menu.y = gameover_board.height * 0.35;
    board.add(return_to_menu);
  }

  restart () {
    this.game.level = parseInt(this.game.level / 5) * 5;
    this.game.state.start('play');
  }

  ReturnToMenu() {
    this.game.state.start('select');
  }
}