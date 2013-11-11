module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    meta:
      file   : 'TaKo'
      assets : "assets",
      package : "package",
      temp   : "build",
      banner : """
        /* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>
           <%= pkg.homepage %>
           Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */

        """
    # =========================================================================
    source:
      coffee: [
            "src/**.coffee",
            "src/elements/**.coffee"
          ]

      stylus:[
        "stylesheets/TaKo.base.styl",
        "stylesheets/TaKo.forms.styl",
        "stylesheets/TaKo.theme.styl"
      ]

      components: [
        "components/zepto/zepto.js"
        # "components/iscroll4/iscroll4.js"
      ]


    # =========================================================================
    coffee:
      core: files: '<%=meta.temp%>/<%=meta.file%>.debug.js': '<%= source.coffee %>'
      core_debug: files: '<%=meta.package%>/js/<%=meta.file%>.debug.js': '<%= source.coffee %>'

    concat:
      components:
        src: "<%= source.components %>",  dest: "<%=meta.temp%>/js/<%=meta.file%>.components.js"

    uglify:
      options: compress: false, banner: "<%= meta.banner %>"
      components: files: '<%=meta.package%>/js/<%=meta.file%>.components.js': '<%=meta.temp%>/js/<%=meta.file%>.components.js'
      engine: files: '<%=meta.package%>/js/<%=meta.file%>.js': '<%=meta.temp%>/<%=meta.file%>.debug.js'

    stylus:
      core:
        options: compress: true, import: [ 'TaKo.constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.css': '<%=source.stylus%>'
      # theme:
      #   options: compress: false, import: [ '__init']
      #   files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.theme.css': '<%=source.theme%>'
      # icons:
      #   files: '<%=meta.package%>/<%=meta.file%>.icon/<%=meta.file%>.icon.css': '<%=source.icons%>'

    watch:
      coffee:
        files: ["<%= source.coffee %>"]
        tasks: ["coffee:core", "coffee:core_debug", "uglify:engine"]
      stylus:
        files: ["<%= source.stylus %>"]
        tasks: ["stylus:core"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", [ "coffee", "concat", "uglify", "stylus",  "concat"]