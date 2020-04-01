/*  
File Name: Background.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module objects {
    export class Background extends GameObject {
        // private instance menbers
        private _verticalSpeed?: number; // 5 px per frame

        //public properities

        //constructor
        constructor(imagePath: Object = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);

            this.Start();
        }

        //provate method
        protected _checkBounds(): void {
            if (this.position.y >= 0) {
                this.Reset();
            }

        }

        private _move(): void {
            this.position = Vector2.add(this.position, this.velocity);
        }

        //public method
        public Start(): void {
            this._verticalSpeed = 20;
            this.velocity = new Vector2(0, this._verticalSpeed);
            this.Reset();

        }

        public Update(): void {
            this._move();
            this._checkBounds();

        }

        public Reset(): void {
            this.position.y = -2400;
        }
    }
}