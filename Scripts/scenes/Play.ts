module scenes {
    export class Play extends objects.Scene {
        private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
        // PRIVATE INSTANCE MEMBERS
        private _player: objects.Player;
        private _background: objects.Background;
        private _level: objects.Label;
        private _enemies: objects.Enemy[];
        private _playBackSound: createjs.PlayPropsConfig;
        private _playerbullets: Array<objects.Bullet>;
        private _enemybullets: Array<objects.Bullet>;
        private _numOfEnemy: Number = 0;
        private _bulletNum = 20;
        private _bulletNumLabel: objects.Label;
        private _antiBoom = true;
        // private point:number;
        //private _pointLabel:objects.Label;
        //private _liveLabel:objects.Label;
        private fire = true;
        private _bulletImage: objects.Button;
        private _lifeImage: objects.Button;
        private _scoreImage: objects.Button;
        // private _levelup: objects.Image;
        private _healthup: objects.Image;
        private _playerBullet: objects.Bullet;
        private _bulletImg = new Image();
        // private _antiBoomImage: objects.Image;
        private _count: boolean;
        /////Test
        // private _engine: createjs.Sprite;


        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._player = new objects.Player;
            this._level = new objects.Label;
            this._enemies = new Array<objects.Enemy>();
            this._background = new objects.Background();
            this._playBackSound = new createjs.PlayPropsConfig();
            this._playerbullets = new Array<objects.Bullet>();
            this._enemybullets = new Array<objects.Bullet>();
            this._numOfEnemy;
            this._bulletNum = 30;
            this._bulletNumLabel = new objects.Label();
            // this.point = 0;
            //this._pointLabel = new objects.Label();
            //this._liveLabel = new objects.Label();
            this._bulletImage = new objects.Button();
            this._scoreImage = new objects.Button();
            this._lifeImage = new objects.Button();
            this._count = false;
            this._player = new objects.Player();
            // this._levelup = new objects.Image();
            this._healthup = new objects.Image();
            this._playerBullet = new objects.Bullet();
            this._bulletImg.src = "./Assets/images/bulleticon.png"
            // this._antiBoomImage = new objects.Image();
            // this._engine = this.EngineAnimation();
            this.Start();
        }

        // PUBLIC METHODS

        //initilize 
        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._level = new objects.Label("Level : 1", "15px", "Consolas", "#000000", 50, 20, true);
            // this.StartAnimation();
            //Set Number of Enemies
            this._numOfEnemy = 5;
            //unlimited background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("backAudio", this._playBackSound)
            this._enemies = new Array<objects.Enemy>();
            this._enemybullets = new Array<objects.Bullet>();
            this._bulletImage = new objects.Button(config.Game.ASSETS.getResult("bullet"), 565, 30, true);
            this._scoreImage = new objects.Button(config.Game.ASSETS.getResult("score"), 460, 32, true);
            this._lifeImage = new objects.Button(config.Game.ASSETS.getResult("life"), 30, 30, true);
            this._bulletNumLabel = new objects.Label("bullets:", "23px", "Impact, Charcoal, sans-serif", "#fff", 610, 30, true);
            //this._pointLabel = new objects.Label("Scores: 0", "23px", "Impact, Charcoal, sans-serif", "#ffffff", 480, 30, true);
            //this._liveLabel = new objects.Label("Live: 3", "23px", "Impact, Charcoal, sans-serif", "#fff", 75, 30, true);
            // this._levelup = new objects.Image(config.Game.ASSETS.getResult("levelup"), 400, 50, true);

            // this._antiBoomImage = new objects.Image(config.Game.ASSETS.getResult("antiBoom"),
            //     this._antiBoomImage.RandomPoint(true).x, this._antiBoomImage.RandomPoint(true).y, true);
            // this._enemyNum =4;
            //Add ememies
            this.AddEnemies(this._numOfEnemy);
            //this.AddEnemies(10, this._enemybullets);
            // this._engine = this.EngineAnimation();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        }

        public Update(): void {
            this._background.Update();
            this._player.Update();
            this.UpdateBullets();
            this.UpdatePlayerFire();
            //this.updateBullet();
            this.UpdatePosition();
            this.UpdateWinOrLoseCondition();
            // this.killAll();

            if (this._healthup.getStatus()) {
                this._healthup.Update()
                managers.Collision.AABBCheck(this._player, this._healthup);
                if (this._healthup.isColliding) {
                    config.Game.SCORE_BOARD.Lives += 1;
                    console.log("collided my nnigaa")
                    this.removeChild(this._healthup);
                    this._healthup.setStatus(false);
                }
            }

            // this._levelup.y += 5;
            // this._levelup.position.y += 5;
            // managers.Collision.AABBCheck(this._player, this._levelup, 0);
            // if (this._levelup.isColliding) {
            //     this.removeChild(this._levelup);
            //     createjs.Sound.play("./Assets/sounds/powerup.wav");
            //     this._bulletImg.src = "./Assets/images/beam3.png";
            // }
            // this._antiBoomImage.y += 5;
            // this._antiBoomImage.position.y += 5;
            // managers.Collision.AABBCheck(this._player, this._antiBoomImage, 0, true);
            // if (this._antiBoomImage.isColliding) {
            //     config.Game.SCORE_BOARD.AntiBoomItem += 1;
            //     this.removeChild(this._antiBoomImage);
            // }
        }

        public Main(): void {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._bulletImage);
            this.addChild(this._lifeImage);
            this.addChild(this._scoreImage);
            this.addChild(this._player);
            this.addChild(this._bulletNumLabel);
            // this.addChild(this._engine);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            // this.addChild(this._scoreBoard.HighScoreLabel);
            // this.addChild(this._scoreBoard.ItemLabel);
            // this.EngineAnimation();
        }//end public Main() method

        public UpdateWinOrLoseCondition() {
            this._bulletNumLabel.text = " : " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }

            if (managers.Collision.count >= this._numOfEnemy || this._numOfEnemy == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
                managers.Collision.count = 0;
            }

            //if attacked more than 3 times, game over
            if (config.Game.SCORE_BOARD.Lives <= 0) {
                setTimeout(() => {
                    this.removeChild(this._player);
                    config.Game.SCENE_STATE = scenes.State.END;
                }, 300);
            }
        }

        public AddEnemies(number: Number): void {
            let createEnemy = setInterval(() => {
                if (this._enemies.length < number) {
                    let enemy = new objects.Enemy(config.Game.ASSETS.getResult("enemy"));
                    this._enemies.push(enemy);
                    this.addChild(enemy)
                    console.log("CREATE")
                    this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy)
                }
            }, 1000)
        }

        //ANTI-Matter-Boom
        // public killAll(): void {
        //     if (config.Game.keyboardManager.antiBoom) {
        //         if (this._antiBoom) {
        //             if (config.Game.SCORE_BOARD.AntiBoomItem > 0) {
        //                 config.Game.SCORE_BOARD.Score += 500;
        //                 console.log("antianti")
        //                 this._enemies.forEach(enemy => {
        //                     // this.ExploreAnimation(enemy.x, enemy.y);
        //                     // createjs.Sound.play("./Assets/sounds/crash.wav");
        //                     enemy.position = new objects.Vector2(-100, -200);
        //                     enemy.died = true;
        //                     this.removeChild(enemy);
        //                 });
        //                 config.Game.SCORE_BOARD.AntiBoomItem -= 1;
        //             }
        //         }
        //     }
        //     if (!config.Game.keyboardManager.antiBoom) {
        //         this._antiBoom = true;
        //     }
        // }





        public BulletSpeed(eBullet: objects.Bullet, eSpeed: number, eMove: number, pick: boolean = false): void {
            //enemy direction
            if (pick == true) {
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

        public UpdatePosition() {
            this._enemies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                this._enemybullets.forEach((bullet) => {

                    managers.Collision.Check(this._player, bullet);
                    if (bullet.isColliding) {

                        if (config.Game.SCORE_BOARD.Lives <= 0) {
                            // this.ExploreAnimation(this._player.x, this._player.y);
                        } else {
                            // this.ShieldAnimation(this._player.x, this._player.y);
                        }

                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                        //config.Game.SCENE_STATE = scenes.State.END;
                    }
                });
                this._playerbullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet, 100, true);
                    if (bullet.isColliding) {
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        let randNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                        console.log(randNum)
                        if (randNum == 1) {
                            this._healthup = new objects.Image(config.Game.ASSETS.getResult("health"), enemy.x, enemy.y + 40, true);
                            this.addChild(this._healthup);
                            this._healthup.setStatus(true);
                        }

                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                        //config.Game.SCORE_BOARD.Score += 100
                    }
                });

            });

            //Test

            // this._engine.x = this._player.x - 25;
            // this._engine.y = this._player.y + 20;

        }//end update positon


        // Shot fire until enemies are colliding
        public FireGun(enemy: objects.Enemy, bullArray: Array<objects.Bullet>): void {
            //newArray.forEach(enemy => {
            //this.addChild(enemy);
            if (enemy.canShoot()) {
                let fire = setInterval(() => {
                    if (!enemy.isColliding) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("ebullet"), enemy.x + 20, enemy.y + 50, true);
                        bullArray.push(bullet);
                        this.addChild(bullet);
                    }
                    else clearInterval(fire)
                }, 500)
            }
            //});
        }//end public FireGun

        public UpdateBullets() {
            this._playerbullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 8, 8, false);
            })
            this._enemies.forEach(enemy => {
                enemy.addEventListener("tick", () => {
                    if (enemy.canShoot()) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("ebullet"), enemy.x + 20, enemy.y + 50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            })
            this._enemybullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 8, 8, true);
            })

        }

        public UpdatePlayerFire() {
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





    }//end class
}//end module