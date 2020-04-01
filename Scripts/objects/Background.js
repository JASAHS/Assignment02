"use strict";
/*
File Name: Background.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var objects;
(function (objects) {
    class Background extends objects.GameObject {
        //public properities
        //constructor
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);
            this.Start();
        }
        //provate method
        _checkBounds() {
            if (this.position.y >= 0) {
                this.Reset();
            }
        }
        _move() {
            this.position = objects.Vector2.add(this.position, this.velocity);
        }
        //public method
        Start() {
            this._verticalSpeed = 20;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
            this.position.y = -2400;
        }
    }
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=Background.js.map