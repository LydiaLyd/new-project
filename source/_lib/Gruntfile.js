module.exports = function(grunt) {

  // load tasks from package.json
  require("load-grunt-tasks")(grunt);

  // task configuration
  grunt.initConfig({

    // compile style.less into style.css
    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    // add prefixes
    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    // compress style.css into style.min.css
    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      build: {
        files: {
          "build/css/style.min.css": "build/css/style.css"
        }
      }
    },

    // "comb" style.css
    csscomb: {
      style: {
        expand: true,
        src: "build/css/style.css"
      }
    },

    // combine media queries
    combine_mq: {
      style: {
        src: "build/css/style.css",
        dest: "build/css/style.css"
      }
    },

    // make spritesheet
    sprite: {
      images: {
        src: 'source/img/sprites/*.png',
        dest: 'source/img/spritesheet.png',
        destCss: 'source/less/components/sprites.less',
        algorithm: 'top-down',
        padding: 10
      }
    },

    // optimize images
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: "build/img/*.{png,jpg,gif,svg}"
        }]
      }
    },

    // concatenate js files
    concat: {
      scrypts: {
        src: 'source/js/**/*.js',
        dest: 'build/js/script.js'
      }
    },

    // compress script.js into script.min.js
    uglify: {
      scrypts: {
        src: 'build/js/script.js',
        dest: 'build/js/script.min.js'
      }
    },

    // watch for changes in less and js files and images
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: "source/*.html",
        tasks: "copy",
        options: {
          spawn: false
        }
      },
      style: {
        files: "source/less/**/*.less",
        tasks: [
          "less",
          "autoprefixer",
          "combine_mq",
          "cssmin",
          "csscomb"
        ],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: 'source/js/**/*.js',
        tasks: [
          'concat',
          'uglify'
        ],
        options: {
            spawn: false
        }
      },
      images: {
        files: "source/img/**/*.{png,jpg,gif,svg}",
        tasks: [
          "sprite",
          "imagemin"
        ],
        options: {
          spawn: false
        }
      }
    },

    // remove "build/"
    clean: {
      build: ["build"]
    },

    // copy html, images and fonts from "source/" into "build/"
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "*.html",
            "img/*.{png,jpg,gif,svg}",
            "font/*"
          ],
          dest: "build"
        }]
      }
    }

  });

  grunt.registerTask('build', [
    "clean",         // remove "build/"
    "copy",          // copy html, images and fonts from "source/" into "build/"
    "sprite",        // make spritesheet
    "imagemin",      // optimize images
    "less",          // compile style.less into style.css
    "autoprefixer",  // add prefixes
    "combine_mq",    // combine media queries
    "cssmin",        // compress style.css into style.min.css
    "csscomb",       // "comb" style.css
    "concat",        // concatenate js files
    "uglify"         // compress script.js into script.min.js
  ]);

};
