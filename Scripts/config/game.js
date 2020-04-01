"use strict";
/*
File Name: game.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var config;
(function (config) {
    class Game {
    }
    Game.SCREEN_WIDTH = 640;
    Game.SCREEN_HEIGHT = 800;
    Game.LIVES = 3;
    Game.SCORE = 0;
    Game.HIGH_SCORE = 0;
    Game.STATUS = false;
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map