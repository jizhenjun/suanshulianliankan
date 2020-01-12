// import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';

export default class Gameover extends Phaser.State {
  constructor(game) {
    super("NextMission");
    this.game = game;
  }

  create() {
    const star_position = [[-0.18, -0.18], [0, -0.18], [0.18, -0.18], [-0.09, -0.09], [0.09, -0.09]];
    this.mission_in_chapter = gameOptions.mission_in_chapter;

    const background = this.add.sprite(0, 0, 'background');
    background.width = this.world.width;
    background.height = this.world.height;

    var board = this.add.group();
    board.scale.set(this.game.screen_ratio);
    board.x = this.world.width * 0.5;
    board.y = this.world.height * 0.5;

    const nextmission_board = this.add.sprite(0, 0, 'nextmission_board');
    nextmission_board.scale.set(0.5);
    nextmission_board.anchor.set(0.5);
    board.add(nextmission_board);

    const next_mission = this.add.button(0, 0, 'next_mission', this.NextMission);
    next_mission.scale.set(0.5);
    next_mission.anchor.set(0.5);
    next_mission.y = nextmission_board.height * 0.2;
    board.add(next_mission);

    const return_to_menu = this.add.button(0, 0, 'return_to_menu', this.ReturnToMenu);
    return_to_menu.scale.set(0.5);
    return_to_menu.anchor.set(0.5);
    return_to_menu.y = nextmission_board.height * 0.35;
    board.add(return_to_menu);

    for (var i = 0; i < this.mission_in_chapter; i++) {
      const colorless_star = this.add.sprite(0, 0, 'colorless_star');
      colorless_star.scale.set(0.5);
      colorless_star.anchor.set(0.5);
      colorless_star.x = nextmission_board.width * star_position[i][0];
      colorless_star.y = nextmission_board.height * star_position[i][1];
      board.add(colorless_star);
    }
    
    for (var i = 0; i < this.game.stars; i++) {
      const star = this.add.sprite(0, 0, 'star');
      star.scale.set(0.5);
      star.anchor.set(0.5);
      star.x = nextmission_board.width * star_position[i][0];
      star.y = nextmission_board.height * star_position[i][1];
      board.add(star);
    }
  }

  NextMission () {
    this.game.state.start('play');
  }

  ReturnToMenu() {
    this.game.state.start('select');
  }
}