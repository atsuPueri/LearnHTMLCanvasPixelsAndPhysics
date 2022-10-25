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
            this.ease = 0.01; // 元の画像に戻る速度
            this.friction = 0.95; // 摩擦度 ゆっくりと遅くなる速度
            this.dx = 0; // マウスとの距離（X）
            this.dy = 0; // マウスとの距離（Y)
            this.distance = 0; // マウスとの距離 （実際の距離）
            this.force = 0; // マウスによって押し出される速度
            this.angle = 0; // マウスによって押し出される方向
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
            // マウスと粒子との距離
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;

            // 斜めの距離は、ピタゴラスの定理？三角関数で求めることができる。
            // C^2 = A^2 + B^2  === C = √ A^2 + B^2
            this.distance = this.dx ** 2 + this.dy ** 2;

            // マウスが反応する範囲（半径） / 実際の距離
            // マウスから遠ざけるためにマイナスにする
            // 押し出される強さは、半径とマウスの距離に比例する
            this.force = -this.effect.mouse.radius / this.distance;

            // マウスの半径より小さければ、マウスから粒子を遠ざける
            if (this.distance < this.effect.mouse.radius) {
                // このatan2()を使用すると角度を計算できる
                // 指定されたXY点によってシータθ角度を表している
                this.angle = Math.atan2(this.dy, this.dx);

                // XY軸がどちらに押されるかを計算
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
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
            
            this.gap = 3; // 画質を荒くするのに使用、実際にはgapではない。
            this.mouse = {
                // 粒子がマウスに反応するカーソル周囲の領域
                // 実際には3000ピクセルもの範囲に反応するわけではない。
                // 数値が高い理由は、パフォーマンス上の理由がある。
                // マウスカーソルのXYははじめは定義されていない
                radius: 3000,
                x: undefined,
                y: undefined,
            };
            // ここに配置している理由は、マウス移動に際して、XやYをオーバーライドできるようにするため
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
                console.log(this.mouse.x);
            });
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