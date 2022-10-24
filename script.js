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

    // 四角く塗りつぶすメソッド
    // 塗りつぶしスタイルを指定しない場合、その長方形を色で塗りつぶす。
    // 塗りつぶし色はデフォルト黒
    // (x, y, width, height)
    ctx.fillRect(120, 150, 100, 200)

    // 画像描画メソッド
    // (描画したい画像, x, y, width, height) widthとheightは渡さなければ元の画像サイズで描画される
    ctx.drawImage(image1, 100, 100, 100, 100)
});