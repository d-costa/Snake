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
        this.tail[i] = this.tail[i+1];
      }
      this.tail[this.size-1] = [this.x, this.y];

      this.x += this.x_speed * ratio;
      this.y += this.y_speed * ratio;
      this.x = constrain(this.x, 0, width-ratio);
      this.y = constrain(this.y, 0, height-ratio);
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

    this.eat = function() {
      this.tail[this.size] = [this.x, this.y];
      this.size += 1;
      this.x += this.x_speed * ratio;
      this.y += this.y_speed * ratio;
    }

    this.willHitFood = function(pos) {
        var future_x = this.x + this.x_speed * ratio;
        var future_y = this.y + this.y_speed * ratio;
        var d = dist(pos.x, pos.y, future_x, future_y);
        return d < 10;
    }

    this.willHitBorder = function() {
        var future_x = this.x + this.x_speed * ratio;
        var future_y = this.y + this.y_speed * ratio;
        return (future_x < 0 || future_x + ratio > width
            || future_y < 0 || future_y + ratio > height);
    }

    this.willHitTail = function() {
        var future_x = this.x + this.x_speed * ratio;
        var future_y = this.y + this.y_speed * ratio;
        for(var i = 0; i < this.size; i++) {
          x = this.tail[i][0];
          y = this.tail[i][1];
          var d = dist(future_x, future_y, x, y);
          if(d < 1) {
              return true;
          }
        }
        return false;
    }


}
