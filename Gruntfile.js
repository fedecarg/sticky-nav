var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      sourceDir: 'src',
      outputDir: 'dist',
      jsBundleFilename: 'jquery.sticky-nav-<%= pkg.version %>.min.js',
    },

    /**************************************************************************
     * NPM: grunt-contrib-jshint
     *************************************************************************/
    jshint: {
      files: [ 'Gruntfile.js', '<%= config.sourceDir %>/js/*.js',  '!<%= config.sourceDir %>/js/{,**/}*.min.js' ],
      options: {
        esversion: 6,
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true,
          console: true,
          module: true,
          window: true,
          document: true
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-copy
     *************************************************************************/
    copy: {
      js: {
        files: [{
          cwd: '<%= config.sourceDir %>/js/',
          src: 'jquery.sticky-nav.js',
          dest: '<%= config.outputDir %>/',
          expand: true
        }]
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-concat
     *************************************************************************/
    concat: {
      dist: {
        files: {
          '<%= config.outputDir %>/<%= config.jsBundleFilename %>': [
            '<%= config.sourceDir %>/js/jquery.sticky-nav.js'
          ]
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-browserify
     *************************************************************************/
    browserify: {
      dist: {
        browserifyOptions : {
          debug: true
        },
        options: {
          'transform': [['babelify', { 'presets': ['@babel/preset-env'] }]]
        },
        files: {
          '<%= config.outputDir %>/<%= config.jsBundleFilename %>': '<%= config.outputDir %>/<%= config.jsBundleFilename %>'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-uglify
     *************************************************************************/
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> Copyright (c) <%= pkg.author.name %> - <%= grunt.template.today("dd-mm-yyyy") %> */',
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          '<%= config.outputDir %>/<%= config.jsBundleFilename %>': '<%= config.outputDir %>/<%= config.jsBundleFilename %>'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-clean
     *************************************************************************/
    clean: {
      beforeBuild: {
        src: [ '<%= config.outputDir %>/' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('build', [
    'clean:beforeBuild',
    'jshint',
    'copy',
    'concat',
    'browserify:dist',
    'uglify'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
