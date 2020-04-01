"use strict";
var scenes;
(function (scenes) {
    class Winner extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._endLabel = new objects.Label();
            this._scoresLabel = new objects.Label();
            this._background = new objects.Background();
            this._backButton = new objects.Button();
            this._menuButton = new objects.Button();
            this._youWin = new objects.Image;
            this._scoreBoard = new managers.ScoreBoard;
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._youWin = new objects.Image(config.Game.ASSETS.getResult("youWin"), 320, 200);
            this._endLabel = new objects.Label("GAME OVER", "80px", "Impact, Charcoal, sans-serif", "#ffffff", 320, 300, true);
            this._scoresLabel = new objects.Label("YOUR SCORE : ", "50px", "Impact, Charcoal, sans-serif", "#ffffff", 290, 400, true);
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("replayButton"), 260, 500, true);
            this._menuButton = new objects.Button(config.Game.ASSETS.getResult("menuButton"), 400, 500, true);
            managers.Collision._checkHighScore;
            this._scoreBoard = new managers.ScoreBoard();
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        }
        Update() {
            this._background.Update();
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this._endLabel);
            this._scoresLabel.text = "YOUR SCORE : " + config.Game.SCORE_BOARD.Score;
            this.addChild(this._scoresLabel);
            this.addChild(this._youWin);
            this.addChild(this._backButton);
            this.addChild(this._menuButton);
            this._backButton.on("click", function () {
                config.Game.SCORE_BOARD.Lives = 3;
                managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.PLAY;
                config.Game.SCORE_BOARD.Score = 0;
                createjs.Sound.stop();
            });
            this._menuButton.on("click", function () {
                config.Game.SCORE_BOARD.Lives = 3;
                managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.START;
                config.Game.SCORE_BOARD.Score = 0;
                createjs.Sound.stop();
            });
            this.addChild(this._scoreBoard.HighScoreLabel);
        }
    }
    scenes.Winner = Winner;
})(scenes || (scenes = {}));
//# sourceMappingURL=Winner.js.map