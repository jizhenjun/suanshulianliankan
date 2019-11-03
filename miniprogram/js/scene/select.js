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

    const skybox = this.add.sprite(0, 0, 'background');
    skybox.width = gameOptions.width;
    skybox.height = gameOptions.height;

    this.mission_count = gameOptions.mission_count;
    this.mission_in_chapter = gameOptions.mission_in_chapter;

    this.mission_square_size = gameOptions.mission_square_size;
    this.mission_interval_size = gameOptions.mission_interval_size;

    this.completed_mission = gameOptions.completed_mission;

    this.missions = new Array();
    var start_mission_flag = true;
    for (var i = 0; i < this.mission_count; i++) {
      this.missions[i] = new Array();
      let circle = this.add.sprite(
        this.mission_square_size,
        (i + 1) * this.mission_square_size,
        'circle'
      );
      circle.width = this.mission_interval_size; 
      circle.height = this.mission_interval_size;
      circle.index = i * 5;
      
      if (this.completed_mission[i] == 0) {
        if (!start_mission_flag) {
          let lock = this.add.sprite(
            this.mission_square_size,
            (i + 1) * this.mission_square_size,
            'lock'
          );
          lock.width = this.mission_interval_size; 
          lock.height = this.mission_interval_size;
        } else {
          circle.inputEnabled = true;
          circle.events.onInputDown.add(this.start_mission, this);
        }
        start_mission_flag = false;
      } else {
        circle.inputEnabled = true;
        circle.events.onInputDown.add(this.start_mission, this);
      }
      
      for (var j = 0; j < this.mission_in_chapter; j++) {
        if (j >= this.completed_mission[i]) {
          var color_less_star = this.add.sprite(
            (j + 2) * this.mission_square_size,
            (i - 1) * this.mission_square_size + 100,
            'colorlessStar'
          );
          color_less_star.width = this.mission_interval_size; 
          color_less_star.height = this.mission_interval_size;
        } else {
          var star = this.add.sprite(
            (j + 2) * this.mission_square_size,
            (i - 1) * this.mission_square_size + 100,
            'star'
          );
          star.width = this.mission_interval_size; 
          star.height = this.mission_interval_size;
        }
      }
    }
  }

  start_mission(sprite, pointer) {
    this.game.level = sprite.index;
    this.game.state.start('play');
  }
}
