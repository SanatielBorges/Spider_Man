const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

// Caminhos dos arquivos
const paths = {
  styles: {
    src: "src/style.css", // Arquivo CSS na pasta src
    dest: "dist/styles/", // Pasta destino para o CSS minificado
  },
  scripts: {
    src: "src/script.js", // Arquivo JS na pasta src
    dest: "dist/js/", // Pasta destino para o JS minificado
  },
  html: {
    src: "index.html", // Arquivo HTML na raiz
    dest: "dist/", // Pasta destino para o HTML minificado
  },
};

// Minificar CSS
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest));
}

// Minificar e mapear JS
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Minificar HTML
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest)); // Corrigido
}

// Monitorar mudanças nos arquivos
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
}

// Tarefa padrão para build e watch
const build = gulp.series(gulp.parallel(styles, scripts, html), watchFiles);

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.watch = watchFiles;
exports.build = build;
