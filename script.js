// 画像に依存している今回のコードが画像が読み込まれる前に実行されるという事態を避けるため
window.addEventListener('load', function () {

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    // ショートカット
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
         */
        draw() {
            ctx.fillRect(this.x, this.y, this.size, this.size)
        }
    }

    /**
     * エフェクト全体を処理する
     */
    class Effect {

    }

    const particle1 = new Particle()
    particle1.draw()

    // アニメーションループ
    function animate() {

    }


});