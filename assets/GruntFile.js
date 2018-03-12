module.exports = function(grunt) {
    var srcPath = ['app/*.js','app/controllers/*.js'];
    var depPath = ['app/bower_components'];
    var libPaths = [
        depPath + '/angular/angular.min.js', 
        depPath + '/ngMask/dist/ngMask.min.js', 
        depPath + '/angular-sanitize/angular-sanitize.min.js', 
        depPath + '/javascript-md5/js/md5.min.js',
        depPath + '/angular-bootstrap/ui-bootstrap-tpls.js'
    ];
    var specsPath = 'specs/**/*spec*.js';
    var helperPath = 'specs/helpers/*.js';

    grunt.initConfig({
        concat: {
            none : {},
            zh : {
                options: {
                    process: function(src, filepath) {
                        return '\n' + '// FILE: ' + filepath + '\n' + src;
                    }
                },
                src: libPaths.concat([srcPath]),
                dest: 'dist/main.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', specsPath].concat(srcPath)
        },    
        jasmine : {
            pivotal:{
                // Your project's source files
                src : srcPath,
                // Your Jasmine spec files
                options: {
                    vendor : libPaths,
                    specs : specsPath,
                    // Your spec helper files
                    helpers : helperPath
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: false,
                report : 'min',
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: { 
                'dist/main.min.js': libPaths.concat(srcPath)
                }
            }
        },
        watch: {
            concat : {
                files: [srcPath],
                tasks: ['concat']
            },
            pivotal : {
                files: [specsPath].concat(srcPath), 
                tasks: ['jshint', 'uglify', 'concat']
            },
            test : {
                files: [specsPath].concat(srcPath),
                tasks: ['jasmine']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'concat'] );
    grunt.registerTask('commit', ['jshint','uglify','concat'] );
    
};