function Boundary(x, y, w, h, a) {
  var options = {
    isStatic: true,
    friction: 0.2,
    restitution: 0.5,
    angle: a
  }

  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}