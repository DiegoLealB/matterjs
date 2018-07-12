  //module aliases
  var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Events = Matter.Events,
  Common = Matter.Common;

  // create engine
  var engine = Engine.create(),
  world = engine.world;

  // create renderer
  const width = 800;
  const height = 700;

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: width,
        height: height,
        showAngleIndicator: true
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // adding a single test ball
  // var p = new Particle(400, 50, 30);

  // adding boundries
  var floor = new Boundary(width / 2, height, width, 20, Math.PI);
  var eastWall = new Boundary(width, height / 2, 20, height, Math.PI * 2);
  var westWall = new Boundary(0, height / 2, 20, height, Math.PI);
  for (let i = 0; i < width; i+= width / 8) {
    var slots = [
      new Boundary(i, height - 50, 10, 100, Math.PI)
    ]
  }


  // adding pegs
  var pegs = [];
  var rows = 9;
  var cols = 6;
  spacing = width / 10;

  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++) {
      var x = 50 + i * spacing; 
      var y = 50 + spacing / 2 + j * spacing; //offsetting pegs by half their distance
      if (j % 2 == 1) {
        x = x + spacing / 2;
      }
      pegs.push(new Peg(x, y, 5))
    }
  }
  World.add(world, pegs)

  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true
          }
        }
      });
  World.add(world, mouseConstraint);
  render.mouse = mouse;

  // create a new ball on each mouse click
  Events.on(mouseConstraint, 'mousedown', (event) => {
    var mousePosition = event.mouse.position;
    World.add(world, new Particle(mousePosition.x, mousePosition.y, 30))
  });