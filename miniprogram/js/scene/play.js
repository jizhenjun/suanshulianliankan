// import Phaser from '../libs/phaser-wx.js';
import gameOptions from '../gameOptions.js';
import Music from '../music.js';

export default class Play extends Phaser.State {
  constructor() {
    super("Game");
  }

  create() {
    this.music = new Music();
    this.music.playBgm();

    const skybox = this.add.sprite(0, 0, 'background');
    skybox.width = gameOptions.width;
    skybox.height = gameOptions.height;

    this.screenWidthRatio = gameOptions.width / 375;
    this.screenHeightRatio = gameOptions.height / 812;

    //关卡地图数值
    this.map_size = gameOptions.map_size[this.game.level];
    this.map_max_number = gameOptions.map_max_number[this.game.level];
    this.rule = gameOptions.rule[this.game.level];
    this.target_number = gameOptions.target_number[this.game.level];
    if (this.game.level % 5 == 0) {
      this.countdown_in_seconds = gameOptions.countdown_in_seconds[this.game.level / 5];
    }
    
    this.stars_in_seconds = gameOptions.stars_in_seconds[this.game.level];

    this.max_size = gameOptions.max_size;
    this.square_size = gameOptions.square_size;
    this.square_interval = gameOptions.square_interval;

    this.delta = (this.max_size - this.map_size) / 2;

    this.chosen_square = -1;

    var title = this.add.group();
    title.scale.set(this.game.screen_ratio);
    title.x = this.world.width * 0.5;
    title.y = this.world.height * 0.2;

    const level_board = this.add.sprite(0, 0, 'level_board');
    level_board.scale.set(0.5);
    level_board.anchor.set(0.5);
    title.add(level_board);
    const current_chapter = this.add.sprite(0, 0, 'current_chapter_' + (parseInt(this.game.level / 5) + 1).toString());
    current_chapter.scale.set(0.5);
    current_chapter.anchor.set(0.5);
    current_chapter.x = -level_board.width * 0.27;
    current_chapter.y = -level_board.height * 0.33;
    title.add(current_chapter);

    const back = this.add.button(0, 0, 'back', this.ReturnMenu);
    back.scale.set(0.5);
    back.anchor.set(0.5);
    back.x = level_board.width * 0.24;
    back.y = level_board.height * 0.30;
    title.add(back);

    this.pause = this.add.sprite(0, 0, 'pause');
    this.pause.scale.set(0.5);
    this.pause.anchor.set(0.5);
    this.pause.x = -level_board.width * 0.24;
    this.pause.y = level_board.height * 0.30;
    this.pause.inputEnabled = true;
    this.pause.events.onInputDown.add(this.Pause, this);
    title.add(this.pause);

    this.continue_button = this.add.sprite(0, 0, 'continue');
    this.continue_button.scale.set(0.5);
    this.continue_button.anchor.set(0.5);
    this.continue_button.x = -level_board.width * 0.24;
    this.continue_button.y = level_board.height * 0.30;
    this.continue_button.inputEnabled = false;
    this.continue_button.alpha = 0;
    this.continue_button.events.onInputDown.add(this.Continue, this);
    title.add(this.continue_button);

    var minutes = parseInt(this.countdown_in_seconds / 60);
    var seconds = this.countdown_in_seconds - (minutes * 60);
    var time_string = this.AddZeros(minutes) + ":" + this.AddZeros(seconds);
    this.time_text = this.add.text(0, 0, time_string);
    this.time_text.fontWeight = 'normal';
    this.time_text.fill = "#ffffff";
    this.time_text.anchor.set(0.5);
    this.time_text.x = level_board.width * 0.05;
    this.time_text.y = level_board.height * 0.01;
    title.add(this.time_text);
    this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.Tick, this);

    var symbol = this.GetSymbol();
    var rule_string = '规则: a' + symbol + 'b=' + this.target_number.toString();
    this.rule_text = this.add.text(0, 0, rule_string);
    this.rule_text.font = '微软雅黑';
    this.rule_text.fontWeight = 'normal';
    this.rule_text.fill = "#ffffff";
    this.rule_text.fontSize = 25;
    this.rule_text.anchor.set(0.5);
    this.rule_text.x = level_board.width * 0.17;
    this.rule_text.y = -level_board.height * 0.31;
    title.add(this.rule_text);

    var buttom = this.add.group();
    buttom.scale.set(this.game.screen_ratio);
    buttom.x = this.world.width * 0.5;
    buttom.y = this.world.height * 0.95;

