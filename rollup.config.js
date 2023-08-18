export default {
  input: './src/index.js',
  plugins: [],
  output: [
    {
      file: 'dist/riot-webpack-loader.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/riot-webpack-loader.js',
      format: 'es',
    },
  ],
}
