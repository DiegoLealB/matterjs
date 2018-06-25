

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composites = Matter.Composites;

    
// create an engine
var engine = Engine.create();
world = engine.world;

// create renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
      width: 800,
      height: 600,
      showAngleIndicator: true
  }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var roof = Bodies.rectangle(400, -10, 810, 60, {isStatic: true });
var westWall = Bodies.rectangle(-10, 400, 800, 60, { isStatic: true, angle: Math.PI * 0.5 });
var eastWall = Bodies.rectangle(810, 400, 800, 60, { isStatic: true, angle: Math.PI * 0.5 });

// create circles
var stack = Composites.stack(10, 10, 10, 5, 20, 0, function(x, y) {
  return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
});

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, roof, mouseConstraint, stack, westWall, eastWall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);