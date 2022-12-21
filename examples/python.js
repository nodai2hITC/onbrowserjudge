/** 
 * @file OnBrowserJudge - for Python
 * @author nodai2hITC
 * @license MIT License
 * @version v1.0.0
 */

"use strict"

importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js")

let pyodideReadyPromise

async function loadMain() {
  self.pyodide = await loadPyodide()
  self.postMessage(["init"])
}
loadMain()

async function loadPackages(packages) {
  if (packages) await self.pyodide.loadPackage(packages)
  self.postMessage(["ready"])
}

self.addEventListener("message", async function(e) {
  switch (e.data[0]) {
    case "init":
      pyodideReadyPromise = loadPackages(e.data[1])
      break

    case "execute":
      await pyodideReadyPromise
      const data = e.data[1]
      const testCase = data.testCase
      const program  = data.program
      const input    = data.input

      const globals = self.pyodide.toPy({})
      self.pyodide.runPython(`
import sys, io

_in = io.StringIO('''${input.replaceAll("\\", "\\\\").replaceAll("'", "\\'")}''')
sys.stdin = _in
_out = io.StringIO()
sys.stdout = sys.stderr = _out
      `, { globals: globals})
      let output = ""
      let error = 0
      const startTime = performance.now()
      try {
        self.pyodide.runPython(program, { globals: self.pyodide.toPy({}) })
        output = self.pyodide.runPython("_out.getvalue()", { globals: globals })
      } catch(err) {
        output = err.toString()
        error = 2
      }
      const execTime = performance.now() - startTime
      self.postMessage(["executed", { testCase, output, error, execTime }])
  }
})
