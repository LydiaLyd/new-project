module.exports = function(grunt) {

  // загрузить задачи из package.json
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({



    // скомпилировать style.less в style.css
    less: {

      develop: {
        files: {
          "source/css/style.css": ["source/less/style.less"],
        }
      },

      build: {
        files: {
          "build/css/style.css": ["source/less/style.less"],
        }
      },

    },



    // добавить префиксы
    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },
      build: {
        src: "build/css/style.css"
      },
    },



    // объединить медиавыражения ?
    combine_mq: {
      build: {
        src: "build/css/style.css",
        dest: "build/css/style.css"
      }
    },



    // изменить пути ? непонятно, зачем вообще мне это нужно
    replace: {
      build: {
        options: {
          patterns: [{
            match: /[\"\']img\//g,
            replacement: '"/static/img'
          }, {
            match: /[\"\']css\//g,
            replacement: '"/static/css'
          }, {
            match: /[\"\']js\//g,
            replacement: '"/static/js' 
          }]
        },
        files: [{
          expand: true,
          src: [
            "build/css/style.css",
            "build/*.html"
          ]
        }]
      }
    },



    // ужать style.css
    cssmin: {

      develop: {
        options: {
          keepSpecialComments: 0,
        },
        files: {
          "source/css/style.min.css": ["source/css/style.css"],
        }
      },

      build: {
        options: {
          keepSpecialComments: 0,
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
        }
      },

    },



    // "причесать" less-файлы
    csscomb: {
      style: {
        expand: true,
        src: [
          "source/less/*.less",
          "source/less/components/*.less",
        ]
      }
    },



    // сделать спрайт
    sprite: {
      all: {
        src: 'source/img/sprites/*.png',
        dest: 'source/img/spritesheet.png',
        destCss: 'source/less/components/sprites.less',
        algorithm: 'top-down',
        padding: 10,
      }
    },



    // оптимизировать изображения
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/*.{png,jpg,gif,svg}"]
        }]
      }
    },



    // объединить js-файлы
    concat: {

      develop: {
        src: [
          'source/js/script.js',
          'source/js/plagins/*.js',
        ],
        dest: 'source/js/script.js',
      },

      build: {
        src: [
          'source/js/script.js',
          'source/js/plagins/*.js',
        ],
        dest: 'build/js/script.js',
      },

    },



    // ужать js-файлы
    uglify: {

      develop: {
        src: 'source/js/script.js',
        dest: 'source/js/script.min.js',
      },
      
      build: {
        src: 'build/js/script.js',
        dest: 'build/js/script.min.js',
      },

      
    },



    // проверить script.js на наличие ошибок
    jshint: {
      // использовать jshint-stylish для наглядного представления ошибок
      options: {
        reporter: require('jshint-stylish')
      },
      scrypt: [
        'Gruntfile.js',
        'source/js/script.js',
      ],
    }



    // следить за изменениями и обновлять style.min.css, спрайт и sript.min.js
    watch: {

      style: {
        files: [
          "source/less/*.less",
          "source/less/components/*.less",
        ],
        tasks: [
          'less:develop',
          'cssmin:develop',
        ],
        options: {
          spawn: false,
        },
      },

      sprite: {
        files: ['source/img/sprites/*.png'],
        tasks: ['sprite'],
        options: {
          spawn: false,
        },
      },

      scripts: {
        files: [
          'source/js/*.js',
          'source/js/plugins/*.js'
        ],
        tasks: [
          'concat:develop', 
          'uglify:develop'
        ],
        options: {
            spawn: false,
        },
      },

    },



    // удалить папку build
    clean: {
      build: ["build"]
    },



    // скопировать из папки source в папку build все html-файлы, папку с изображениями и папку со шрифтами
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "*.html",
            "img/*.{png,jpg,gif,svg}",
            "font"
          ],
          dest: "build"
        }]
      }
    },



  });

  grunt.registerTask('build', [
    "clean",  // удалить папку build
    "copy",  // скопировать из папки source в папку build все html-файлы, папку с изображениями и папку со шрифтами
    "less:build",  // скомпилировать source/less/style.less в build/css/style.css
    "autoprefixer",  // добавить префиксы
    "combine_mq",  // объединить медиавыражения ?
    "cssmin:build",  // ужать style.css
    "imagemin",  // оптимизировать изображения
//    "replace",
    "concat:build",  // объединить js-файлы
    "uglify:build",  // ужать js-файлы
  ]);
  
  grunt.registerTask('develop', [
    "sprite",  // создать spritesheet.png и sprites.less
    "less:develop",  // скомпилировать source/less/style.less в source/css/style.css
    "cssmin:develop",  // ужать style.css
    "concat:develop",  // объединить js-файлы
    "uglify:develop",  // ужать js-файлы
  ]);

};