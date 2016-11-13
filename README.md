# slither-joystick-controller
Simple script to bind joystick controller to Slither mouse events

[![npm version](https://img.shields.io/npm/v/slither-joystick-controller.svg?style=flat-square)](https://www.npmjs.com/package/slither-joystick-controller)
[![npm downloads](https://img.shields.io/npm/dm/slither-joystick-controller.svg?style=flat-square)](http://npm-stat.com/charts.html?package=slither-joystick-controller&from=2015-01-01)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

> For now, only PS3 dualshock3 is supported.

## Installation

```
npm i slither-joystick-controller
```

## How to run

1. go to the `node_modules/slither-joystick-controller` folder
2. run `node index.js` or `node index.js supported/controller/here`

### Supported Controllers
- ps3/dualshock3 (default)
- ps4/dualshock4
- snes/tomee
- snes/retrolink
- n64/retrolink
- logitech/rumblepad2
- logitech/dualaction
- logitech/gamepadf710
- microsoft/sidewinder-precision-2

These controllers are handled by [node-gamepad](https://github.com/carldanley/node-gamepad). If you need to add another controller, see the [Contributing Controllers](https://github.com/carldanley/node-gamepad#contributing-controllers) of `node-gamepad`.

## How to use

Game pad action | Slither action
--- | ---
start | `pause/unpause` all the other actions.
L3 | `move mouse`
X | `boost`
triangle | `enter` - use to start the game
L2 | `zoom out` (require [Slither plus](https://chrome.google.com/webstore/detail/slitherplus-zoom-skin-cre/cpbghpalffgmgocmnigfhalghmaemffo) extension)
R2 | `zoom in` (require [Slither plus](https://chrome.google.com/webstore/detail/slitherplus-zoom-skin-cre/cpbghpalffgmgocmnigfhalghmaemffo) extension)
select | redefine center position. It can be useful when the game is not in full screen. Place your mouse on the snake head and press `select` to set the center.

## Libraries used in this project

- [node-gamepad](https://github.com/carldanley/node-gamepad) - for reading controller inputs
- [robotjs](https://github.com/octalmage/robotjs) - for firing mouse/keyboards events
- [node-notifier](https://github.com/mikaelbr/node-notifier) - for displaying notifications
