function Snake() {
    this.x = 0;  // head starting location
    this.y = 0;
    this.x_speed = 1;
    this.y_speed = 0;
    this.size = 0;  // number of squares besides the head
    this.tail = [];  // the positions of the rest of the snake, excluding head,
                    // smaller positions have oldest positions

    this.update = function() {
      for(var i = 0; i < this.size - 1; i++) {
        this.tail[i] = this.tail[i+1]
      }
      this.tail[this.size-1] = [this.x, this.y]

      this.x += this.x_speed * ratio;
      this.y += this.y_speed * ratio;
      this.x = constrain(this.x, -1, width-ratio + 1);
      this.y = constrain(this.y, -1, height-ratio + 1);
    }

    this.show = function() {
      fill(255);
      rect(this.x, this.y, ratio, ratio);

      for(var i = 0; i < this.size; i++) {
        rect(this.tail[i][0], this.tail[i][1], ratio, ratio);
      }
    }

    this.direction = function(dir_x, dir_y) {
      this.x_speed = dir_x;
      this.y_speed = dir_y;
    }

    this.checkFood = function(pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      if(d < 1) {
        return true;
      } else {
        return false;
      }
    }

    this.eat = function() {
      this.tail[this.size] = [this.x, this.y];
      this.size += 1;
    }

    this.insideBorders = function() {
      return (this.x >= 0 && this.x + ratio <= width && this.y >= 0 && this.y + ratio <= height);
    }


}
