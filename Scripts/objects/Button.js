"use strict";
/*
File Name: Button.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var objects;
(function (objects) {
    class Button extends objects.GameObject {
        // constructor
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder"), x = 0, y = 0, isCentered = true) {
            super(imagePath, x, y, isCentered);
            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);
            this.Start();
        }
        // PRIVATE LIFE CYCLE METHODS
        _checkBounds() {
        }
        // PUBLIC Methods
        HoverOver() {
            this.alpha = 0.7;
        }
        HoverOut() {
            this.alpha = 1.0;
        }
        // PUBLIC LIFE CYCLE METHODS
        /**
         * Initialization happens here
         *
         * @memberof Button
         */
        Start() {
        }
        Update() {
        }
        Reset() {
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map