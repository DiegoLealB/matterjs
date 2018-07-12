 //module aliases
 var Engine = Matter.Engine,
 Render = Matter.Render,
 Runner = Matter.Runner,
 Composites = Matter.Composites,
 Events = Matter.Events,
 Constraint = Matter.Constraint,
 MouseConstraint = Matter.MouseConstraint,
 Mouse = Matter.Mouse,
 World = Matter.World,
 Bodies = Matter.Bodies;

 // create engine
 var engine = Engine.create(),
 world = engine.world;

 // create renderer
 const width = 800;
 const height = 600;

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

 // create bodies
 var ground = Bodies.rectangle(width/2, height, width, 50, {isStatic: true});
 var playerOptions = {density: 0.004};
 var anchor = { x:170, y:450};
 var player = Bodies.polygon(150, 450, 8, 20, playerOptions);
 var elastic = Constraint.create({
   pointA: anchor,
   pointB: player,
   stiffness: 0.05
 });
 var pyramid = Composites.pyramid(400, 300, 15, 10, 0, 0, (x, y) => {
   return Bodies.rectangle(x, y, 25, 40);
 });

 World.add(world, [ground, player, elastic, pyramid])


 Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (player.position.x > 190 || player.position.y < 430)) {
      player = Bodies.polygon(170, 450, 7,20, playerOptions);
      World.add(engine.world, player);
      elastic.bodyB = player;
    }
 })

 // add mouse control
 var mouse = Mouse.create(render.canvas);
 var mouseConstraint = MouseConstraint.create(engine, {
   mouse: mouse,
   constraint: {
     stiffness: 0.2,
     render: {
       visible: false
     }
   }
 });
 World.add(world, mouseConstraint);

 // keep mouse in sync with rendering
 render.mouse = mouse;

 