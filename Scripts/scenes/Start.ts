module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _startButton: objects.Button;
        private _instructionButton: objects.Button;
        private _background: objects.Background;
        private _startScreen: objects.Image;
        private _instructButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._startButton = new objects.Button();
            this._instructionButton = new objects.Button();
            this._background = new objects.Background();
            this._startScreen = new objects.Image();
            this._instructButton = new objects.Button();
            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._startScreen = new objects.Image(config.Game.ASSETS.getResult("startScreen"), 320, 400, true);
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 260, 580, true);
            this._instructionButton = new objects.Button(config.Game.ASSETS.getResult("instructionButton"), 400, 580, true);
            // createjs.Sound.play("startSound");
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
            // this.addChild(this._tutorialButton);

            this._startButton.on("click", function () {
                //changed it for the testing
                config.Game.SCENE_STATE = scenes.State.PLAY;
                // createjs.Sound.stop();
            });
            this._instructionButton.on("click", function () {
                //changed it for the testing
                config.Game.SCENE_STATE = scenes.State.INSTRUCTION;
                createjs.Sound.stop();
            });
        }


    }
}