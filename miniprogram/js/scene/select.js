import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';
import Music from '../music.js'

export default class Select extends Phaser.State {
  constructor(game) {
    super("Start");
    this.game = game;
  }

  create() {
    this.music = new Music();
    this.music.playBgm();

    const star_position = [[0.13, -0.03], [0.26, -0.033], [0, 0.03], [0.15, 0.03], [0.29, 0.03]];

    const background = this.add.sprite(0, 0, 'background');
    background.width = this.world.width;
    background.height = this.world.height;

    var menu = this.add.group();
    menu.scale.set(this.game.screen_ratio);
    menu.x = this.world.width * 0.5;
    menu.y = this.world.height * 0.5;

    const board = this.add.sprite(0, 0, 'menu_board');
    board.scale.set(0.5);
    board.anchor.set(0.5);
    menu.add(board);

    var return_button = this.add.button(0, 0, 'return', this.ReturnMenu);
    return_button.scale.set(0.5);
    return_button.anchor.set(0.5);
    return_button.y = board.height * 0.36;
    menu.add(return_button);

    var prev_page_button = this.add.sprite(0, 0, 'prev_page');
    prev_page_button.scale.set(0.5);
    prev_page_button.anchor.set(0.5);
    prev_page_button.x = -board.width * 0.22;
    prev_page_button.y = board.height * 0.25;
    prev_page_button.inputEnabled = true;
    prev_page_button.events.onInputDown.add(this.PrevPage, this);
    menu.add(prev_page_button);

    var next_page_button = this.add.sprite(0, 0, 'next_page');
    next_page_button.scale.set(0.5);
    next_page_button.anchor.set(0.5);
    next_page_button.x = board.width * 0.22;
    next_page_button.y = board.height * 0.25;
    next_page_button.inputEnabled = true;
    next_page_button.events.onInputDown.add(this.NextPage, this);
    menu.add(next_page_button);

    this.page_number = 0;
    this.mission_in_one_page = gameOptions.mission_in_one_page;

    this.mission_count = gameOptions.mission_count;
    this.mission_in_chapter = gameOptions.mission_in_chapter;

    this.mission_square_size = gameOptions.mission_square_size;
    this.mission_interval_size = gameOptions.mission_interval_size;

    this.completed_mission = gameOptions.completed_mission;

    this.missions = new Array();
    this.start_mission_flag = -1;
    for (var i = 0; i < this.mission_count; i++) {
      this.missions[i] = this.add.group();
      this.missions[i].y = -board.height * 0.27 + (i % 3) * board.height * 0.17;

      if (this.completed_mission[i] == 0 && this.start_mission_flag == -1) {
        this.start_mission_flag = i + 1;
      }

      if (this.start_mission_flag != -1 && this.start_mission_flag <= i) {
        var lock_mission = this.add.sprite(0, 0, 'lock_mission');
        lock_mission.scale.set(0.5);
        lock_mission.anchor.set(0.5);
        this.missions[i].add(lock_mission);
      } else {
        var mission_button = this.add.sprite(0, 0, 'mission_choose');
        mission_button.index = i;
        mission_button.scale.set(0.5);
        mission_button.anchor.set(0.5);
        this.missions[i].add(mission_button);
        mission_button.inputEnabled = true;
        mission_button.events.onInputDown.add(this.startMission, this);
      }

      const mission_text = this.add.sprite(0, 0, 'chapter_' + (i + 1).toString());
      mission_text.scale.set(0.5);
      mission_text.anchor.set(0.5);
      mission_text.x = -board.width * 0.23;
      this.missions[i].add(mission_text);
      
      for (var j = 0; j < this.mission_in_chapter; j++) {
        if (this.start_mission_flag != -1 && i >= this.start_mission_flag) {
          continue;
        }
        if (j >= this.completed_mission[i]) {
          const colorless_star = this.add.sprite(0, 0, 'colorless_star');
          colorless_star.scale.set(0.25);
          colorless_star.anchor.set(0.5);
          colorless_star.x = board.width * star_position[j][0];
          colorless_star.y = board.height * star_position[j][1];
          this.missions[i].add(colorless_star);
        } else {
          const star = this.add.sprite(0, 0, 'star');
          star.scale.set(0.25);
          star.anchor.set(0.5);
          star.x = board.width * star_position[j][0];
          star.y = board.height * star_position[j][1];
          this.missions[i].add(star);
        }
      }
      if (this.page_number * this.mission_in_one_page > i || 
         (this.page_number + 1) * this.mission_in_one_page <= i) {
        this.missions[i].setAll('alpha', 0);
        this.missions[i].setAll('inputEnabled', false);
      }
      menu.add(this.missions[i]);
    }
  }

  ReturnMenu() {
    this.game.state.start('start');
  }

  startMission(sprite, pointer) {
    this.game.level = sprite.index * 5;
    console.log(this.game.level);
    this.game.state.start('play');
  }

  NextPage() {
    if ((this.page_number + 1) * 3 > this.mission_count) {
      return;
    }
    for (var i = 0; i < this.mission_count; i++) {
      this.missions[i].setAll('alpha', 0);
      this.missions[i].setAll('inputEnabled', false);
    }
    this.page_number += 1;
    for (var i = this.page_number * this.mission_in_one_page; 
             i < (this.page_number + 1) * this.mission_in_one_page && i < this.mission_count; i++) {
      this.missions[i].setAll('alpha', 1);
      if (i <= this.start_mission_flag) {
        this.missions[i].setAll('inputEnabled', true);
      }
    }
  }

  PrevPage() {
    if (this.page_number == 0) {
      return;
    }
    for (var i = 0; i < this.mission_count; i++) {
      this.missions[i].setAll('alpha', 0);
      this.missions[i].setAll('inputEnabled', false);
    }
    this.page_number -= 1;
    for (var i = this.page_number * this.mission_in_one_page; 
             i < (this.page_number + 1) * this.mission_in_one_page && i < this.mission_count; i++) {
      this.missions[i].setAll('alpha', 1);
      if (i <= this.start_mission_flag) {
        this.missions[i].setAll('inputEnabled', true);
      }
    }
  }
}
