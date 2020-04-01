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
                // config.Game.SCORE_BOARD.Lives = 3;
                // managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.START;
                // config.Game.SCORE_BOARD.Score = 0;
                // config.Game.ANTIBOOMITEM = 0;
                //Play.point = 0;
                createjs.Sound.stop();
            });
        }
    }
}