// 画像に依存している今回のコードが画像が読み込まれる前に実行されるという事態を避けるため
window.addEventListener('load', function () {

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    // コンテキスト
    const ctx = canvas.getContext('2d');

    // キャンバスがウィンドウ全体を覆うようにする
    canvas.width = window.innerWidth
    canvas.height = this.window.innerHeight


    /**
     * 粒子、１ピクセルを表す
     * @param {Effect} effect エフェクト全体
     */
    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0; // X軸速度
            this.vy = 0; // Y軸速度

            this.ease = 0.01 // 元の画像に戻る速度
        }

        /**
         * プロパティから値を取得し、そのサイズの粒子を描画する
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
        warp() {
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.5;
        }
    }

    /**
     * エフェクト全体を処理する
     */
    class Effect {
        constructor (width, height) {
            this.width = width;
            this.height = height;
            // 現在有効な粒子が全て格納される
            this.particlesArray = [];
            
            /** @type {HTMLImageElement} */
            this.image = document.getElementById('image1');

            // 画面の中心
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;

            // 画像の半分を引くことで、画像を中心に持ってくる
            this.x = this.centerX - (this.image.width * 0.5);
            this.y = this.centerY - (this.image.height * 0.5);
            
            this.gap = 3 // 画質を荒くするのに使用、実際にはgapではない。
        }
        
        /**
         * this.particlesArrayに粒子を与える
         * @param {CanvasRenderingContext2D} context 
         */
        init(context) {
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y+= this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4 // 4つ毎にあらわされているので４
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = `rgb(${red},${green},${blue})`;

                    // 透明じゃないとき
                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color))
                    }
                    
                }
            }
        }
        /**
         * this.particlesArrayを取得し、中のdrawを全て呼び出す。
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            this.particlesArray.forEach(particle => particle.draw(context));
        }

        /**
         * 現在有効な粒子全てのupdateを呼び出す
         */
        update() {
            this.particlesArray.forEach(particle => particle.update());
        }

        /**
         * 粒子をバラバラにする
         */
        warp() {
            this.particlesArray.forEach(particle => particle.warp());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    console.log(effect);
    // アニメーションループ
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 実行時に中身をクリアする
        effect.draw(ctx);
        effect.update();
        window.requestAnimationFrame(animate); // ここで繰り返しを起こしている
    }
    animate()

    // warp button
    /** @type {HTMLButtonElement} */
    const warpButton = document.getElementById('warpButton');
    warpButton.addEventListener('click', function () {
        effect.warp();
    });
});