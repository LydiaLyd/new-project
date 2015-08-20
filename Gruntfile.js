module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
 
    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "index.html",
            "img/*.{png,jpg,gif,svg}",
            "font"
          ],
          dest: "build"
        }]
      }
    },

    less: {
      styleBuild: {
        files: {
          "build/css/style.css": ["source/less/style.less"],
        }
      },
      styleDevelopment: {
        files: {
          "source/css/style.css": ["source/less/style.less"],
        }
      },
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },
      style: {
        src: "build/css/style.css"
      },
    },

    combine_mq: {
      style: {
        src: "build/css/style.css",
        dest: "build/css/style.css"
      }
    },

    cssmin: {
      styleBuild: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
        }
      },
      styleDevelopment: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "source/css/style.min.css": ["source/css/style.css"],
        }
      },
    },

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

//    htmlmin: {
//      options: {
//        removeComments: true,
//        collapseWhitespace: true,
//        collapseBooleanAttributes: true,
//        caseSensitive: true,
//        keepClosingSlash: false
//      },
//      html: {
//        files: {
//          "build/index.min.html": "build/index.html"
//        }
//      }
//    },

//    replace: {
//      build: {
//        options: {
//          patterns: [{
//            match: /[\"\']img\//g,
//            replacement: '"/static/img'
//          }, {
//            match: /[\"\']css\//g,
//            replacement: '"/static/css'
//          }, {
//            match: /[\"\']js\//g,
//            replacement: '"/static/js' 
//          }]
//        },
//        files: [{
//          expand: true,
//          src: [
//            "build/css/style*.css",
//            "build/index*.html"
//          ]
//        }]
//      }
//    },

//    concat: {
//      scriptBuild: {
//        src: 'source/js/*.js',
//        dest: 'build/js/script.js',
//      },
//      scriptDevelopment: {
//        src: 'source/js/*.js',
//        dest: 'source/js/script.js',
//      },
//    },

    uglify: {
      scriptBuild: {
        src: 'build/js/script.js',
        dest: 'build/js/script.min.js',
      },
      scriptDevelopment: {
        src: 'source/js/script.js',
        dest: 'source/js/script.min.js',
      },
    },

    csscomb: {
      style: {
        expand: true,
        src: ["source/less/**/*.less"]
      }
    },

    sprite: {
      all: {
        src: 'source/img/sprites/*.png',
        dest: 'source/img/spritesheet.png',
        destCss: 'source/css/sprites.css',
        algorithm: 'top-down',
        padding: 10,
      }
    },

    watch: {
      less: {
        files: [
          "source/less/*.less",
          "source/less/components/*.less"
        ],
        tasks: ['less:styleDevelopment', 'cssmin:styleInSource',],
        options: {
          spawn: false,
        }
      },
      sprite: {
        files: ['source/img/sprites/*.png'],
        tasks: ['sprite'],
        options: {
          spawn: false,
        }
      },
      },
      scripts: {
        files: ['source/js/*.js'],
        tasks: [
//          'concat:scriptDevelopment', 
          'uglify:scriptDevelopment'
        ],
        options: {
            spawn: false,
        },
      },
    });

  grunt.registerTask('build', [
    "clean",
    "copy",
    "less:styleBuild",
    "autoprefixer",
    "combine_mq",
    "cssmin:style",
    "imagemin",
//    "htmlmin",
//    "replace",
//    "concat:scriptBuild",
    "uglify:scriptBuild"
  ]);
  
  grunt.registerTask('development', [
    "less:styleDevelopment",
    "cssmin:styleInSource",
    "sprite",
//    "concat:scriptDevelopment",
    "uglify:scriptDevelopment"
  ]);

};