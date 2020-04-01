/*  
File Name: Start.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _startButton: objects.Button;
        private _instructionButton: objects.Button;
        private _exitButton: objects.Button;
        private _background: objects.Background;
        private _startScreen: objects.Image;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._startButton = new objects.Button();
            this._instructionButton = new objects.Button();
            this._exitButton = new objects.Button();
            this._background = new objects.Background();
            this._startScreen = new objects.Image();
            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._startScreen = new objects.Image(config.Game.ASSETS.getResult("startScreen"), 320, 400, true);
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 200, 580, true);
            this._instructionButton = new objects.Button(config.Game.ASSETS.getResult("instructionButton"), 340, 580, true);
            this._exitButton = new objects.Button(config.Game.ASSETS.getResult("exitButton"), 480, 580, true);
            createjs.Sound.play("backAudio");
            this.Main();
        }

        public Update(): void {
            this._background.Update();
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._startScreen);
            this.addChild(this._startButton);
            this.addChild(this._instructionButton);
            this.addChild(this._exitButton);

            this._startButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.PLAY;
                createjs.Sound.stop();
            });

            this._instructionButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.INSTRUCTION;
                createjs.Sound.stop();
            });

            this._exitButton.on("click", function () {
                config.Game.STATUS = true;
                config.Game.SCENE_STATE = scenes.State.END;
                createjs.Sound.stop();
            });
        }


    }
}