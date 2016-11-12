var GamePad = require('node-gamepad'),
  robot = require("robotjs")

var screenSize = robot.getScreenSize()
var center = { x: screenSize.width / 2, y: screenSize.height / 2 }

var LOW_THRESHOLD = 50,
  HIGH_THRESHOLD = 200,
  MAX_MOVE_OFFSET = 100,
  L2_PRESSED = false,
  R2_PRESSED = false,
  CONTROLLER_PAUSED = false

var controller = new GamePad('ps3/dualshock3')
controller.connect()

//this is the main loop that is holding press event
setInterval(function() {
  if(CONTROLLER_PAUSED)
    return
  if(L2_PRESSED)
    robot.scrollMouse(1, "up");
  if(R2_PRESSED)
    robot.scrollMouse(1, "down");
}, 16)

controller.on('left:move', function(data) {
  if(CONTROLLER_PAUSED)
    return
  if (data.x > LOW_THRESHOLD && data.x < HIGH_THRESHOLD && data.y > LOW_THRESHOLD && data.y < HIGH_THRESHOLD)
    return

  var mouseX = mapJoystickToPixels(data.x, center.x),
    mouseY = mapJoystickToPixels(data.y, center.y)

  robot.moveMouse(mouseX, mouseY);
})

controller.on('x:press', function() {
  if(CONTROLLER_PAUSED)
    return
  robot.mouseToggle('down', 'left');
})

controller.on('x:release', function() {
  robot.mouseToggle('up', 'left');
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
})

function mapJoystickToPixels (joystickPos, screenStartPos) {
  var offset = scale(joystickPos, 0, 255, -MAX_MOVE_OFFSET, MAX_MOVE_OFFSET)
  return screenStartPos + offset

}

function scale (valueIn, baseMin, baseMax, limitMin, limitMax) {
  return ((limitMax - limitMin) * (valueIn - baseMin) / (baseMax - baseMin)) + limitMin;
}