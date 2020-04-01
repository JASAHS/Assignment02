/*  
File Name: Bullet.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module objects {
    export class Bullet extends GameObject {


        private _player = objects.Player;
        private _enemy = objects.Enemy;
        private _verticalSpeed?: number; // 5 px per frame

        // constructor
        constructor(
            imagePath: Object = config.Game.ASSETS.getResult("pbullet"),
            x: number = 0, y: number = 0, isCentered: boolean = true) {
            super(imagePath, x, y, isCentered);
            this.Start();
        }


        protected _checkBounds(): void {

        }
        public Start(): void {

        }
        private _move(): void {

        }
        public Update(): void {

        }
        public Reset(): void {

        }

        public Direction(): void {

        }



    }
}