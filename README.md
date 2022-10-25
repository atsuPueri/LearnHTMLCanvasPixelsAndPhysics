# LearnHTMLCanvasPixelsAndPhysics
 
url: [https://www.youtube.com/watch?v=vAJEHf92tV0](https://www.youtube.com/watch?v=vAJEHf92tV0)

## Lesson2
Lesson2では画像をピクセルに分割できるようにするために、画像をBase64形式に変換します。
imgは表示したくないので、非表示にしました。

## Lesson3
console.log(ctx)でデフォルト状態のcanvasの設定を見られた、ここに表示されている、デフォルトの塗りつぶし色などは、JSでオーバライド、上書きできる。

### プロトタイプを表示
組み込みの２Dメソッドを全て見ることができる。
これらを使用して、四角形や、円、線などを描画でき、グラデーションを作成し、画像を操作できます。
ここでは、基本的なことをカバーし、描画について深く掘り下げます。

drowImage()
getImageData()

ここでは、2dのメソッドの見方、console.log(ctx)を知り、キャンバスがウィンドウを覆うように設定した。


## Lesson4
粒子システムの操作法を教えてもらえる。
粒子の外見や、動作をプログラムして、様々な種類をすべてシミュレートできます。
パーティクルはマウスに反応する。

物理学と、摩擦が関与する動的な方法で全てのパーティクルを作成する。

- Particleクラス
    - 個々のパーティクルオブジェクトを作成するブループリント

- Effectクラス
    - 全てのパーティクルを同時に処理するエフェクトクラス
- animate()
    - 全てをアニメーション化して、インタラクティブにするためのループ

ここでは、基礎となる部分を作成した。


## Lesson5
簡単なキャンバスの描画方法を知った。

## Lesson6
キャンバスに画像を取り込む

ここでは画像の描画方法について学んだ。

## Lesson7
粒子オブジェクトを表示させる

ここでは、粒子オブジェクトをインスタンス化し、実際に描画しました。

## Lesson8
Effctクラス

ここでは、Effectクラスを使って、複数のパーティクル（粒子）を描画する方法を作成しました。

## Lesson9
code cleanup

良くない書き方をしている、Partucleクラスではctxを直接呼び出し、使用している。
クラスとオブジェクトは可能な限りモジュール式の自己完結にしたい。
依存する先を直接参照するのではなく、引数に依存するようにする。

ここでは、依存関係を整理し、直接呼び出すのではなく、引数に依存させた。

## Lesson10
multiple randomized particles
複数のランダム化された粒子

座標をハードコーディングするのではなく、粒子の位置をランダム化することができる。

Particleの配置をランダム化した、その際にキャンバスの横縦幅が必要だったので、Particle自身を格納しているeffectクラスを参照するように変更した。

## Lesson11
drawImage method

## Lesson12
how to center images on canvas
キャンバスの中央に画像を配置する方法

## Lesson13
particle motion

粒子にアニメーションを付けることができた。
XY軸にランダムに動くようにできた

## Lesson14
pixel analysis with getlmageData
getimageData によるピクセル分析

context.getImageData() によって画像データの１ピクセル毎の情報を取得することができた
RGBAになっている

## Lesson15
extracting coordinates and colors from raw pixel data
生のピクセルデータから座標と色を抽出する

## Lesson16
Lesson15で取得したピクセルデータを実際にあてはめることで、画像をドット絵化することが出来た。

## Lesson17
animated particle transitions

画像が元の状態に戻ろうとする処理を実装しました、これは、easeや初期位置XYをいじると面白くなります。

## Lesson18
ボタンを押すことで粒子をワープさせる昨日を追加した。

## Lesson19
mouse interactions and particle physics

マウスの位置を取得する方法を学んだ、
マウスが粒子に十分近いときに押しのけられるロジックを記述した

コンストラクタで記述されていない新たなプロパティを使用しているので追加している。

マウスから離れさせる方法を実装、離れる際に、徐々に速度が落ちるように摩擦力を付与

また、原理は分かっていないが、元に戻す力物あるようだ