# OnBrowserJudge - ブラウザ上で動作するジャッジシステム

- ブラウザ上で動作するため、静的ファイルを置ける場所さえあれば設置可能。
- 現在 Ruby, Python, JavaScript に対応。
  - [Ruby の例](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_jp.html)、[Python の例](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_python_jp.html)、[JavaScript の例](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_javascript_jp.html)
- 自由度が高く、さまざまな形式の問題が作成可能。
  - 例えば AtCoder のように標準入力・出力を用いる問題だけでなく、LeetCode のように関数を作成する問題や、事前に代入された変数を用いる問題なども作れます。
    - [関数作成問題の例(Ruby)](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_method_jp.html)、[変数が事前に代入される問題の例(Ruby)](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_var_jp.html)

# 使い方

まずは、ファイル一式をダウンロード（右上の Code → Download ZIP）してください。

## テンプレートを用いる場合

以下の 4 つのファイルを使用します。

- `template_言語名_ja.html`
- `onbrowserjudge.js`
- `言語名.js`
- `style.css`

書き換える必要があるのは `template_言語名_ja.html` だけです。ファイル名も変更しておきましょう。

### タイトル・問題文・制約・入力・出力

自由に HTML を書き換えてください。テンプレートの場合、[MathJax](https://www.mathjax.org/) を読み込んでいるので LaTeX 形式等を用いて数式も利用できます。とはいえ読めれば別に素の HTML だけで書いても何の問題もありません。

### 入力例・出力例

```html:template_言語名_ja.html
<pre id="sample1_input"  class="sample">123</pre>
<pre id="sample1_output" class="sample">456</pre>
```

…のように、`～_input` `～_output` という id を持った pre 要素で入力例・出力例を記述してください。「～」の部分は何でも大丈夫ですが、_input と _output で同じものを使う必要があります。`sample` という class 属性を持たせておくと、コピーボタンが自動付加されます。

### テストケース

```html:template_言語名_ja.html
<pre id="testcase1_input"  class="testcase">123</pre>
<pre id="testcase1_output" class="testcase">456</pre>
```

こちらも入力例・出力例同様に、`～_input` `～_output` という id を持った pre 要素で入力値・出力値を記述してください。テンプレートの場合、`testcase` という class 属性を持たせると表示されなくなります。

これだけで書き換える場所は終わりです。実際に実行してみてください！（どこかにアップしなくても、ローカルで試しに実行することもできます。）

## テンプレートを用いない場合

テンプレートを用いない（あるいはテンプレートを大幅に書き換える）場合、その HTML に以下のものが最低限必要です。

- `<script src="onbrowserjudge.js"></script>`
- `<script> OnBrowserJudge.workerFile = "言語名.js" </script>`
  - この 2 つは、この順序で書く必要があります。
- 1 組以上の `～_input` `～_output` という id を持った pre 要素
- `run` という id を持った button 要素
- `OnBrowserJudge.getProgram` という名前の、実行するべきプログラムを取得する関数

以上のものさえあれば、他の部分は自由に書き換えてしまって大丈夫です。詳しくは、テンプレートファイルやサンプルを参考にしてください。

## その他設定

以下の値を定義することで、さまざまな変更が可能です。

### `OnBrowserJudge.dict`

翻訳辞書です。詳細はテンプレートファイルやサンプルを参考にしてください。

### `OnBrowserJudge.timeLimit`

TLE になるまでの時間をミリ秒で設定します。

### `OnBrowserJudge.process(program, casename, input)`

実行するプログラムは、この関数を通って加工を受けた上で実行されます。この関数を定義することで、標準入出力以外を用いた（ように見える）問題を作成できます。

以下は、メソッド「`collatz(n)`」を適切に定義する、という形式の問題にする場合の例です。

```javascript
OnBrowserJudge.process = (program, casename, input) => program + "\n\n" + "puts collatz(gets.to_i)"
```


### `OnBrowserJudge.assertEqual(expected, actual)`

通常は「出力例」の値 (`expected`) と実際の出力値 (`actual`) が完全に一致（ただし末尾の空白は無視）した際のみ正解になりますが、この関数を設定することでより柔軟な一致判定ができます。

### `OnBrowserJudge.congratulations()`

正解時にはこの関数が実行されます。例えば以下のように設定すると、正解時に「大正解！」とアラート表示されます。

```javascript
  OnBrowserJudge.congratulations = () => { alert("大正解！") }
```

# License

[MIT License](http://opensource.org/licenses/MIT).

# Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nodai2hITC/onbrowserjudge
