// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js', // or the main entry point
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    postcss({
      modules: true,  // Enable CSS Modules
      extract: true,  // Optional: to extract the CSS to a separate file
    }),
  ],
};
