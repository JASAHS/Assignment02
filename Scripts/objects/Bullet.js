"use strict";
/*
File Name: Bullet.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        // constructor
        constructor(imagePath = config.Game.ASSETS.getResult("pbullet"), x = 0, y = 0, isCentered = true) {
            super(imagePath, x, y, isCentered);
            this._player = objects.Player;
            this._enemy = objects.Enemy;
            this.Start();
        }
        _checkBounds() {
        }
        Start() {
        }
        _move() {
        }
        Update() {
        }
        Reset() {
        }
        Direction() {
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map