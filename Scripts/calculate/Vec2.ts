/*  
File Name: Vec2.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module calculate {
    export class Vec2 extends createjs.Point {

        //constructor
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }

        //public methods
        public static Distance(P1: Vec2, P2: Vec2): number {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }

    }//end class
}//end module