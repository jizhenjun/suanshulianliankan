import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';
import Music from '../music.js'

export default class Start extends Phaser.State {
  constructor(game) {
    super("Start");
    this.game = game;
  }

  preload() {
    // this.load.setBaseURL("https://suanshulianlian.oss-cn-beijing.aliyuncs.com");
    const images = {
      'background': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/background.png',
      'title': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/title.png',
      'menu': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/menu.gif', 
      'waterGrass': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/waterGrass.gif',
      'prompt': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/prompt.gif',
      'overtime': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/Overtime.gif',
      'colorlessStar': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/colorlessStar.gif',
      'circle': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/circle.gif',
      'star': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/star.gif',
      'lock': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/lock.gif',
      'exit': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/exit.gif',
      'pause': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/music.gif',
      'continue': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/assets/continue.gif',

      'earth': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/images/earth.png',
      'rocket': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/images/rocket.png',
      'play': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/images/play.png',
      'particle1': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/images/particulelune1.png',
      'particle2': 'https://suanshulianlian.oss-cn-beijing.aliyuncs.com/images/particulelune2.png',
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
