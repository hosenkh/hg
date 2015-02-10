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
      htmls: {
        src: ['demo/demo.html'],
        dest: 'dist/index.html',
        nonull: true
      },
      libs: {
        options: {
          // banner: '// Bundle of all qEditor needed libs (angular.js & ...)\n',
          // stripBanners: true,
          separator: scriptSeparator
        },
        src: [
          'components/angular/angular.min.js',
          'components/angular-resource/angular-resource.min.js',
          'components/angular-route/angular-route.min.js',
          'components/angular-animate/angular-animate.min.js'
        ],
        dest: 'dist/jslibs-bundle.min.js',
        nonull: true
      },
      pack: {
        options: {
          // banner: banner+'\n//All scripts in one packed file.',
          nonull: true,
          stripBanners: true,
          separator: scriptSeparator
        },
        src: [
          'dist/jslibs-bundle.min.js',
          'dist/hg.js'
        ],
        dest: 'dist/hg-pack.min.js',
        nonull: true
      }
    },

    uglify: {
      build: {
        options: {
          // banner: banner
        },
        files: {
          'dist/hg-pack.min.js': 'dist/hg-pack.js'
        }
      }
    },

    stylus: {
      theme: {
        options: {
          // banner: banner,
          compress: false
        },
        files: {
          'dist/demo.css': 'demo/demo.styl',
          'dist/hgTemplates.css': 'style/hgTemplates.styl'
        }
      },
      // theme_min: {
      //   options: {
      //     banner: banner,
      //     compress: true
      //   },
      //   files: {
      //     'dist/qadatona-editor.min.css': 'themes/'+theme+'/index.styl'
      //   }
      // }
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
        files: ['style/hgTemplates.styl'],
        tasks: ['stylus']
      },

      htmls: {
        files: ['src/**/*.html'],
        tasks: ['concat:htmls']
      }
    },

    serve: {
      options: {
        serve: {
          'path': 'dist'
        },
        'port':8000
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('build', ['concat:main', 'concat:htmls', 'uglify', 'stylus']);
  grunt.registerTask('pack', ['concat:libs', 'concat:pack']);

  grunt.registerTask('default', ['build', 'pack']);
  // grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('dev', ['default', 'serve']);

};