(function() {
  // Best in Chrome, Safari - Firefox has some glitchy control issues.
  $(function() {
    var collision, end_movement, mario, mario_event_listener, move_degree, move_mario, move_times, start_movement, window_width, x_movement, x_movement_dir, x_movement_on, y_movement;
    mario = {
      element: $('.mario'),
      bottom: 40,
      left: 100
    };
    move_times = 10;
    x_movement = null;
    x_movement_on = false;
    x_movement_dir = 0;
    y_movement = null;
    window_width = $(window).width();
    move_degree = function(d) {
      return d * move_times;
    };
    collision = function($div1, $div2) {
      var b1, b2, h1, h2, r1, r2, w1, w2, x1, x2, y1, y2;
      x1 = $div1.offset().left;
      y1 = $div1.offset().top;
      h1 = $div1.outerHeight(true);
      w1 = $div1.outerWidth(true);
      b1 = y1 + h1;
      r1 = x1 + w1;
      x2 = $div2.offset().left;
      y2 = $div2.offset().top;
      h2 = $div2.outerHeight(true);
      w2 = $div2.outerWidth(true);
      b2 = y2 + h2;
      r2 = x2 + w2;
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
      } else {
        return true;
      }
    };
    mario_event_listener = function() {
      return $('.menu .option').each(function(index) {
        if (collision($('.mario'), $(this)) && !$(this).hasClass('touch')) {
          $('.menu .option.touch').removeClass('touch');
          $(this).addClass('touch');
          $(".content .show").removeClass('show');
          return $(`.content .content-index-${index}`).addClass('show');
        }
      });
    };
    move_mario = function(x, y) {
      var new_x, new_y;
      new_x = mario.left + x;
      if (new_x < 5) {
        new_x = 5;
      }
      new_y = mario.bottom + y;
      if (new_y < 40) {
        new_y = 40;
      }
      if (new_y > 190) {
        new_y = 190;
      }
      mario_event_listener();
      mario.bottom = new_y;
      mario.left = new_x;
      return mario.element.css({
        bottom: mario.bottom,
        left: mario.left
      });
    };
    start_movement = function(x, y) {
      // allow rapid change of direction
      if (x !== 0 && x_movement_on && x_movement_dir !== x) {
        end_movement('x');
      }
      if (x !== 0 && !x_movement_on) {
        if (x < 0) {
          mario.element.addClass('left');
        }
        if (x > 0) {
          mario.element.addClass('right');
        }
        x_movement_dir = x;
        x_movement = setInterval(function() {
          return move_mario(move_degree(x), 0);
        }, 100);
        return x_movement_on = true;
      } else if (y !== 0) {
        return y_movement = setInterval(function() {
          return move_mario(0, move_degree(y));
        }, 100);
      }
    };
    end_movement = function(axis) {
      if (axis === 'x') {
        mario.element.removeClass('left');
        mario.element.removeClass('right');
        clearInterval(x_movement);
        return x_movement_on = false;
      } else if (axis === 'y') {
        return clearInterval(y_movement);
      }
    };
    $(window).keydown(function(e) {
      if (e.which === 65 || e.which === 37) {
        return start_movement(-4, 0);
      } else if (e.which === 68 || e.which === 39) {
        return start_movement(4, 0);
      } else if (e.which === 32) {
        if (mario.bottom === 40) { // must be on the ground to jump
          return move_mario(0, move_degree(20));
        }
      }
    });
    $('.content').click(function() {
      if ($('.first-screen').hasClass('show')) {
        $('.first-screen').removeClass('show');
        return $('.getting-started').addClass('show');
      }
    });
    $(window).keyup(function(e) {
      // only stop the animation if the current movement matches that of the button being released, if a change of direction had happened, we want to ignore this button release
      if (e.which === 65 || e.which === 37) {
        if (!(x_movement_dir > 0)) {
          return end_movement('x');
        }
      } else if (e.which === 68 || e.which === 39) {
        if (!(x_movement_dir < 0)) {
          return end_movement('x');
        }
      }
    });
    setInterval(function() {
      if (mario.bottom !== 40) { // gravity
        return move_mario(0, move_degree(-2));
      }
    }, 40);
    return setInterval(function() {
      if (mario.element.hasClass('alternate')) {
        return mario.element.removeClass('alternate');
      } else {
        return mario.element.addClass('alternate');
      }
    }, 80);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTtFQUVBLENBQUEsQ0FBRSxRQUFBLENBQUEsQ0FBQTtBQUVBLFFBQUEsU0FBQSxFQUFBLFlBQUEsRUFBQSxLQUFBLEVBQUEsb0JBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsWUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsYUFBQSxFQUFBO0lBQUEsS0FBQSxHQUFRO01BQ04sT0FBQSxFQUFTLENBQUEsQ0FBRSxRQUFGLENBREg7TUFFTixNQUFBLEVBQVEsRUFGRjtNQUdOLElBQUEsRUFBTTtJQUhBO0lBS1IsVUFBQSxHQUFhO0lBQ2IsVUFBQSxHQUFhO0lBQ2IsYUFBQSxHQUFnQjtJQUNoQixjQUFBLEdBQWlCO0lBQ2pCLFVBQUEsR0FBYTtJQUNiLFlBQUEsR0FBZSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsS0FBVixDQUFBO0lBRWYsV0FBQSxHQUFjLFFBQUEsQ0FBQyxDQUFELENBQUE7YUFDWixDQUFBLEdBQUk7SUFEUTtJQUdkLFNBQUEsR0FBWSxRQUFBLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FBQTtBQUNWLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtNQUFBLEVBQUEsR0FBSyxLQUFLLENBQUMsTUFBTixDQUFBLENBQWMsQ0FBQztNQUNwQixFQUFBLEdBQUssS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFjLENBQUM7TUFDcEIsRUFBQSxHQUFLLEtBQUssQ0FBQyxXQUFOLENBQWtCLElBQWxCO01BQ0wsRUFBQSxHQUFLLEtBQUssQ0FBQyxVQUFOLENBQWlCLElBQWpCO01BQ0wsRUFBQSxHQUFLLEVBQUEsR0FBSztN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biBDaHJvbWUsIFNhZmFyaSAtIEZpcmVmb3ggaGFzIHNvbWUgZ2xpdGNoeSBjb250cm9sIGlzc3Vlcy5cblxuJCAtPlxuXG4gIG1hcmlvID0ge1xuICAgIGVsZW1lbnQ6ICQoJy5tYXJpbycpLFxuICAgIGJvdHRvbTogNDAsXG4gICAgbGVmdDogMTAwXG4gIH1cbiAgbW92ZV90aW1lcyA9IDEwXG4gIHhfbW92ZW1lbnQgPSBudWxsXG4gIHhfbW92ZW1lbnRfb24gPSBmYWxzZVxuICB4X21vdmVtZW50X2RpciA9IDBcbiAgeV9tb3ZlbWVudCA9IG51bGxcbiAgd2luZG93X3dpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcblxuICBtb3ZlX2RlZ3JlZSA9IChkKSAtPlxuICAgIGQgKiBtb3ZlX3RpbWVzXG5cbiAgY29sbGlzaW9uID0gKCRkaXYxLCAkZGl2MikgLT5cbiAgICB4MSA9ICRkaXYxLm9mZnNldCgpLmxlZnRcbiAgICB5MSA9ICRkaXYxLm9mZnNldCgpLnRvcFxuICAgIGgxID0gJGRpdjEub3V0ZXJIZWlnaHQodHJ1ZSlcbiAgICB3MSA9ICRkaXYxLm91dGVyV2lkdGgodHJ1ZSlcbiAgICBiMSA9IHkxICsgaDFcbiAgICByMSA9IHgxICsgdzFcbiAgICB4MiA9ICRkaXYyLm9mZnNldCgpLmxlZnRcbiAgICB5MiA9ICRkaXYyLm9mZnNldCgpLnRvcFxuICAgIGgyID0gJGRpdjIub3V0ZXJIZWlnaHQodHJ1ZSlcbiAgICB3MiA9ICRkaXYyLm91dGVyV2lkdGgodHJ1ZSlcbiAgICBiMiA9IHkyICsgaDJcbiAgICByMiA9IHgyICsgdzJcblxuICAgIGlmIGIxIDwgeTIgfHwgeTEgPiBiMiB8fCByMSA8IHgyIHx8IHgxID4gcjIgXG4gICAgICBmYWxzZVxuICAgIGVsc2VcbiAgICAgIHRydWVcblxuXG4gIG1hcmlvX2V2ZW50X2xpc3RlbmVyID0gKCkgLT5cbiAgICAkKCcubWVudSAub3B0aW9uJykuZWFjaCAoaW5kZXgpIC0+XG4gICAgICBpZiBjb2xsaXNpb24oJCgnLm1hcmlvJyksICQoQCkpICYmICEkKEApLmhhc0NsYXNzICd0b3VjaCdcbiAgICAgICAgJCgnLm1lbnUgLm9wdGlvbi50b3VjaCcpLnJlbW92ZUNsYXNzICd0b3VjaCdcbiAgICAgICAgJChAKS5hZGRDbGFzcyAndG91Y2gnXG4gICAgICAgICQoXCIuY29udGVudCAuc2hvd1wiKS5yZW1vdmVDbGFzcyAnc2hvdydcbiAgICAgICAgJChcIi5jb250ZW50IC5jb250ZW50LWluZGV4LSN7aW5kZXh9XCIpLmFkZENsYXNzICdzaG93J1xuXG4gIG1vdmVfbWFyaW8gPSAoeCx5KSAtPlxuXG4gICAgbmV3X3ggPSBtYXJpby5sZWZ0ICsgeFxuICAgIG5ld194ID0gNSBpZiBuZXdfeCA8IDVcblxuICAgIG5ld195ID0gbWFyaW8uYm90dG9tICsgeVxuICAgIG5ld195ID0gNDAgaWYgbmV3X3kgPCA0MFxuICAgIG5ld195ID0gMTkwIGlmIG5ld195ID4gMTkwXG5cbiAgICBtYXJpb19ldmVudF9saXN0ZW5lcigpXG5cbiAgICBtYXJpby5ib3R0b20gPSBuZXdfeVxuICAgIG1hcmlvLmxlZnQgPSBuZXdfeFxuICAgIG1hcmlvLmVsZW1lbnQuY3NzXG4gICAgICBib3R0b206IG1hcmlvLmJvdHRvbVxuICAgICAgbGVmdDogbWFyaW8ubGVmdFxuXG4gIHN0YXJ0X21vdmVtZW50ID0gKHgseSkgLT5cblxuICAgICMgYWxsb3cgcmFwaWQgY2hhbmdlIG9mIGRpcmVjdGlvblxuICAgIGlmIHggIT0gMCAmJiB4X21vdmVtZW50X29uICYmIHhfbW92ZW1lbnRfZGlyICE9IHhcbiAgICAgIGVuZF9tb3ZlbWVudCgneCcpXG5cbiAgICBpZiB4ICE9IDAgJiYgIXhfbW92ZW1lbnRfb25cbiAgICAgIG1hcmlvLmVsZW1lbnQuYWRkQ2xhc3MoJ2xlZnQnKSBpZiB4IDwgMFxuICAgICAgbWFyaW8uZWxlbWVudC5hZGRDbGFzcygncmlnaHQnKSBpZiB4ID4gMFxuICAgICAgeF9tb3ZlbWVudF9kaXIgPSB4XG4gICAgICB4X21vdmVtZW50ID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgICAgbW92ZV9tYXJpbyBtb3ZlX2RlZ3JlZSh4KSwgMFxuICAgICAgLCAxMDBcbiAgICAgIHhfbW92ZW1lbnRfb24gPSB0cnVlXG4gICAgZWxzZSBpZiB5ICE9IDBcbiAgICAgIHlfbW92ZW1lbnQgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgICBtb3ZlX21hcmlvIDAsIG1vdmVfZGVncmVlKHkpXG4gICAgICAsIDEwMFxuXG4gIGVuZF9tb3ZlbWVudCA9IChheGlzKSAtPlxuICAgIGlmIGF4aXMgPT0gJ3gnXG4gICAgICBtYXJpby5lbGVtZW50LnJlbW92ZUNsYXNzKCdsZWZ0JylcbiAgICAgIG1hcmlvLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3JpZ2h0JylcbiAgICAgIGNsZWFySW50ZXJ2YWwoeF9tb3ZlbWVudClcbiAgICAgIHhfbW92ZW1lbnRfb24gPSBmYWxzZVxuICAgIGVsc2UgaWYgYXhpcyA9PSAneSdcbiAgICAgIGNsZWFySW50ZXJ2YWwoeV9tb3ZlbWVudClcblxuICAkKHdpbmRvdykua2V5ZG93biAoZSkgLT5cbiAgICBpZiBlLndoaWNoID09ICA2NSB8fCBlLndoaWNoID09ICAzN1xuICAgICAgc3RhcnRfbW92ZW1lbnQgLTQsIDBcbiAgICBlbHNlIGlmIGUud2hpY2ggPT0gNjggfHwgZS53aGljaCA9PSAgMzlcbiAgICAgIHN0YXJ0X21vdmVtZW50IDQsIDBcbiAgICBlbHNlIGlmIGUud2hpY2ggPT0gMzJcbiAgICAgIG1vdmVfbWFyaW8gMCwgbW92ZV9kZWdyZWUoMjApIGlmIG1hcmlvLmJvdHRvbSA9PSA0MCAjIG11c3QgYmUgb24gdGhlIGdyb3VuZCB0byBqdW1wXG5cbiAgJCgnLmNvbnRlbnQnKS5jbGljayAtPlxuICAgIGlmICQoJy5maXJzdC1zY3JlZW4nKS5oYXNDbGFzcyAnc2hvdydcbiAgICAgICQoJy5maXJzdC1zY3JlZW4nKS5yZW1vdmVDbGFzcyAnc2hvdydcbiAgICAgICQoJy5nZXR0aW5nLXN0YXJ0ZWQnKS5hZGRDbGFzcyAnc2hvdydcbiAgXG4gICQod2luZG93KS5rZXl1cCAoZSkgLT5cbiAgICAjIG9ubHkgc3RvcCB0aGUgYW5pbWF0aW9uIGlmIHRoZSBjdXJyZW50IG1vdmVtZW50IG1hdGNoZXMgdGhhdCBvZiB0aGUgYnV0dG9uIGJlaW5nIHJlbGVhc2VkLCBpZiBhIGNoYW5nZSBvZiBkaXJlY3Rpb24gaGFkIGhhcHBlbmVkLCB3ZSB3YW50IHRvIGlnbm9yZSB0aGlzIGJ1dHRvbiByZWxlYXNlXG4gICAgaWYgZS53aGljaCA9PSAgNjUgfHwgZS53aGljaCA9PSAgMzdcbiAgICAgIGVuZF9tb3ZlbWVudCAneCcgdW5sZXNzIHhfbW92ZW1lbnRfZGlyID4gMCBcbiAgICBlbHNlIGlmIGUud2hpY2ggPT0gNjggfHwgZS53aGljaCA9PSAgMzlcbiAgICAgIGVuZF9tb3ZlbWVudCAneCcgdW5sZXNzIHhfbW92ZW1lbnRfZGlyIDwgMFxuXG4gIHNldEludGVydmFsICgpIC0+XG4gICAgbW92ZV9tYXJpbyAwLCBtb3ZlX2RlZ3JlZSgtMikgdW5sZXNzIG1hcmlvLmJvdHRvbSA9PSA0MCAjIGdyYXZpdHlcbiAgLCA0MFxuXG4gIHNldEludGVydmFsICgpIC0+XG4gICAgaWYgbWFyaW8uZWxlbWVudC5oYXNDbGFzcyAnYWx0ZXJuYXRlJ1xuICAgICAgbWFyaW8uZWxlbWVudC5yZW1vdmVDbGFzcyAnYWx0ZXJuYXRlJ1xuICAgIGVsc2VcbiAgICAgIG1hcmlvLmVsZW1lbnQuYWRkQ2xhc3MgJ2FsdGVybmF0ZSdcbiAgLCA4MFxuIl19
//# sourceURL=coffeescript