    const buttom_background = this.add.sprite(0, 0, 'buttom_background');
    buttom_background.scale.set(0.5);
    buttom_background.width *= 2;
    buttom_background.anchor.set(0.5);
    buttom.add(buttom_background);

    const help_in_game = this.add.sprite(0, 0, 'help_in_game');
    help_in_game.scale.set(0.5);
    help_in_game.anchor.set(0.5);
    help_in_game.y = -buttom_background.height * 0.25;

    buttom.add(help_in_game);

    const add_time = this.add.sprite(0, 0, 'add_time');
    add_time.scale.set(0.5);
    add_time.anchor.set(0.5);
    add_time.x = buttom_background.width * 0.205;
    add_time.y = -buttom_background.height * 0.3;
    add_time.inputEnabled = true;
    add_time.events.onInputDown.add(this.AddTime, this);
    buttom.add(add_time);

    const prompt = this.add.sprite(0, 0, 'prompt');
    prompt.scale.set(0.5);
    prompt.anchor.set(0.5);
    prompt.x = -buttom_background.width * 0.205;
    prompt.y = -buttom_background.height * 0.3;
    prompt.inputEnabled = true;
    prompt.events.onInputDown.add(this.Prompt, this);
    buttom.add(prompt);
    
    this.map = new Array();
    this.square_number = new Array();

    var border = (this.max_size - this.map_size) / 2;
    for (var i = 0; i < this.max_size; i++) {
      this.map[i] = new Array();
      this.square_number[i] = new Array();
      for (var j = 0; j < this.max_size; j++) {
        if (i < border || j < border || i >= this.max_size - border || j >= this.max_size - border) {
          this.map[i][j] = 0;
        } else {
          this.map[i][j] = 1;
        }
      }
    }

    this.GenerateMap();
    while (this.EliminationExist().a == -1 && this.EliminationExist().b == -1) {
      this.RegenerateMap();
    }

    var numbers = this.add.group();
    numbers.scale.set(this.game.screen_ratio);
    numbers.x = this.world.width * 0.5;
    numbers.y = this.world.height * 0.5;

    this.number_button_array = new Array();

    var number_background = this.add.sprite(0, 0, 'number_0');
    number_background.alpha = 0;
    numbers.add(number_background);

