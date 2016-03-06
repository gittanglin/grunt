'use strict';//严格模式

module.exports = function (grunt) {
    //自动加载node库
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    //项目路径
    var config = {
        app: 'app',
        dist: 'dist',
        concat: 'concat',
        css: 'css',
        js: 'js',
        html: 'views'
    };
    //todo 任务配置,所有插件的配置信息
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
        config: config,
        /*
         todo 配置的参数
         expand：如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
         cwd：需要处理的文件（input）所在的目录。
         src：表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
         dest：表示处理后的文件名或所在目录。
         ext：表示处理后的文件后缀名。
         todo  grunt所有模块通用的配置
         filter：一个返回布尔值的函数，用于过滤文件名。只有返回值为true的文件，才会被grunt处理。
         dot：是否匹配以点号（.）开头的系统文件。
         makeBase：如果设置为true，就只匹配文件路径的最后一部分。比如，a?b可以匹配/xyz/123/acb，而不匹配/xyz/acb/123。
         todo  通配符
         *：匹配任意数量的字符，不包括/。
         ?：匹配单个字符，不包括/。
         **：匹配任意数量的字符，包括/。  代表文件夹
         {}：允许使用逗号分隔的列表，表示“or”（或）关系。
         !：用于模式的开头，表示只返回不匹配的情况。

         extDot: 'last',  //最后一个.开始命名
         flatten: false   //拷贝文件夹
         */

        //js压缩
        uglify: {
            dist: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.js %>',
                src: '**/*.js',
                dest: '<%= config.dist %>/<%= config.js %>',
                ext: '.min.js',
                extDot: 'last',
                flatten: false
            }
        },
        //css压缩
        cssmin: {
            dist: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.css %>',
                src: '**/*.css',
                dest: '<%= config.dist %>/<%= config.css %>',
                ext: '.min.css',
                extDot: 'last',
                flatten: false
            }
        },
        //复制
        copy: {
            dist_js: {
                expand: true,
                cwd: '<%= config.app %>/',
                src: '**/*.js',
                dest: '<%= config.dist%>/',
                ext: '.js',
                extDot: 'last',
                flatten: false
            },
            dist_css: {
                expand: true,
                cwd: '<%= config.app %>/',
                src: '**/*.css',
                dest: '<%= config.dist%>/',
                ext: '.css',
                extDot: 'last',
                flatten: false
            },
            dist_html: {
                expand: true,
                cwd: '<%= config.app%>/',
                src: '**/*.html',
                dest: '<%= config.dist%>/',
                ext: '.html',
                extDot: 'last',
                flatten: false
            }
        },
        //删除
        clean: {
            dist: {
                src: '<%= config.dist %>/**/*'
            }
        },
        //语法检查
        jshint: {
            //jshint各项配置参数
            options: {
                asi: false
            },
            files: '<%= config.app %>/**/*.js'
        },
        //代码合并
        concat: {
            js: {
                src: ['<%= config.app %>/js/testa.js', '<%= config.app %>/js/testb.js'],
                dest: 'concat/concatJs.js'
            },
            css: {
                src: ['<%= config.app %>/css/testa.css', '<%= config.app %>/css/testb.css'],
                dest: '<%= config.concat %>/concatCss.css'
            }
        },
        //压缩HTMl
        htmlmin: {
            options: {
                removeComments: true,  //默认值为true, 除了注释的开头加了!都会被删除
                collapseWhitespace: true,  //默认值为 false, 删除标签内内容的空格
                /*collapseBooleanAttributes: true,
                 removeAttributeQuotes: true,
                 removeRedundantAttributes: true,
                 useShortDoctype: true,
                 removeEmptyAttributes: true,*/
                removeOptionalTags: true  //默认值为 false, 删除结束标签，有些标签是可以不加结束标签的
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app%>/',
                    src: '**/*.html',
                    dest: '<%= config.dist%>/',
                    ext: '.html',
                    extDot: 'last',
                    flatten: false
                }]
            }
        },
        //监听
        watch: {
            files: ['<%= config.app %>/**/*.js', '<%= config.app %>/**/*.css'],
            tasks: ['uglify', 'jshint', 'concat', 'cssmin'],
            options: {
                spawn: false
            }

        }
    });


    //todo 当输入grunt命令是,所要执行的任务
    /*  grunt.registerTask('default', ['uglify', 'cssmin', 'copy', 'jshint', 'concat', 'watch']);*/
};
