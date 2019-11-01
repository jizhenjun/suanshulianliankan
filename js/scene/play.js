import Phaser from '../libs/phaser-wx.js';
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
    this.countdown_in_seconds = gameOptions.countdown_in_seconds[this.game.level];

    this.level_text = this.add.text(0, 100, 'level:' + this.game.level);

    this.max_size = gameOptions.max_size;
    this.square_size = gameOptions.square_size;
    this.square_interval = gameOptions.square_interval;

    var minutes = Math.floor(this.countdown_in_seconds / 60);
    var seconds = this.countdown_in_seconds - (minutes * 60);
    var time_string = this.AddZeros(minutes) + ":" + this.AddZeros(seconds);
    this.time_text = this.add.text(50, 50, time_string);
    this.time_text.fill = "#ffffff";
    this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.Tick, this);

    this.delta = (this.max_size - this.map_size) / 2;

    this.chosen_square = -1;
    
    this.tArray = new Array();
    this.map = new Array();
    for (var i = 0; i < this.max_size; i++) {
      this.tArray[i] = new Array();
      this.map[i] = new Array();
      for (var j = 0; j < this.max_size; j++) {
        this.map[i][j] = 1;
        let bg = this.add.sprite(
          (i - 1) * this.square_size,
          (j - 1) * this.square_size + 100,
          'particle1'
        );
        bg.width = this.square_interval; 
        bg.height = this.square_interval;
        bg.index_i = i;
        bg.index_j = j;
        bg.coordinate_x = (i - 1) * this.square_size;
        bg.coordinate_y = (j - 1) * this.square_size + 100;
        bg.inputEnabled = true;
        bg.events.onInputDown.add(this.Clicked, this);

        var _style = {
          fill: "#000",
          fontSize: "12pt"
        };
        bg.number_text = this.add.text(bg.coordinate_x + this.square_size / 4, 
          bg.coordinate_y + this.square_size / 4, bg.value, _style);

        var border = (this.max_size - this.map_size) / 2;
        if (i < border || j < border || i >= this.max_size - border || j >= this.max_size - border) {
          bg.alpha = 0;
          bg.inputEnabled = false;
          bg.number_text.alpha = 0;
          this.map[i][j] = 0;
        }
        this.tArray[i][j] = bg;
      }
    }

    this.GenerateMap();
    while (this.EliminationExist().a == -1 && this.EliminationExist().b == -1) {
      this.RegenerateMap();
    }

    var prompt_button = this.add.sprite(0, 0, 'prompt');
    prompt_button.width = 50;
    prompt_button.height = 50;
    prompt_button.inputEnabled = true;
    prompt_button.events.onInputDown.add(this.prompt, this);

    var add_time_button = this.add.sprite(0, 50, 'overtime');
    add_time_button.width = 50;
    add_time_button.height = 50;
    add_time_button.inputEnabled = true;
    add_time_button.events.onInputDown.add(this.AddTime, this);

    var return_menu_button = this.add.sprite(0, 100, 'exit');
    return_menu_button.width = 50;
    return_menu_button.height = 50;
    return_menu_button.inputEnabled = true;
    return_menu_button.events.onInputDown.add(this.ReturnMenu, this);

    // todo:
    // var pause_button = this.add.sprite(0, 150, 'pause');
    // pause_button.width = 50;
    // pause_button.height = 50;
    // pause_button.inputEnabled = true;
    // pause_button.events.onInputDown.add(this.Pause, this);
  }

  ReturnMenu() {
    this.game.state.start('select');
  }

  AddTime() {
    this.countdown_in_seconds += 10;
  }

  GameOver() {
    this.time.events.remove(this.timer);
    this.time_text.text="Game Over";
    this.game.state.start('select');
  }

  Tick() {
    this.countdown_in_seconds--;
    var minutes = Math.floor(this.countdown_in_seconds / 60);
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

  MissionComplete() {
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
    var value = [];
    var position = [];
    var total = this.map_size * this.map_size;
    for (var i = 0; i < total; i++) {
      var x = parseInt(i / this.map_size) + this.delta;
      var y = i % this.map_size + this.delta;
      if (!this.map[x][y]) {
        continue;
      }
      value.push(this.tArray[x][y].value);
      position.push(i);
      count++;
    }
    var sort_array = this.GenerateOrder(count);
    for (var i = 0; i < count; i++) {
      var x = parseInt(position[i] / this.max_size);
      var y = position[i] % this.max_size;
      this.tArray[x][y].value = value[sort_array[i]];
      this.tArray[x][y].number_text.setText(sort_array[i]);
    }
  }

  GameRule(a, b) {
    switch (this.game.level) {
      case 0:
          return a + b == this.map_max_number;
      case 1:
          return a + b == this.map_max_number;
      case 2:
          return a + b == this.map_max_number;
      case 3:
          return a + b == this.map_max_number;
      case 4:
          return a + b == this.map_max_number;
      case 5:
          return a + b == this.map_max_number;
      case 6:
          return a + b == this.map_max_number;
      case 7:
          return a + b == this.map_max_number;
      case 8:
          return a + b == this.map_max_number;
      case 9:
          return a + b == this.map_max_number;
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

  GenerateMap() {
    var total = this.map_size * this.map_size;
    var unordered_square = new Array(total);
    for (var i = 0; i < total / 2; i++) {
      unordered_square[i * 2] = this.getRandom(0, this.map_max_number);
      unordered_square[i * 2 + 1] = this.map_max_number - unordered_square[i * 2];
    }
    var sort_array = this.GenerateOrder(total);
    for (var i = 0; i < this.map_size; i++) {
      for (var j = 0; j < this.map_size; j++) {
        var value = unordered_square[sort_array[i * this.map_size + j]]
        this.tArray[i + this.delta][j + this.delta].value = value;
        this.tArray[i + this.delta][j + this.delta].number_text.setText(value);
      }
    }
  }

  NextMission() {
    this.game.level++;
    if (this.game.level % 5 == 0) {
      this.game.state.start('select');
    } else {
      this.game.state.start('play');
    }
  }

  Clicked(sprite, pointer) {
    if (this.chosen_square == -1) {
      sprite.alpha = 0;
      var index_i = sprite.index_i;
      var index_j = sprite.index_j;
      var id = index_i * this.max_size + index_j;
      this.chosen_square = id;
    } else {
      var index_i = parseInt(this.chosen_square / this.max_size);
      var index_j = this.chosen_square % this.max_size;
      this.tArray[index_i][index_j].alpha = 1;
      if (this.EliminationJudgement(index_i, index_j, sprite.index_i, sprite.index_j)) {
        if (this.GameRule(sprite.value, this.tArray[index_i][index_j].value)) {
          sprite.alpha = 0;
          this.tArray[index_i][index_j].alpha = 0;
          this.map[sprite.index_i][sprite.index_j] = 0;
          this.map[index_i][index_j] = 0;
          sprite.number_text.alpha = 0;
          this.tArray[index_i][index_j].number_text.alpha = 0;
          if (this.MissionComplete()) {
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

  prompt(sprite, pointer) {
    var tmp = this.EliminationExist();
    var i = tmp.a;
    var j = tmp.b;
    var x1 = parseInt(i / this.max_size);
    var y1 = i % this.max_size;
    var x2 = parseInt(j / this.max_size);
    var y2 = j % this.max_size;
    this.tArray[x1][y1].number_text.addColor('#fff', 0);
    this.tArray[x2][y2].number_text.addColor('#fff', 0);
  }

  EliminationExist() {
    var result = {
      a: -1,
      b: -1
    }
    var total = this.map_size * this.map_size;
    for (var i = 0; i < total; i++) {
      var x1 = parseInt(i / this.map_size + this.delta);
      var y1 = i % this.map_size + this.delta;
      if (!this.map[x1][y1]) {
        continue;
      }
      for (var j = i + 1; j < total; j++) {
        var x2 = parseInt(j / this.map_size + this.delta);
        var y2 = j % this.map_size + this.delta;
        if (!this.map[x2][y2]) {
          continue;
        }
        if (this.EliminationJudgement(x1, y1, x2, y2)) {
          if (this.GameRule(this.tArray[x1][y1].value, this.tArray[x2][y2].value)) {
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