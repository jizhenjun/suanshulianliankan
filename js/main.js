import Phaser from 'libs/phaser-wx.js'
import gameOptions from 'gameOptions.js';
import Start from 'scene/start.js'
import Play from 'scene/play.js'
import Select from 'scene/select.js'

let game;
wx.getSystemInfo({
  success: function (res) {
    gameOptions.width = res.windowWidth;
    gameOptions.heigth = res.windowHeight;
    game = new Phaser.Game({
      renderer: Phaser.CANVAS,
      canvas: canvas,
      width: res.windowWidth,
      height: res.windowHeight
    });
  }
});

game.state.add('start', new Start(game));
game.state.add('play', new Play(game));
game.state.add('select', new Select(game));
game.state.start('start');