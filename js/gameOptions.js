const gameOptions = {
  width: 375,
  height: 812,

  max_size: 10,

  square_size: 50,
  square_interval: 40,

  map_size:             [2, 2, 4, 6, 8,
                         2, 2, 2, 2, 2],
  map_max_number:       [5, 5, 5, 5, 5,
                         5, 5, 5, 5, 5],
  countdown_in_seconds: [30, 30, 30, 30, 30, 
                         30, 30, 30, 30, 30],
  mission_count: 20,
  mission_in_chapter: 5,
  mission_square_size: 50,
  mission_interval_size: 40,

  completed_mission: [0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0],
}

export default gameOptions;