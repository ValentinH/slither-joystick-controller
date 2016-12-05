var GamePad = require('node-gamepad'),
  robot = require("robotjs"),
  notifier = require('node-notifier')

var screenSize = robot.getScreenSize(),
  center = { x: screenSize.width / 2, y: screenSize.height / 2 }

var DEFAULT_CONTROLLER = 'ps3/dualshock3',
  LOW_THRESHOLD = 5,
  HIGH_THRESHOLD = 250,
  MAX_MOVE_OFFSET = 100,
  ANGLE = 0,
  MOUSE_X = center.x,
  MOUSE_Y = center.y,
  L2_PRESSED = false,
  R2_PRESSED = false,
  CONTROLLER_PAUSED = false

var controller_type = DEFAULT_CONTROLLER
var args = process.argv.slice(2)
if (args.length > 0)
  controller_type = args[0]

var controller = new GamePad(controller_type)
try {
  controller.connect()
}
catch (e) {
  throw new Error('Unable to connect to a controller of type ' + controller_type)
}

//this is the main loop that is holding press event
startEventLoop()
bindControllerListeners()
console.log('Listening on controller: ' + controller_type)

function startEventLoop () {
  return setInterval(function() {
    if (CONTROLLER_PAUSED)
      return
    if (L2_PRESSED)
      robot.scrollMouse(1, 'up')
    if (R2_PRESSED)
      robot.scrollMouse(1, 'down')

    MOUSE_X = center.x + Math.cos(ANGLE) * MAX_MOVE_OFFSET
    MOUSE_Y = center.y + Math.sin(ANGLE) * MAX_MOVE_OFFSET

    robot.moveMouse(MOUSE_X, MOUSE_Y)
  }, 16)
}

function bindControllerListeners () {
  controller.on('left:move', function(data) {
    if (CONTROLLER_PAUSED)
      return
    if (data.x > LOW_THRESHOLD && data.x < HIGH_THRESHOLD && data.y > LOW_THRESHOLD && data.y < HIGH_THRESHOLD)
      return
    ANGLE = getAngle(data.x - 255 / 2, data.y - 255 / 2)
  })

  controller.on('x:press', function() {
    if (CONTROLLER_PAUSED)
      return
    robot.mouseToggle('down', 'left')
  })

  controller.on('x:release', function() {
    robot.mouseToggle('up', 'left')
  })

  controller.on('triangle:press', function() {
    if (CONTROLLER_PAUSED)
      return
    robot.keyTap('enter')
  })

  controller.on('l2:press', function() {
    L2_PRESSED = true
  })

  controller.on('r2:press', function() {
    R2_PRESSED = true
  })

  controller.on('l2:release', function() {
    L2_PRESSED = false
  })

  controller.on('r2:release', function() {
    R2_PRESSED = false
  })

  controller.on('start:press', function() {
    CONTROLLER_PAUSED = !CONTROLLER_PAUSED
    if (CONTROLLER_PAUSED)
      notify('Paused')
    else
      notify('Listening')
  })

  controller.on('select:press', function() {
    center = robot.getMousePos()
  })
}

function getAngle (x, y) {
  return Math.atan2(y, x)
}

function notify (msg) {
  notifier.notify({
    title: 'Slither Controller',
    message: msg,
    timeout: 2
  })
}