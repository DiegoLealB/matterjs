function Peg(x, y, r) {
  var options = {
    isStatic: true,
    friction: 0.1,
    restitution: 1
  }

  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);
}