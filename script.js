// 画像に依存している今回のコードが画像が読み込まれる前に実行されるという事態を避けるため
window.addEventListener('load', function () {

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    // ショートカット
    const ctx = canvas.getContext('2d');

    // キャンバスがウィンドウ全体を覆うようにする
    canvas.width = window.innerWidth
    canvas.height = this.window.innerHeight

    /**
     * 粒子、１ピクセルを表す
     */
    class Particle {
        constructor() {
            this.x = 0
            this.y = 0
            this.size = 3 // ピクセルサイズを３倍にしている
        }
    }

    /**
     * エフェクト全体を処理する
     */
    class Effect {

    }

    // アニメーションループ
    function animate() {

    }
});