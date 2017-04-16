function Clock(canvas, hour, minute) {

  this._canvas = canvas;
  this._hour   = hour % 12;
  this._minute = minute;
  this._ctx    = canvas.getContext('2d');
  this._radius  = canvas.height / 2;

  this.init();
}

Clock.prototype = {

  init: function() {
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0,0, this._canvas.width, this._canvas.height);
    this._ctx.translate(this._radius, this._radius);
    this._radius = this._radius * .9;
    this.drawClock();
  },

  drawClock: function() {
    this._drawFace();
    this._drawNumbers();
    this._drawTime();
  },

  _drawFace: function() {
    this._ctx.beginPath();

    this._ctx.arc(0, 0, this._radius, 0, 2*Math.PI);
    this._ctx.fillStyle = 'white';
    this._ctx.fill();

    var grad = this._ctx.createRadialGradient(0,0,this._radius*0.95, 0,0,this._radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    this._ctx.strokeStyle = grad;

    this._ctx.lineWidth = this._radius*0.1;
    this._ctx.stroke();
    this._ctx.beginPath();
    this._ctx.arc(0, 0, this._radius*0.1, 0, 2*Math.PI);
    this._ctx.fillStyle = '#333';
    this._ctx.fill();
  },

  _drawNumbers: function() {
    this._ctx.font = this._radius*0.15 + "px arial";
    this._ctx.textBaseline="middle";
    this._ctx.textAlign="center";
    for(var num = 1; num < 13; num++){
      var ang = num * Math.PI / 6;
      this._ctx.rotate(ang);
      this._ctx.translate(0, -this._radius*0.85);
      this._ctx.rotate(-ang);
      this._ctx.fillText(num.toString(), 0, 0);
      this._ctx.rotate(ang);
      this._ctx.translate(0, this._radius*0.85);
      this._ctx.rotate(-ang);
    }
  },

  _drawTime: function() {
    var hPos = (this._hour * Math.PI / 6) + (this._minute * Math.PI / (6 * 60));
    this._drawHand(hPos, this._radius * 0.5, this._radius * 0.07);

    var mPos  =(this._minute * Math.PI / 30) + (1 * Math.PI / (30 * 60));
    this._drawHand(mPos, this._radius * 0.8, this._radius * 0.07);
  },

  _drawHand: function(pos, l, w) {
    this._ctx.beginPath();
    this._ctx.lineWidth = w;
    this._ctx.lineCap = "round";
    this._ctx.moveTo(0,0);
    this._ctx.rotate(pos);
    this._ctx.lineTo(0, -l);
    this._ctx.stroke();
    this._ctx.rotate(-pos);
  }
}
