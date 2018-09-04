'use strict'
import alex from 'gulp-alex'
import babel from 'gulp-babel'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import eslint from 'gulp-eslint'

const configFiles = './gulpfile.babel.js'
  , srcFiles = 'src/*.js'
  , testFiles = 'test/*.js'

  , destDir = './lib/'

let watching = false

gulp.task('clean', () => del(destDir))

gulp.task('alex', () =>
  gulp.src('./README.md')
    .pipe(alex())
    .pipe(alex.reporter())
    .pipe(alex.reporter('fail'))
)

gulp.task('lint', ['alex'], () =>
  gulp.src([configFiles, srcFiles, testFiles])
    .pipe(eslint())
    .pipe(gulpIf(!watching, eslint.failOnError()))
)

gulp.task('compile', ['clean', 'lint'], () =>
  gulp.src(srcFiles)
    .pipe(babel())
    .pipe(gulp.dest(destDir))
)

gulp.task('build', ['compile'])

gulp.task('watch', () => {
  watching = true
  gulp.watch([srcFiles, testFiles], ['build'])
})
