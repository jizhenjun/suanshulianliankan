import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';
import Music from '../music.js'

export default class Start extends Phaser.State {
  constructor(game) {
    super("Start");
    this.game = game;
  }

  preload() {
    this.base_url = 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/'
    const images = {
      // 'background': this.base_url + 'assets/background.png',
      'background': 'background.png',
      'title': this.base_url + 'assets/title.png',
      'menu': this.base_url + 'assets/menu.gif', 
      'waterGrass': this.base_url + 'assets/waterGrass.gif',
      'prompt': this.base_url + 'assets/prompt.gif',
      'overtime': this.base_url + 'assets/Overtime.gif',
      'colorlessStar': this.base_url + 'assets/colorlessStar.gif',
      'circle': this.base_url + 'assets/circle.gif',
      'star': this.base_url + 'assets/star.gif',
      'lock': this.base_url + 'assets/lock.gif',
      'exit': this.base_url + 'assets/exit.gif',
      'pause': this.base_url + 'assets/music.gif',
      'continue': this.base_url + 'assets/continue.gif',

      'earth': this.base_url + 'images/earth.png',
      'rocket': this.base_url + 'images/rocket.png',
      'play': this.base_url + 'images/play.png',
      'particle1': this.base_url + 'images/particulelune1.png',
      'particle2': this.base_url + 'images/particulelune2.png',
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

    // const title = this.add.sprite(gameOptions.width / 2, gameOptions.height / 4, 'title');
    // title.width *= 0.5 * screenWidthRatio;
    // title.height *= 0.5 * screenHeightRatio;
    // title.anchor.set(0.5);

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
