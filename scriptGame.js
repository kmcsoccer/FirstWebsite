/* global createCanvas, frameRate, background, random, noStroke, fill, ellipse, rect,
textSize, text, line, stroke, strokeWeight, keyIsPressed, keyCode, UP_ARROW,
mouseIsPressed, mouseX, mouseY */

var GameOn, lives, score, YPos_red;
var line1_x, line1_y, line1_length;
var line2_x, line2_y, line2_length;
var decreaseLength_line1, decreaseLength_line2;

function setup() {
  createCanvas(400, 400);
  frameRate(75);
  background(250, 223, 150);
  GameOn = true;
  decreaseLength_line1 = decreaseLength_line2 = 1;
  //same as decreaseLength_line1 = 1  and decreaseLength_line2 = 1

  lives = 3;
  score = 0;
  YPos_red = 200;

  line1_x = 440;
  line1_y = random(100, 350);
  line1_length = random(20, 150);

  line2_x = 640;
  line2_y = random(100, 350);
  line2_length = random(20, 150);
}

function draw() {
  if (GameOn == true) {
    // start of GameOn
    background(250, 223, 150);
    noStroke();
    fill(255, 186, 0);

    if (lives == 3) {
      ellipse(30, 30, 25);
      ellipse(30, 70, 25);
      ellipse(30, 110, 25);
    } else if (lives == 2) {
      ellipse(30, 30, 25);
      ellipse(30, 70, 25);
    } else if (lives == 1) {
      ellipse(30, 30, 25);
    } else {
      GameOn = false;
    }
    rect(180, 15, 200, 60, 60);
    fill(0);
    textSize(32);
    text("Score: " + score, 220, 55);

    fill(255, 0, 0);
    ellipse(100, YPos_red, 25, 25);

    if (keyIsPressed && keyCode == UP_ARROW) {
      YPos_red -= 15; //YPos_red = YPos_red-10
    } else {
      YPos_red += 10;
    }

    if (YPos_red >= 385) {
      YPos_red = 385;
    }
    if (YPos_red <= 15) {
      YPos_red = 15;
    }

    stroke(0);
    strokeWeight(4);

    line(line1_x, line1_y, line1_x + line1_length, line1_y);
    line(line2_x, line2_y, line2_x + line2_length, line2_y);
    //line(x1, y, x2, y2)

    line1_x = line1_x - decreaseLength_line1;
    line2_x = line2_x - decreaseLength_line2;

    if (line1_x < 0 - line1_length) {
      line1_x = 400;
      line1_y = random(50, 350);
      line1_length = random(20, 150);
      decreaseLength_line1 += 2;
      lives--; //equal to lives = lives - 1 and lives -= 1
    }

    if (line2_x < 0 - line2_length) {
      line2_x = 400;
      line2_y = random(50, 350);
      line2_length = random(20, 150);
      decreaseLength_line2 += 2;
      lives--; //equal to lives = lives - 1 and lives -= 1
    }

    if (line1_y < YPos_red + 15 && line1_y > YPos_red - 15) {
      if (line1_x < 115 && line1_x + line1_length > 85) {
        line1_x = 400;
        score++;
        line1_y = random(100, 350);
        line1_length = random(20, 150);
        decreaseLength_line1 += 0.5;
      }
    }

    if (line2_y < YPos_red + 15 && line2_y > YPos_red - 15) {
      if (line2_x < 115 && line2_x + line2_length > 85) {
        line2_x = 400;
        score++;
        line2_y = random(100, 350);
        line2_length = random(20, 150);
        decreaseLength_line2 += 0.5;
      }
    }
  } //end of GameOn
  else {
    //what happens if gameOn == false
    background(250, 223, 150);
    noStroke();
    fill(255, 186, 0);
    rect(50, 100, 300, 200, 60);
    //rect(x of top L, y of top L, width, length, corner curves)
    fill(250, 223, 150);
    rect(70, 120, 260, 56, 60); // SCORE
    rect(70, 200, 260, 75, 60); //RESTART BUTTON

    fill(0); //fill(0,0,0)
    textSize(30);
    text("Score: " + score, 140, 159);
    text("Restart", 150, 245);

    if (mouseIsPressed) {
      if (mouseX > 70 && mouseX < 330 && mouseY > 200 && mouseY < 275) {
        setup();
      }
    }
  }
} //end of draw
