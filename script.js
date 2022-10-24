// 画像に依存している今回のコードが画像が読み込まれる前に実行されるという事態を避けるため
window.addEventListener('load', function () {

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    // ショートカット
    const ctx = canvas.getContext('2d');

    // デフォルトの全てのキャンバスの設定が見られる
    // console.log(ctx);

    // キャンバスがウィンドウ全体を覆うようにする
    canvas.width = window.innerWidth
    canvas.height = this.window.innerHeight
});