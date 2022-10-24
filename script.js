// 画像に依存している今回のコードが画像が読み込まれる前に実行されるという事態を避けるため
window.addEventListener('load', function () {

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    // コンテキスト
    const ctx = canvas.getContext('2d');

    // キャンバスがウィンドウ全体を覆うようにする
    canvas.width = window.innerWidth
    canvas.height = this.window.innerHeight

    /** @type {HTMLImageElement} */
    const image1 = document.getElementById('image1')

    /**
     * 粒子、１ピクセルを表す
     */
    class Particle {
        constructor() {
            this.x = 20;
            this.y = 50;
            this.size = 100;
        }

        /**
         * プロパティから値を取得し、そのサイズの粒子を描画する
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
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
        }
        // this.particlesArrayに効果を与えて塗りつぶす
        init() {
            this.particlesArray.push(new Particle());
        }
        /**
         * this.particlesArrayを取得し、中のdrawを全て呼び出す。
         * @param {CanvasRenderingContext2D} context
         */
        draw(context) {
            this.particlesArray.forEach(particle => particle.draw(context));
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.draw(ctx)
    console.log(effect);

    // アニメーションループ
    function animate() {

    }


});