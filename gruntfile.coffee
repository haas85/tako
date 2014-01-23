module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    meta:
      file   : 'tako'
      assets : "assets",
      package : "package",
      temp   : "build",
      banner : """
        /* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>
           <%= pkg.homepage %>
           Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> - Under <%= pkg.license %> License */

        """
    # =========================================================================
    source:
      coffee: [
            "src/**.coffee",
            "src/elements/**.coffee",
            "src/modules/**.coffee"
          ]

      stylus:[
        "stylesheets/Tako.base.styl",
        "stylesheets/Tako.section.styl",
        "stylesheets/Tako.lists.styl",
        "stylesheets/Tako.forms.styl",
        "stylesheets/Tako.layouts.styl",
        "stylesheets/Tako.loader.styl",
        "stylesheets/Tako.buttons.styl",
        "stylesheets/Tako.pullrefresh.styl",
        "stylesheets/Tako.notifications.styl",
        "stylesheets/Tako.colors.styl",
        "stylesheets/Tako.icons.styl"
      ]
      theme: [
        "stylesheets/Tako.theme.styl"
      ],

      components: [
        "components/zepto/zepto.js",
        "components/zepto/detect.js",
        "components/hammer/hammer.js",
        "components/hammer/jquery.hammer.js",
        "components/webdb/webdb.js"
      ]


    # =========================================================================
    coffee:
      core_debug: files: '<%=meta.package%>/js/<%=meta.file%>.debug.js': '<%= source.coffee %>'

    concat:
      components:
        src: "<%= source.components %>",  dest: "<%=meta.temp%>/<%=meta.file%>.components.js"

    uglify:
      options: compress: false
      components: files: '<%=meta.package%>/js/<%=meta.file%>.components.js': '<%=meta.temp%>/<%=meta.file%>.components.js'
      engine: files: '<%=meta.package%>/js/<%=meta.file%>.js': '<%=meta.package%>/js/<%=meta.file%>.debug.js'

    stylus:
      core:
        options: compress: true, import: [ 'Tako.constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.css': '<%=source.stylus%>'
      theme:
        options: compress: true, import: [ 'Tako.constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.theme.css': '<%=source.theme%>'

    usebanner:
      components:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/js/<%=meta.file%>.components.js'
        ]
      js:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/js/<%=meta.file%>.debug.js',
          '<%=meta.package%>/js/<%=meta.file%>.js'
        ]

      css:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.css'
        ]

      theme:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.theme.css'
        ]

    watch:
      coffee:
        files: ["<%= source.coffee %>"]
        tasks: ["coffee:core_debug", "uglify:engine", "usebanner:js"]
      stylus:
        files: ["<%= source.stylus %>"]
        tasks: ["stylus:core", "usebanner:css"]
      theme:
        files: ["<%= source.theme %>"]
        tasks: ["stylus:theme", "usebanner:theme"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-banner"

  grunt.registerTask "default", [ "coffee", "concat", "uglify", "stylus", "concat", "usebanner"]
