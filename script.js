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
        constructor(effect) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width; // 0 ~ 1の少数点 * 横幅とすることで最大でもキャンバスの端となる。
            this.y = Math.random() * this.effect.height;
            this.size = 10;
            this.vx = 0; // X軸速度
            this.vy = 0; // Y軸速度
        }

        /**
         * プロパティから値を取得し、そのサイズの粒子を描画する
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
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
               
        }
        
        /**
         * this.particlesArrayに粒子を与える
         * @param {CanvasRenderingContext2D} context 
         */
        init(context) {
            context.drawImage(this.image, this.x, this.y);
            // 全ての位置、色を含んだ配列
            // getImageData() キャンバスの特定の部分を分析し、その分析されたピクセルデータを特別な画像データオブジェクト形式で返します。
            // (x, y, width, height)
            // uint8 クランプ配列と呼ばれるものになっている
            // 0 ~ 255 の範囲にクランプされた割り当てられない８ビット整数配列
            // rgbaの色であらわされている
            const pixels = context.getImageData(0, 0, this.width, this.height);
            console.log(pixels);
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
            this.particlesArray.forEach(particle => particle.update())
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);

    // アニメーションループ
    function animate() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // 実行時に中身をクリアする
        effect.draw(ctx);
        effect.update();
        window.requestAnimationFrame(animate); // ここで繰り返しを起こしている
    }
    animate()

});