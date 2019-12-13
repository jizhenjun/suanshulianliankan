import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';

export default class Help extends Phaser.State {
  constructor(game) {
    super("Help");
    this.game = game;
  }

  create() {
    console.log('help');
  }
}