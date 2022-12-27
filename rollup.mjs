import resolve from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import { dirname, join as joinPath } from "path"
import { fileURLToPath } from "url"
import commonjs from "@rollup/plugin-commonjs"

const projectRoot = dirname(fileURLToPath(import.meta.url))
const outputFile = joinPath(projectRoot, "build", "bundle.js")

export default {
  input: "game.js",
  output: [{ format: "umd", file: outputFile }],
  plugins: [
    resolve(),
    serve(),
    commonjs(),
    livereload({ watch: [outputFile] }),
  ],
}
