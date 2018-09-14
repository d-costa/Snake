function Food() {
  this.x = 0;
  this.y = 0;


  this.changePosition = function(forbidden, lenght) {
    var cols = floor(width/ratio);
    var rows = floor(height/ratio);
    this.x = floor(random(cols)) * ratio;
    this.y = floor(random(rows)) * ratio;
    // do not spawn on top of body of snake
    for (var i = 0; i < lenght; i++) {
      if(forbidden[i][0] == this.x || forbidden[i][1] == this.y)
        this.changePosition(forbidden)
    }
  }

  this.show = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, ratio, ratio);
  }

}
