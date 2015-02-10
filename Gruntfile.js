module.exports = function(grunt) { 'use strict';

  var
  // banner = '/*\n' +
  //          ' * <%= pkg.fullname %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
  //          ' * <%= pkg.description %>\n' +
  //          ' */\n',
  scriptSeparator = '//-----\n',
  theme = 'default',

  config = grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      main: {
        options: {
          // banner: banner,
          // stripBanners: true,
          separator: scriptSeparator
        },
        src: [
          // 'src/script.prefix',
          // 'components/**/*.js',
          // 'components/iShia-History/src/ishia.history.service.js',
          // 'src/config.js',
          'directives/hgDirectives.js',
          'demo/demo.js',
          // 'src/*/**/*.js',
          // 'src/script.suffix'
        ],
        dest: 'dist/hg.js',
        nonull: true
      },
      // htmls: {
      //   src: ['src/directives/*.html'],
      //   dest: 'dist/qadatona-editor-template.html',
      //   nonull: true
      // },
      libs: {
        options: {
          // banner: '// Bundle of all qEditor needed libs (angular.js & ...)\n',
          // stripBanners: true,
          separator: scriptSeparator
        },
        src: [
          'components/angular/angular.min.js',
          'components/angular-resource/angular-resource.min.js',
          'components/angular-sanitize/angular-sanitize.min.js'
        ],
        dest: 'dist/jslibs-bundle.min.js',
        nonull: true
      },
      pack: {
        options: {
          banner: banner+'\n//All scripts in one packed file.',
          nonull: true,
          stripBanners: true,
          separator: scriptSeparator
        },
        src: [
          'dist/jslibs-bundle.min.js',
          'dist/qadatona-editor.min.js'
        ],
        dest: 'dist/qadatona-editor-pack.min.js',
        nonull: true
      }
    },

    uglify: {
      build: {
        options: {
          banner: banner
        },
        files: {
          'dist/qadatona-editor.min.js': 'dist/qadatona-editor.js'
        }
      }
    },

    stylus: {
      theme: {
        options: {
          banner: banner,
          compress: false
        },
        files: {
          'dist/qadatona-editor.css': 'themes/'+theme+'/index.styl'
        }
      },
      theme_min: {
        options: {
          banner: banner,
          compress: true
        },
        files: {
          'dist/qadatona-editor.min.css': 'themes/'+theme+'/index.styl'
        }
      }
    },

    watch: {
      options: {
        spawn: false
        // event: ['changed']
      },

      dev: {
        files: ['src/**/*.js','src/**/*.html'],
        tasks: ['concat:main', 'concat:htmls']
      },

      scripts: {
        files: ['src/**/*.js'],
        tasks: ['concat:main', 'uglify']
      },

      styles: {
        files: ['themes/**/*.styl', 'themes/**/*.css'],
        tasks: ['stylus']
      },

      htmls: {
        files: ['src/**/*.html'],
        tasks: ['concat:htmls']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat:main', 'concat:htmls', 'uglify', 'stylus']);
  grunt.registerTask('pack', ['concat:libs', 'concat:pack']);

  grunt.registerTask('default', ['build', 'pack']);
  grunt.registerTask('dev', ['default', 'watch']);

};