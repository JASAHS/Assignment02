/*  
File Name: Instruction.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module scenes {
    export class Instruction extends objects.Scene {

        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _instruct: objects.Image;
        private _menuButton: objects.Button;
        private _instructLabel: objects.Label;



        // CONSTRUCTOR
        constructor() {
            super();
            this._background = new objects.Background();
            this._instruct = new objects.Image();
            this._instructLabel = new objects.Label();
            this._menuButton = new objects.Button();
            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._instruct = new objects.Image(config.Game.ASSETS.getResult("instructImage"), 320, 340, true);
            this._menuButton = new objects.Button(config.Game.ASSETS.getResult("menuButton"), 320, 600, true);
            this._instructLabel = new objects.Label("To Win : Kill All the Enemies and the Boss ", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 320, 500, true);
            this.Main()
        }
        public Update(): void {
            this._background.Update();
        }
        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._instruct);
            this.addChild(this._menuButton);
            this.addChild(this._instructLabel);
            this._menuButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.START;
                createjs.Sound.stop();
            });
        }
    }
}