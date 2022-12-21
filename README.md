# OnBrowserJudge - Judge system that runs on the browser.

[日本語説明](https://github.com/nodai2hITC/onbrowserjudge/blob/main/README.ja.md)

- Runs on the browser, so can be used as long as there is a place to put static files.
- Currently supports Ruby, Python and JavaScript.
  - [Ruby example](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_en.html), [Python example](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_python_en.html), [JavaScript example](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_javascript_en.html)
- High degree of freedom, allowing for the creation of questions in a variety of formats.
  - For example, you can create problems that use stdin and stdout, but also problems that create functions, or problems that use pre-assigned variables.
    - [Example of a function creation problem (Ruby)](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_method_en.html), [Example of variables pre-assigned problem (Ruby)](https://nodai2hitc.github.io/onbrowserjudge/examples/collatz_ruby_var_en.html)

# Usage

First, download the set of files. (Code → Download ZIP)

## When using templates

The following four files are used.

- `template_[langname].html`
- `onbrowserjudge.js`
- `[langname].js`
- `style.css`

You only need to rewrite `template_[langname].html`. The file name should also be changed.

### Title, Problem Statement, Constraints, Input and Output

Feel free to rewrite the HTML. In the case of using templates, [MathJax](https://www.mathjax.org/) is loaded, so you can also use mathematical expressions using LaTeX format, etc. However, there is no problem even if it is written in plain HTML.

### Sample Input, Sample Output

```html:template_[langname].html
<pre id="sample1_input"  class="sample">123</pre>
<pre id="sample1_output" class="sample">456</pre>
```

As shown above, describe sample input and output in pre elements with the id `~_input` and `~_output`. The "~" part can be anything, but you must use the same for _input and _output.

If the class attribute `sample` is given, a copy button will be automatically added.

### Test Case

```html:template_[langname].html
<pre id="testcase1_input"  class="testcase">123</pre>
<pre id="testcase1_output" class="testcase">456</pre>
```

As with the sample input and output, the input and output values should be described using pre elements with the id `~_input` `~_output`. In the case of using templates, the class attribute `testcase` will make them disappear.

These are the only places to rewrite. You can actually run it! (You don't have to upload it anywhere, you can even run it locally to try it out)

## If no template is used

If no template is used (or the template is substantially rewritten), the HTML must include the following as a minimum.

- `<script src="onbrowserjudge.js"></script>`
- `<script> OnBrowserJudge.workerFile = "[langname].js" </script>`
  - These two must be written in this order.
- One or more pairs of pre elements with the id `~_input` `~_output`.
- A button element with the id `run`.
- A function named `OnBrowserJudge.getProgram()` to retrieve the program to run.

As long as you have the above, you are free to rewrite the rest. For more information, please refer to the template files and examples.

## Other settings

You can make various changes by defining the following values.

### `OnBrowserJudge.dict`

Translation dictionary. Please refer to the template files and examples for details.

### `OnBrowserJudge.timeLimit`

Sets the time in milliseconds before TLE.

### `OnBrowserJudge.process(program, casename, input)`

The program is processed through this function before being executed. By defining this function, you can create problems that (appear to) use other than standard input/output.

The following is an example of how to make a problem of the form "properly define the method `collatz(n)`".

```javascript
OnBrowserJudge.process = (program, casename, input) => program + "\n\n" + "puts collatz(gets.to_i)"
```


### `OnBrowserJudge.assertEqual(expected, actual)`

Normally, an "example output" value (`expected`) and an actual output value (`actual`) are correct only when they match exactly (ignoring trailing blanks), but this function allows for more flexible matching decisions.

### `OnBrowserJudge.congratulations()`

This function is executed when a correct answer is given. For example, if you set up the following, When you answer correctly, "Congratulations!" will be displayed as an alert.

```javascript
  OnBrowserJudge.congratulations = () => { alert("Congratulations!") }
```

# License

[MIT License](http://opensource.org/licenses/MIT).

# Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nodai2hITC/onbrowserjudge
