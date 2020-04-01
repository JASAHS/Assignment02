/*  
File Name: game.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module config {
    export class Game {
        public static STAGE: createjs.Stage;
        public static SCENE_STATE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static SCREEN_WIDTH: number = 640;
        public static SCREEN_HEIGHT: number = 800;
        public static keyboardManager: managers.Keyboard;
        public static LIVES: number = 3;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static STATUS: boolean = false;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static IMAGE: objects.Button;
    }
}