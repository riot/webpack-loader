const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

export default {
  input: pkg.source,
  plugins: [],
  external,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      interop: false
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
}
