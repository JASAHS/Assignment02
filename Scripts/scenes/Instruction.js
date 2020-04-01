"use strict";
var scenes;
(function (scenes) {
    class Instruction extends objects.Scene {
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
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._instruct = new objects.Image(config.Game.ASSETS.getResult("instructImage"), 320, 340, true);
            this._menuButton = new objects.Button(config.Game.ASSETS.getResult("menuButton"), 320, 600, true);
            this._instructLabel = new objects.Label("To Win : Kill All the Enemies and the Boss ", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 320, 500, true);
            this.Main();
        }
        Update() {
            this._background.Update();
        }
        Main() {
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
    scenes.Instruction = Instruction;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instruction.js.map