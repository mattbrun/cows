module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      bundle: {
        options: {
          rebase: false
        },
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
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/fontawesome/css/font-awesome.min.css',
            'bower_components/selectize/dist/css/selectize.css',
            'bower_components/selectize/dist/css/selectize.bootstrap3.css'
          ],
          'public/css/home-page.min.css': [
            'staticSite/css/agency.css',
            'staticSite/css/google-fonts.css'
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
            'bower_components/html5shiv/dist/html5shiv.js',
            'bower_components/respond/dest/respond.src.js'
          ],
          'public/js/main.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/selectize/dist/js/standalone/selectize.js',
            'bower_components/chartjs/Chart.js'
          ],
          'public/js/home-page.js': [
            'bower_components/jquery.easing/js/jquery.easing.min.js',
            'bower_components/classie/classie.js',
            'bower_components/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.js',
            'staticSite/js/cbpAnimatedHeader.js',
            'staticSite/js/contact_me.js',
            'staticSite/js/agency.js'
          ],
        }
      },
      dev: {
        files: {
          'public/js/ie.min.js': 'public/js/ie.js',
          'public/js/main.min.js': 'public/js/main.js',
          'public/js/home-page.min.js': 'public/js/home-page.js'
        }
      }
    },

    uglify: {
      bundle: {
        files: {
          'public/js/ie.min.js': 'public/js/ie.js',
          'public/js/main.min.js': 'public/js/main.js',
          'public/js/home-page.min.js': 'public/js/home-page.js',
        }
      }
    },

    clean: {
      bundle: {
        src: [
          'public/js/ie.js',
          'public/js/main.js',
          'public/js/home-page.js'
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
