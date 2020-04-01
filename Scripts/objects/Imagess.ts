module objects {
    export class Imagess extends GameObject {
        private _status: boolean = false;
        constructor(
            imagePath: Object = config.Game.ASSETS.getResult("placeholder"),
            x: number = 0, y: number = 0, isCentered: boolean = true) {
            super(imagePath, x, y, isCentered);
            this.Start();
        }
        protected _checkBounds(): void {
            if (this.y >= 800 + this.height) {
                this.Reset();
            }
        }

        private _move(): void {
            this.y += 5;
            this.position = new Vector2(this.x, this.y);
        }
        public getStatus(): boolean {
            return this._status;
        }
        public setStatus(stat: boolean) {
            this._status = stat;
        }
        public Start(): void {
            this.RandomPoint();
        }
        public Update(): void {
            this._move();
            this._checkBounds();

        }
        public Resets(): void {
            this.x = -999;
            this.y = -99999;
        }
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
        }

        public RandomPoint(): void {

            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this.position = new Vector2(this.x, this.y);

        }


    }
}