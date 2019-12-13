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
      'background': this.base_url + 'assets/background.png',
      'title': this.base_url + 'assets/title.png',
      'help': this.base_url + 'assets/help.png',
      'single_mode': this.base_url + 'assets/single_mode.png',
      'others_mode': this.base_url + 'assets/others_mode.png',
      'menu_board': this.base_url + 'assets/menu_board.png',
      'mission_choose': this.base_url + 'assets/mission_choose.png',
      'return': this.base_url + 'assets/return.png',
      'prev_page': this.base_url + 'assets/prev_page.png',
      'next_page': this.base_url + 'assets/next_page.png',
      'lock_mission': this.base_url + 'assets/lock_mission.png',
      'lock': this.base_url + 'assets/lock.png',
      'star': this.base_url + 'assets/star.png',
      'colorless_star': this.base_url + 'assets/colorless_star.png',
      'level_board': this.base_url + 'assets/level_information.png',
      'buttom_background': this.base_url + 'assets/buttom_background.png',
      'add_time': this.base_url + 'assets/add_time.png',
      'prompt': this.base_url + 'assets/prompt.png',
      'help_in_game': this.base_url + 'assets/help_in_game.png',
      'pause': this.base_url + 'assets/pause.png',
      'continue': this.base_url + 'assets/continue.png',
      'back': this.base_url + 'assets/back.png',
      'gameover_board': this.base_url + 'assets/gameover_board.png',
      'restart': this.base_url + 'assets/restart.png',
      'return_to_menu': this.base_url + 'assets/return_to_menu.png',
      'prominent': this.base_url + 'assets/prominent.png',
      'chosen_border': this.base_url + 'assets/chosen_border.png',
      'nextmission_board': this.base_url + 'assets/nextmission_board.png',
      'next_mission': this.base_url + 'assets/next_mission.png',

      'chapter_1': this.base_url + 'assets/chapter/choose/1.png',
      'chapter_2': this.base_url + 'assets/chapter/choose/2.png',
      'chapter_3': this.base_url + 'assets/chapter/choose/3.png',
      'chapter_4': this.base_url + 'assets/chapter/choose/4.png',
      'chapter_5': this.base_url + 'assets/chapter/choose/5.png',
      'chapter_6': this.base_url + 'assets/chapter/choose/6.png',
      'chapter_7': this.base_url + 'assets/chapter/choose/7.png',
      'chapter_8': this.base_url + 'assets/chapter/choose/8.png',

      'current_chapter_1': this.base_url + 'assets/chapter/current/1.png',
      'current_chapter_2': this.base_url + 'assets/chapter/current/2.png',
      'current_chapter_3': this.base_url + 'assets/chapter/current/3.png',
      'current_chapter_4': this.base_url + 'assets/chapter/current/4.png',
      'current_chapter_5': this.base_url + 'assets/chapter/current/5.png',
      'current_chapter_6': this.base_url + 'assets/chapter/current/6.png',
      'current_chapter_7': this.base_url + 'assets/chapter/current/7.png',
      'current_chapter_8': this.base_url + 'assets/chapter/current/8.png',

      'number_0': this.base_url + 'assets/numbers/0.png',
      'number_1': this.base_url + 'assets/numbers/1.png',
      'number_2': this.base_url + 'assets/numbers/2.png',
      'number_3': this.base_url + 'assets/numbers/3.png',
      'number_4': this.base_url + 'assets/numbers/4.png',
      'number_5': this.base_url + 'assets/numbers/5.png',
      'number_6': this.base_url + 'assets/numbers/6.png',
      'number_7': this.base_url + 'assets/numbers/7.png',
      'number_8': this.base_url + 'assets/numbers/8.png',
      'number_9': this.base_url + 'assets/numbers/9.png',
      'number_10': this.base_url + 'assets/numbers/10.png',
      'number_11': this.base_url + 'assets/numbers/11.png',
      'number_12': this.base_url + 'assets/numbers/12.png',
      'number_13': this.base_url + 'assets/numbers/13.png',
      'number_14': this.base_url + 'assets/numbers/14.png',
      'number_15': this.base_url + 'assets/numbers/15.png',
      'number_16': this.base_url + 'assets/numbers/16.png',
      'number_17': this.base_url + 'assets/numbers/17.png',
      'number_18': this.base_url + 'assets/numbers/18.png',
      'number_19': this.base_url + 'assets/numbers/19.png',
      'number_20': this.base_url + 'assets/numbers/20.png',
      'number_21': this.base_url + 'assets/numbers/21.png',
      'number_22': this.base_url + 'assets/numbers/22.png',
      'number_23': this.base_url + 'assets/numbers/23.png',
      'number_24': this.base_url + 'assets/numbers/24.png',
      'number_25': this.base_url + 'assets/numbers/25.png',
      'number_26': this.base_url + 'assets/numbers/26.png',
      'number_27': this.base_url + 'assets/numbers/27.png',
      'number_28': this.base_url + 'assets/numbers/28.png',
      'number_29': this.base_url + 'assets/numbers/29.png',
      'number_30': this.base_url + 'assets/numbers/30.png',
      'number_31': this.base_url + 'assets/numbers/31.png',
      'number_32': this.base_url + 'assets/numbers/32.png',
      'number_33': this.base_url + 'assets/numbers/33.png',
      'number_34': this.base_url + 'assets/numbers/34.png',
      'number_35': this.base_url + 'assets/numbers/35.png',
      'number_36': this.base_url + 'assets/numbers/36.png',
      'number_37': this.base_url + 'assets/numbers/37.png',
      'number_38': this.base_url + 'assets/numbers/38.png',
      'number_39': this.base_url + 'assets/numbers/39.png',
      'number_40': this.base_url + 'assets/numbers/40.png',
      'number_41': this.base_url + 'assets/numbers/41.png',
      'number_42': this.base_url + 'assets/numbers/42.png',
      'number_43': this.base_url + 'assets/numbers/43.png',
      'number_44': this.base_url + 'assets/numbers/44.png',
      'number_45': this.base_url + 'assets/numbers/45.png',
      'number_46': this.base_url + 'assets/numbers/46.png',
      'number_47': this.base_url + 'assets/numbers/47.png',
      'number_48': this.base_url + 'assets/numbers/48.png',
      'number_49': this.base_url + 'assets/numbers/49.png',
      'number_50': this.base_url + 'assets/numbers/50.png',
      'number_51': this.base_url + 'assets/numbers/51.png',
      'number_52': this.base_url + 'assets/numbers/52.png',
      'number_53': this.base_url + 'assets/numbers/53.png',
      'number_54': this.base_url + 'assets/numbers/54.png',
      'number_55': this.base_url + 'assets/numbers/55.png',
      'number_56': this.base_url + 'assets/numbers/56.png',
      'number_57': this.base_url + 'assets/numbers/57.png',
      'number_58': this.base_url + 'assets/numbers/58.png',
      'number_59': this.base_url + 'assets/numbers/59.png',
      'number_60': this.base_url + 'assets/numbers/60.png',
      'number_61': this.base_url + 'assets/numbers/61.png',
      'number_62': this.base_url + 'assets/numbers/62.png',
      'number_63': this.base_url + 'assets/numbers/63.png',
      'number_64': this.base_url + 'assets/numbers/64.png',
      'number_65': this.base_url + 'assets/numbers/65.png',
      'number_66': this.base_url + 'assets/numbers/66.png',
      'number_67': this.base_url + 'assets/numbers/67.png',
      'number_68': this.base_url + 'assets/numbers/68.png',
      'number_69': this.base_url + 'assets/numbers/69.png',
      'number_70': this.base_url + 'assets/numbers/70.png',
      'number_71': this.base_url + 'assets/numbers/71.png',
      'number_72': this.base_url + 'assets/numbers/72.png',
      'number_73': this.base_url + 'assets/numbers/73.png',
      'number_74': this.base_url + 'assets/numbers/74.png',
      'number_75': this.base_url + 'assets/numbers/75.png',
      'number_76': this.base_url + 'assets/numbers/76.png',
      'number_77': this.base_url + 'assets/numbers/77.png',
      'number_78': this.base_url + 'assets/numbers/78.png',
      'number_79': this.base_url + 'assets/numbers/79.png',
      'number_80': this.base_url + 'assets/numbers/80.png',
      'number_81': this.base_url + 'assets/numbers/81.png',
      'number_82': this.base_url + 'assets/numbers/82.png',
      'number_83': this.base_url + 'assets/numbers/83.png',
      'number_84': this.base_url + 'assets/numbers/84.png',
      'number_85': this.base_url + 'assets/numbers/85.png',
      'number_86': this.base_url + 'assets/numbers/86.png',
      'number_87': this.base_url + 'assets/numbers/87.png',
      'number_88': this.base_url + 'assets/numbers/88.png',
      'number_89': this.base_url + 'assets/numbers/89.png',
      'number_90': this.base_url + 'assets/numbers/90.png',
      'number_91': this.base_url + 'assets/numbers/91.png',
      'number_92': this.base_url + 'assets/numbers/92.png',
      'number_93': this.base_url + 'assets/numbers/93.png',
      'number_94': this.base_url + 'assets/numbers/94.png',
      'number_95': this.base_url + 'assets/numbers/95.png',
      'number_96': this.base_url + 'assets/numbers/96.png',
      'number_97': this.base_url + 'assets/numbers/97.png',
      'number_98': this.base_url + 'assets/numbers/98.png',
      'number_99': this.base_url + 'assets/numbers/99.png',
      'number_100': this.base_url + 'assets/numbers/100.png',
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
  }

  play() {
    this.game.state.start('select');
  }

  help() {
    this.game.state.start('help');
  }
}
