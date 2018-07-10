function Particle(x, y, r) {
  var options = {
    friction: 0.1,
    restitution: 0.5
  }
  this.body = Bodies.circle(x, y, r, options)
  World.add(world, this.body);
}