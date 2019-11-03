import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';
import Music from '../music.js'

export default class Start extends Phaser.State {
  constructor(game) {
    super("Start");
    this.game = game;
  }

  preload() {
    const images = {
      'background': 'assets/background.png',
      'title': 'assets/title.png',
      'menu': 'assets/menu.gif', 
      'waterGrass': 'assets/waterGrass.gif',
      'prompt': 'assets/prompt.gif',
      'overtime': 'assets/Overtime.gif',
      'colorlessStar': 'assets/colorlessStar.gif',
      'circle': 'assets/circle.gif',
      'star': 'assets/star.gif',
      'lock': 'assets/lock.gif',
      'exit': 'assets/exit.gif',
      'pause': 'assets/music.gif',
      'continue': 'assets/continue.gif',

      'earth': 'images/earth.png',
			'rocket': 'images/rocket.png',
			'play': 'images/play.png',
			'particle1': 'images/particulelune1.png',
			'particle2': 'images/particulelune2.png',
    };
		for (let name in images) {
			this.load.image(name, images[name]);
    }
  }

  create() {
    this.music = new Music();
    this.music.playBgm();

    const screenWidthRatio = gameOptions.width / 375;
    const screenHeightRatio = gameOptions.height / 812;

    const skybox = this.add.sprite(0, 0, 'background');
    skybox.width = gameOptions.width;
    skybox.height = gameOptions.height;

    const waterGrass = this.add.sprite(0, gameOptions.height - 200, 'waterGrass');
    waterGrass.width = gameOptions.width;
    waterGrass.height = 200;

    const title = this.add.sprite(gameOptions.width / 2, gameOptions.height / 4, 'title');
    title.width *= 0.5 * screenWidthRatio;
    title.height *= 0.5 * screenHeightRatio;
    title.anchor.set(0.5);

    const startButton = this.add.group();
    startButton.x = this.world.width / 2;
    startButton.y = gameOptions.height * 0.7;
    startButton.scale.set(0.78);

    const playButton = this.add.button(10, 0, 'play', this.play);
    playButton.scale.set(screenHeightRatio * 0.6);
    playButton.anchor.set(0.5);
    startButton.add(playButton);
  }

  play() {
    this.game.state.start('select');
  }
}