    for (var i = 0; i < this.max_size; i++) {
      this.number_button_array[i] = new Array();
      for (var j = 0; j < this.max_size; j++) {
        var number_image = this.add.sprite(
          number_background.width * 0.27 * (-5 + i),
          number_background.height * 0.27 * (-3.5 + j),
          'number_' + (this.square_number[i][j] + 0).toString(),
        );
        number_image.width = this.square_size; 
        number_image.height = this.square_size;
        number_image.index_i = i;
        number_image.index_j = j;
        number_image.value = this.square_number[i][j];
        number_image.inputEnabled = true;
        number_image.events.onInputDown.add(this.Clicked, this);   
        
        var prominent = this.add.sprite(
          number_background.width * 0.27 * (-5 + i),
          number_background.height * 0.27 * (-3.5 + j),
          'prominent'
        );
        prominent.width = this.square_size; 
        prominent.height = this.square_size;
        prominent.alpha = 0;
        numbers.add(prominent);

        var chosen_border = this.add.sprite(
          number_background.width * 0.27 * (-5 + i),
          number_background.height * 0.27 * (-3.5 + j),
          'chosen_border'
        );
        chosen_border.width = this.square_size; 
        chosen_border.height = this.square_size;
        chosen_border.alpha = 0;
        numbers.add(chosen_border);

        number_image.prominent = prominent;
        number_image.chosen_border = chosen_border;

        if (i < border || j < border || i >= this.max_size - border || j >= this.max_size - border) {
          number_image.alpha = 0;
          number_image.inputEnabled = false;
        }
        this.number_button_array[i][j] = number_image;
        numbers.add(this.number_button_array[i][j]);
        numbers.moveDown(this.number_button_array[i][j]);
        numbers.moveDown(this.number_button_array[i][j]);
      }
    }
  }

  GetSymbol() {
    switch (this.rule) {
      case 1:
          return '+';
      case 2:
          return '-';
      case 3:
          return '*';
      case 4:
          return '/';
    }
  }

  Continue() {
    this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.Tick, this);
    this.continue_button.alpha = 0;
    this.continue_button.inputEnabled = false;
    this.pause.alpha = 1;
    this.pause.inputEnabled = true;
  }

  Pause(sprite, pointer) {
    this.time.events.remove(this.timer);
    this.pause.alpha = 0;
    this.pause.inputEnabled = false;
    this.continue_button.alpha = 1;
    this.continue_button.inputEnabled = true;
  }

  ReturnMenu() {
    this.game.state.start('select');
  }

  AddTime() {
    this.countdown_in_seconds += 10;
  }

  GameOver() {
    this.time_text.text="Game Over";
    this.game.state.start('gameover');
  }

  Tick() {
    this.countdown_in_seconds--;
    var minutes = parseInt(this.countdown_in_seconds / 60);
    var seconds = this.countdown_in_seconds - (minutes * 60);
    var time_string = this.AddZeros(minutes) + ":" + this.AddZeros(seconds);
    this.time_text.text = time_string;
    if (this.countdown_in_seconds == 0) {
      this.GameOver();
    }
  }

  AddZeros(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }

  MissionCompleteJudge() {
    var total = this.map_size * this.map_size;
    for (var i = 0; i < total; i++) {
      var x = parseInt(i / this.map_size) + this.delta;
      var y = i % this.map_size + this.delta;
      if (this.map[x][y]) {
        return false;
      }
    }
    return true;
  }

  RegenerateMap() {
    var count = 0;
    var total = this.map_size * this.map_size;
    for (var i = 0; i < total; i++) {
      var x = parseInt(i / this.map_size) + this.delta;
      var y = i % this.map_size + this.delta;
      if (!this.map[x][y]) {
        continue;
      }
      count++;
    }
    var value = new Array();
    for (var i = 0; i < count / 2; i++) {
      value[i * 2] = this.GenerateFirst();
      value[i * 2 + 1] = this.GeneratePair(value[i * 2]);
      while(!this.GameRule(value[i * 2], value[i * 2 + 1])) {
        value[i * 2] = this.GenerateFirst();
        value[i * 2 + 1] = this.GeneratePair(value[i * 2]);
      }
    }
    var sort_array = this.GenerateOrder(count);
    for (var i = 0; i < count; i++) {
      var x = parseInt(i / this.map_size) + this.delta;
      var y = i % this.map_size + this.delta;
      this.square_number[x][y] = value[sort_array[i]];
    }
  }

  GameRule(a, b) {
    switch (this.rule) {
      case 1:
          return a + b == this.target_number;
      case 2:
          return (a - b == this.target_number || b - a == this.target_number);
      case 3:
          return a * b == this.target_number;
      case 4:
          return (parseInt(a / b) == this.target_number || parseInt(b / a) == this.target_number);
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  cloneArr(arr) {
    return arr.slice(0);
  }

  shuffle(arr, flag = false) {
    var newArr = [];
    flag ? (newArr = arr) : (newArr = this.cloneArr(arr));
    for (var i = 0; i < newArr.length; i++) {
      var j = this.getRandom(0, i);
      var temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
    }
    return newArr;
  }

  GenerateOrder(length) {
    var sort_array = new Array(length);
    for (var i = 0; i < length; i++) {
      sort_array[i] = i;
    }
    return this.shuffle(sort_array);
  }

  GeneratePair(a) {
    switch (this.rule) {
      case 1:
          return this.target_number - a;
      case 2:
          return this.target_number + a;
      case 3:
          return parseInt(this.target_number / a);
      case 4:
          return this.target_number * a;
    }
  }

  GenerateFirst() {
    switch (this.rule) {
      case 1:
          return this.getRandom(0, this.map_max_number);
      case 2:
          return this.getRandom(0, this.map_max_number - this.target_number);
      case 3:
          return this.getRandom(1, this.map_max_number);
      case 4:
          return this.getRandom(1, parseInt(this.map_max_number / this.target_number));
    }
  }

  GenerateMap() {
    var total = this.map_size * this.map_size;
    var unordered_square = new Array(total);
    for (var i = 0; i < total / 2; i++) {
      unordered_square[i * 2] = this.GenerateFirst();
      unordered_square[i * 2 + 1] = this.GeneratePair(unordered_square[i * 2]);
      while(!this.GameRule(unordered_square[i * 2], unordered_square[i * 2 + 1])) {
        unordered_square[i * 2] = this.GenerateFirst();
        unordered_square[i * 2 + 1] = this.GeneratePair(unordered_square[i * 2]);
      }
    }
    var sort_array = this.GenerateOrder(total);
    for (var i = 0; i < this.map_size; i++) {
      for (var j = 0; j < this.map_size; j++) {
        var value = unordered_square[sort_array[i * this.map_size + j]]
        this.square_number[i + this.delta][j + this.delta] = value;
      }
    }
  }

  NextMission() {
    this.game.level++;
    if (this.game.level % 5 == 0) {
      for (var i = 4; i >= 0; i--) {
        if (this.countdown_in_seconds >= this.stars_in_seconds[i]) {
          this.game.stars = i + 1;
          break;
        }
      }
      this.game.state.start('nextmission');
    } else {
      this.game.state.start('play');
    }
  }

  Clicked(sprite, pointer) {
    for (var i = 0; i < this.max_size; i++) {
      for (var j = 0; j < this.max_size; j++) {
        this.number_button_array[i][j].prominent.alpha = 0;
      }
    }
    if (this.chosen_square == -1) {
      var index_i = sprite.index_i;
      var index_j = sprite.index_j;
      this.number_button_array[index_i][index_j].chosen_border.alpha = 1;
      var id = index_i * this.max_size + index_j;
      this.chosen_square = id;
    } else {
      var index_i = parseInt(this.chosen_square / this.max_size);
      var index_j = this.chosen_square % this.max_size;
      this.number_button_array[index_i][index_j].chosen_border.alpha = 0;
      this.number_button_array[index_i][index_j].alpha = 1;
      if (this.EliminationJudgement(index_i, index_j, sprite.index_i, sprite.index_j)) {
        if (this.GameRule(sprite.value, this.square_number[index_i][index_j])) {
          this.ShowPath();
          sprite.alpha = 0;
          this.number_button_array[index_i][index_j].alpha = 0;
          this.number_button_array[index_i][index_j].inputEnabled = false;
          this.number_button_array[sprite.index_i][sprite.index_j].inputEnabled = false;
          this.map[sprite.index_i][sprite.index_j] = 0;
          this.map[index_i][index_j] = 0;
          if (this.MissionCompleteJudge()) {
            this.NextMission();
            return;
          }
          while (this.EliminationExist().a == -1 && this.EliminationExist().b == -1) {
            this.RegenerateMap();
          }
        }
      }
      this.chosen_square = -1;
    }
  }

  ShowPath() {
  }

  EliminationJudgement(sx, sy, ex, ey) {
    var start = sx * this.max_size + sy;
    var target = ex * this.max_size + ey;

    if (start == target) {
      return false;
    }

    var total = this.max_size * this.max_size;
    var turn = new Array(total); //记录每个点的转弯数

    const INF = 30000;
    for (var i = 0; i < total; i++) {
      turn[i] = INF;
    }

    var dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    var q = [];
    q.push(start);
    q.push(-1);
    turn[start] = 0;

    while(q.length > 0) {
      var p = q.shift();
      var pre_dir = q.shift();
      var i = parseInt(p / this.max_size);
      var j = p % this.max_size;
      for (var k = 0; k < 4; k++) {
        var x = i + dir[k][0];
        var y = j + dir[k][1];
        if (x < 0 || x >= this.max_size || y < 0 || y >= this.max_size) {
          continue;
        }
        var next_p = x * this.max_size + y;
        var d = turn[p];
        if (k != pre_dir) {
          d++;
        }
        if (next_p == target) {
          turn[next_p] = Math.min(turn[next_p], d);
          return turn[next_p] < 4;
        }
        if (!this.map[x][y] && turn[next_p] > d) {
          turn[next_p] = d;
          if (d > 3) continue;
          q.push(next_p);
          q.push(k);
        }
      }
    }
    return false;
  }

  Prompt(sprite, pointer) {
    var tmp = this.EliminationExist();
    var i = tmp.a;
    var j = tmp.b;
    var x1 = parseInt(i / this.max_size);
    var y1 = i % this.max_size;
    var x2 = parseInt(j / this.max_size);
    var y2 = j % this.max_size;
    this.number_button_array[x1][y1].prominent.alpha = 1;
    this.number_button_array[x2][y2].prominent.alpha = 1;
  }

  EliminationExist() {
    var result = {
      a: -1,
      b: -1
    }
    var total = this.map_size * this.map_size;
    for (var i = 0; i < total; i++) {
      var x1 = parseInt(i / this.map_size) + this.delta;
      var y1 = i % this.map_size + this.delta;
      if (!this.map[x1][y1]) {
        continue;
      }
      for (var j = i + 1; j < total; j++) {
        var x2 = parseInt(j / this.map_size) + this.delta;
        var y2 = j % this.map_size + this.delta;
        if (!this.map[x2][y2]) {
          continue;
        }
        if (this.EliminationJudgement(x1, y1, x2, y2)) {
          if (this.GameRule(this.square_number[x1][y1], this.square_number[x2][y2])) {
            result.a = x1 * this.max_size + y1;
            result.b = x2 * this.max_size + y2;
            return result;
          }
        }
      }
    }
    return result;
  }
}