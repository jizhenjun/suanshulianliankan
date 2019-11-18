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
      'background': 'assets/background.png',
      'title': 'assets/title.png',
      'help': 'assets/help.png',
      'single_mode': 'assets/single_mode.png',
      'others_mode': 'assets/others_mode.png',
      'menu_board': 'assets/menu_board.png',
      'mission_choose': 'assets/mission_choose.png',
      'return': 'assets/return.png',
      'prev_page': 'assets/prev_page.png',
      'next_page': 'assets/next_page.png',
      'lock_mission': 'assets/lock_mission.png',
      'lock': 'assets/lock.png',
      'star': 'assets/star.png',
      'colorless_star': 'assets/colorless_star.png',

      'chapter_2': 'assets/chapter/choose_2.png',

      'number_0': 'assets/numbers/0.png',
    };
		for (let name in images) {
			this.load.image(name, images[name]);
    }
  }

  create() {
    this.music = new Music();
    this.music.playBgm();

    this.screen_height = gameOptions.screen_height;
    this.screen_width = gameOptions.screen_width;

    this.game.screen_ratio = Math.min(this.world.height / this.screen_height,
                                      this.world.width / this.screen_width);
    
    const background = this.add.sprite(0, 0, 'background');
    background.width = this.world.width;
    background.height = this.world.height;

    const title = this.add.sprite(this.world.width / 2, this.world.height / 4, 'title');
    title.anchor.set(0.5);
    title.scale.set(0.5 * this.game.screen_ratio);

    var start_button = this.add.group();
    start_button.scale.set(this.game.screen_ratio);
    start_button.x = this.world.width * 0.5;
    start_button.y = this.world.height * 0.5;
    
    var single_mode_button = this.add.button(0, 0, 'single_mode', this.play);
    single_mode_button.scale.set(0.5);
    single_mode_button.anchor.set(0.5);
    start_button.add(single_mode_button);

    var others_mode_button = this.add.button(0, 0, 'others_mode');
    others_mode_button.y += others_mode_button.height;
    others_mode_button.scale.set(0.5);
    others_mode_button.anchor.set(0.5);
    start_button.add(others_mode_button);

    var help_button = this.add.button(0, 0, 'help', this.help);
    help_button.scale.set(0.5 * this.game.screen_ratio);
    help_button.x = this.world.width - help_button.width;
  }

  play() {
    this.game.state.start('select');
  }

  help() {
    console.log('help');
  }
}
