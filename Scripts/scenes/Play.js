"use strict";
var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this._scoreBoard = new managers.ScoreBoard;
            this._enemyNumber = 0;
            this._bulletNum = 20;
            this.fire = true;
            this._bulletImg = new Image();
            // initialization
            this._player = new objects.Player;
            this._enemies = new Array();
            this._boss = new objects.Enemy();
            this._background = new objects.Background();
            this._playBackSound = new createjs.PlayPropsConfig();
            this._playerbullets = new Array();
            this._enemybullets = new Array();
            this._enemyNumber;
            this._bulletNum = 30;
            this._bulletNumLabel = new objects.Label();
            this._bulletImage = new objects.Button();
            this._scoreImage = new objects.Button();
            this._lifeImage = new objects.Button();
            this._eexplosion = new objects.Image();
            this._player = new objects.Player();
            this._pointsUp = new objects.Image();
            this._playerBullet = new objects.Bullet();
            this._bulletImg.src = "./Assets/images/bulleticon.png";
            this._bomb = new objects.Imagess();
            this.Start();
        }
        // PUBLIC METHODS
        //Initialising Objects
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            //Number of Enemies
            this._enemyNumber = 2;
            //Background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("backAudio", this._playBackSound);
            this._enemies = new Array();
            this._boss = new objects.Enemy(config.Game.ASSETS.getResult("boss"));
            this._enemybullets = new Array();
            this._bulletImage = new objects.Button(config.Game.ASSETS.getResult("bullet"), 565, 30, true);
            this._scoreImage = new objects.Button(config.Game.ASSETS.getResult("score"), 460, 32, true);
            this._lifeImage = new objects.Button(config.Game.ASSETS.getResult("life"), 30, 30, true);
            this._bulletNumLabel = new objects.Label("bullets:", "23px", "Impact, Charcoal, sans-serif", "#fff", 610, 30, true);
            this._bomb = new objects.Imagess(config.Game.ASSETS.getResult("bomb"));
            //Adding enemies
            this.CreateEnemies(this._enemyNumber);
            //scores and lives stored globally for access
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        }
        Update() {
            this._background.Update();
            this._player.Update();
            this.UpdateBullets();
            this.UpdatePlayerFire();
            this.UpdatePosition();
            this.WinOrLoseUpdate();
            this._bomb.Update();
            //checking whether bomb is colliding with the player
            managers.Collision.AABBCheck(this._player, this._bomb);
            if (this._bomb.isColliding) {
                createjs.Sound.play("./Assets/audio/playerdied.mp3");
                config.Game.SCORE_BOARD.Lives = 0;
                console.log("Collided Mister Bomb");
                this.removeChild(this._bomb);
            }
            //checking whether star points is colliding with the player
            if (this._pointsUp.getStatus()) {
                this._pointsUp.Update();
                managers.Collision.AABBCheck(this._player, this._pointsUp);
                if (this._pointsUp.isColliding) {
                    createjs.Sound.play("./Assets/audio/points.wav");
                    config.Game.SCORE_BOARD.Score += 200;
                    console.log("Collided Mister Points");
                    this.removeChild(this._pointsUp);
                    this._pointsUp.setStatus(false);
                }
            }
        }
        Main() {
            // adds background
            this.addChild(this._background);
            this.addChild(this._bulletImage);
            this.addChild(this._lifeImage);
            this.addChild(this._scoreImage);
            this.addChild(this._player);
            this.addChild(this._bomb);
            this.addChild(this._bulletNumLabel);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }
        WinOrLoseUpdate() {
            this._bulletNumLabel.text = " : " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }
            if (managers.Collision.count >= this._enemyNumber || this._enemyNumber == 0) {
                if (this._boss.isActive) {
                    this.addChild(this._boss);
                    console.log("my nigga");
                    // config.Game.SCENE_STATE = scenes.State.END;
                    this._boss.isActive = false;
                }
                this._boss.Update();
                managers.Collision.AABBCheck(this._player, this._boss);
                if (this._boss.isColliding) {
                    createjs.Sound.play("./Assets/audio/playerdied.mp3");
                    config.Game.SCORE_BOARD.Lives = 0;
                    console.log("Collided Mister Boss");
                    this.removeChild(this._boss);
                }
                this._playerbullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(this._boss, bullet, 500, true);
                    if (bullet.isColliding) {
                        this._eexplosion = new objects.Image(config.Game.ASSETS.getResult("explosion"), this._boss.x, this._boss.y + 40, true);
                        this.addChild(this._eexplosion);
                        setTimeout(() => {
                            this.removeChild(this._eexplosion);
                        }, 200);
                        let randNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                        console.log(randNum);
                        if (randNum == 1) {
                            this._pointsUp = new objects.Image(config.Game.ASSETS.getResult("points"), this._boss.x, this._boss.y + 20, true);
                            this.addChild(this._pointsUp);
                            this._pointsUp.setStatus(true);
                        }
                        if (managers.Collision.count >= 3) {
                            this._boss.position = new objects.Vector2(-100, -200);
                            this._boss.died = true;
                            this.removeChild(this._boss);
                            bullet.position = new objects.Vector2(-200, -200);
                            this.removeChild(bullet);
                            config.Game.SCENE_STATE = scenes.State.WINNER;
                        }
                    }
                });
                // managers.Collision.count = 0;
            }
            //if attacked more than 3 times, game over
            if (config.Game.SCORE_BOARD.Lives <= 0) {
                setTimeout(() => {
                    this.removeChild(this._player);
                    config.Game.SCENE_STATE = scenes.State.END;
                }, 200);
            }
        }
        UpdatePosition() {
            this._enemies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                this._enemybullets.forEach((bullet) => {
                    managers.Collision.Check(this._player, bullet);
                    if (bullet.isColliding) {
                        if (config.Game.SCORE_BOARD.Lives <= 0) {
                            createjs.Sound.play("./Assets/audio/playerdied.mp3");
                            this._eexplosion = new objects.Image(config.Game.ASSETS.getResult("explosion3"), this._player.x, this._player.y, true);
                            this.addChild(this._eexplosion);
                            setTimeout(() => {
                                this.removeChild(this._eexplosion);
                            }, 150);
                        }
                        else {
                            this._eexplosion = new objects.Image(config.Game.ASSETS.getResult("explosion2"), this._player.x, this._player.y, true);
                            this.addChild(this._eexplosion);
                            setTimeout(() => {
                                this.removeChild(this._eexplosion);
                            }, 100);
                        }
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                    }
                });
                this._playerbullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet, 100, true);
                    if (bullet.isColliding) {
                        this._eexplosion = new objects.Image(config.Game.ASSETS.getResult("explosion"), enemy.x, enemy.y + 40, true);
                        this.addChild(this._eexplosion);
                        setTimeout(() => {
                            this.removeChild(this._eexplosion);
                        }, 200);
                        let randNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                        console.log(randNum);
                        if (randNum == 1) {
                            this._pointsUp = new objects.Image(config.Game.ASSETS.getResult("points"), enemy.x, enemy.y + 20, true);
                            this.addChild(this._pointsUp);
                            this._pointsUp.setStatus(true);
                        }
                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                    }
                });
            });
        }
        CreateEnemies(number) {
            let createEnemy = setInterval(() => {
                if (this._enemies.length < number) {
                    let enemy = new objects.Enemy(config.Game.ASSETS.getResult("enemy"));
                    this._enemies.push(enemy);
                    this.addChild(enemy);
                    console.log("Creating Enemies");
                    this.ShootPlayer(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy);
                }
            }, 1000);
        }
        BulletVelocity(eBullet, eSpeed, eMove, type = false) {
            //enemy direction
            if (type == true) {
                eBullet.y += eSpeed;
                eBullet.position.y += eMove;
                if (eBullet.y >= 800) {
                    this.removeChild(eBullet);
                }
            }
            //player direction
            else {
                eBullet.y -= eSpeed;
                eBullet.position.y -= eMove;
                if (eBullet.y <= 0) {
                    this.removeChild(eBullet);
                }
            }
        }
        // Shoot enemies are colliding
        ShootPlayer(enemy, bullArray) {
            if (enemy.canShoot()) {
                let fire = setInterval(() => {
                    if (!enemy.isColliding) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("ebullet"), enemy.x + 20, enemy.y + 50, true);
                        bullArray.push(bullet);
                        this.addChild(bullet);
                    }
                    else
                        clearInterval(fire);
                }, 500);
            }
        } //end public FireGun
        UpdateBullets() {
            this._playerbullets.forEach((bullet) => {
                this.BulletVelocity(bullet, 8, 8, false);
            });
            this._enemies.forEach(enemy => {
                enemy.addEventListener("tick", () => {
                    if (enemy.canShoot()) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("ebullet"), enemy.x + 20, enemy.y + 50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            });
            this._enemybullets.forEach((bullet) => {
                this.BulletVelocity(bullet, 8, 8, true);
            });
        }
        UpdatePlayerFire() {
            if (config.Game.keyboardManager.fire) {
                if (this.fire) {
                    console.log("click1");
                    this._bulletNum--;
                    createjs.Sound.play("./Assets/audio/playerbullet.wav");
                    this._playerBullet = new objects.Bullet(config.Game.ASSETS.getResult("pbullet"), this._player.x, this._player.y - 20, true);
                    this._playerbullets.push(this._playerBullet);
                    this.addChild(this._playerBullet);
                    this.fire = false;
                }
            }
            if (!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
        }
    }
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map