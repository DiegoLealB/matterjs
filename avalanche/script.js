
    //module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
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

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });
    
    World.add(world, stack);
    
    World.add(world, [
        Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }),
        Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
        Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })
    ]);

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

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    Events.on(mouseConstraint, 'mousedown', (event) => {
        console.log(world.bodies);
    });

    Events.on(mouseConstraint, 'mousedown', (event) => {
        var mousePosition = event.mouse.position;
        World.add(world, Bodies.circle(mousePosition.x, mousePosition.y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 }))
        world.bodies.forEach(body => {
            if (body.position.y > 600) {
                Composite.remove(world, body)
            }
        });
    });
