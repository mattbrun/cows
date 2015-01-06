module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      bundle: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/fonts/',
          src: '**',
          dest: 'public/fonts/'
        }, {
          expand: true,
          cwd: 'bower_components/fontawesome/fonts/',
          src: '**',
          dest: 'public/fonts/'
        }]
      }
    },

    cssmin: {
      bundle: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'public/css/main.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
            , 'bower_components/fontawesome/css/font-awesome.min.css'
            , 'bower_components/selectize/dist/css/selectize.css'
            , 'bower_components/selectize/dist/css/selectize.bootstrap3.css'
          ]
        }
      }
    },

    concat: {
      options: {
        separator: '\n;\n'
      },
      bundle: {
        files: {
          'public/js/ie.js': [
            'bower_components/html5shiv/dist/html5shiv.js'
            , 'bower_components/respond/dest/respond.src.js'
          ],
          'public/js/main.js': [
            'bower_components/jquery/dist/jquery.js'
            , 'bower_components/bootstrap/dist/js/bootstrap.js'
            , 'bower_components/selectize/dist/js/standalone/selectize.js'
            , 'bower_components/chartjs/Chart.js'
          ]
        }
      },
      dev: {
        files: {
          'public/js/ie.min.js': 'public/js/ie.js',
          'public/js/main.min.js': 'public/js/main.js'
        }
      }
    },

    uglify: {
      bundle: {
        files: {
          'public/js/ie.min.js': 'public/js/ie.js',
          'public/js/main.min.js': 'public/js/main.js'
        }
      }
    },

    clean: {
      bundle: {
        src: [
          'public/js/ie.js'
          , 'public/js/main.js'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'cssmin', 'concat', 'clean']);
  grunt.registerTask('bundle', ['copy', 'cssmin', 'concat:bundle', 'uglify', 'clean']);
};

// npm install grunt grunt-contrib-copy grunt-contrib-uglify grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-clean grunt-contrib-watch