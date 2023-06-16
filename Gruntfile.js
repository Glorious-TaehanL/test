const sass = require('node-sass');

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true, // SCSS 소스맵 생성 여부
        outputStyle: 'expanded', // CSS 출력 형식 (nested, expanded, compact, compressed)
      },
      dist: {
        files: {
          'public/css/main_customize.css': 'public/scss/*/*.scss', // 입력 SCSS 파일과 출력 CSS 파일 경로 설정
        },
      },
    },
    watch: {
      styles: {
        files: ['public/scss/*/*.scss'], // 관찰할 SCSS 파일 경로
        tasks: ['sass'], // 변경 감지 시 실행할 태스크
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'watch']);
};
