// Level 1: where the player chooses which avatar to use

var level1 = makeLevel(game, 1);

level1.show_click_text_1 = false;
level1.show_click_text_2 = false;
level1.show_click_text_3 = false;
level1.showText = function() {
  game.setFont(game.display.font_normal);
  text(game.ctx, "Many bodies walk the earth, but you only get one.", xy(400, 30), "centered");
  text(game.ctx, "Choose it now!", xy(400, 60), "centered");
  
  game.setFont(game.display.font_small, "italic");
  text(game.ctx, "To release one from its prison,", xy(400,540), "centered")
  text(game.ctx, "hover and click over the darkened track.", xy(400,560), "centered")
  
  if (this.show_click_text_1) {
  game.setFont(game.display.font_tiny, "italic");
    text(game.ctx, "Click to open track", xy(506,460), "nw");
  }
  if (this.show_click_text_2) {
  game.setFont(game.display.font_tiny, "italic");
    text(game.ctx, "Click to open track", xy(255,490), "nw");
  }
  if (this.show_click_text_3) {
  game.setFont(game.display.font_tiny, "italic");
    text(game.ctx, "Click to open track", xy(87, 367), "nw");
  }
  
}
level1.tickActions.push(function() {
  this.show_click_text_1 = false;
  this.show_click_text_2 = false;
  this.show_click_text_3 = false;
  if (track1_1center.clicker1.contains(mouse.pos)) {
    this.show_click_text_1 = true;
    // TODO: put train1 text here
  }
  else if (track1_2center.clicker1.contains(mouse.pos)) {
    this.show_click_text_2 = true;
    // TODO: put train2 text here
  }
  else if (track1_3center.clicker1.contains(mouse.pos)) {
    this.show_click_text_3 = true;
    // TODO: put train3 text here
  }
  else {
  }
});

var l1_center = xy(400, 260);
var l1_r = 220;


var track1_1 = makeCircleTrack(level1, add(l1_center, rth(l1_r, 0.12 * Math.PI*2)), 40);
var track1_2 = makeCircleTrack(level1, add(l1_center, rth(l1_r, 0.25 * Math.PI*2)), 40);
var track1_3 = makeCircleTrack(level1, add(l1_center, rth(l1_r, 0.38 * Math.PI*2)), 40);
var track1_center = makeCircleTrack(level1, l1_center, 100);
var track1_end = makeCircleTrack(level1, xy(830, l1_center.y-80), 20);
track1_end.setEnd();


// These tracks are just for testing the inner/outer tangent correctness
//var track1_0 = makeCircleTrack(level1, xy(100, 250), 50); // temp
//var track1_03 = makeInnerTangentTrack(level1, track1_0, track1_3, 1); // temp


var track1_1center = makeOuterTangentTrack(level1, track1_1, track1_center, 0);
var track1_2center = makeOuterTangentTrack(level1, track1_2, track1_center, 0);
var track1_3center = makeOuterTangentTrack(level1, track1_3, track1_center, 0);

var track1_centerend = makeOuterTangentTrack(level1, track1_center, track1_end, 0);


level1.joints_toggled_on = [
  [track1_center, track1_1center],
  [track1_center, track1_2center],
  [track1_center, track1_3center],
  [track1_center, track1_centerend],
  [track1_end, track1_centerend],
]
level1.loadActions.push(function() {
  game.setAllJoints(false);
  for (var i = 0; i < this.joints_toggled_on.length; i++) {
    this.joints_toggled_on[i][0].connections[this.joints_toggled_on[i][1].id] = true;
  }
  
  game.resetPlayerTrain()
  
  game.train1.setTrack(track1_1, 0, 1);
  game.train2.setTrack(track1_2, 0, 1);
  game.train3.setTrack(track1_3, 0, 1);
  
  game.train1.enable()
  game.train2.enable()
  game.train3.enable()
});

level1.leaveActions.push(function() {
  game.train1.disable()
  game.train2.disable()
  game.train3.disable()
});
