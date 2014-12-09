module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    meta:
      file   : 'tako'
      assets : "assets",
      package : "package",
      temp   : "build",
      banner : """
        /* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("dd/mm/yyyy") %>
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
        "stylesheets/Tako.**.styl",
        # "stylesheets/Tako.base.styl",
        # "stylesheets/Tako.aside.styl",
        # "stylesheets/Tako.article.styl",
        # "stylesheets/Tako.lists.styl",
        # "stylesheets/Tako.forms.styl",
        # "stylesheets/Tako.layouts.styl",
        # "stylesheets/Tako.buttons.styl",
        # "stylesheets/Tako.pullrefresh.styl",
        # "stylesheets/Tako.notifications.styl",
        # "stylesheets/Tako.colors.styl",
        # "stylesheets/Tako.icons.styl",
        # "stylesheets/Tako.medias.styl"
      ]
      theme_generic: [
        "stylesheets/theme/generic/fonts.styl",
        "stylesheets/theme/generic/tbase.styl",
        "stylesheets/theme/generic/Theme.**.styl"
      ],

      theme_android: [
        "stylesheets/theme/android/fonts.styl",
        "stylesheets/theme/android/main.styl",
        "stylesheets/theme/android/media.styl"
      ],

      theme_ios: [
        "stylesheets/theme/ios/fonts.styl",
        "stylesheets/theme/ios/main.styl",
        "stylesheets/theme/ios/media.styl"
      ],

      theme_wp: [
        "stylesheets/theme/wp/fonts.styl",
        "stylesheets/theme/wp/main.styl",
        "stylesheets/theme/wp/media.styl"
      ],

      theme_firefoxos: [
        "stylesheets/theme/firefoxos/fonts.styl",
        "stylesheets/theme/firefoxos/main.styl",
        "stylesheets/theme/firefoxos/media.styl"
      ],

      components: [
        "components/zepto/zepto.js",
        "components/zepto/detect.js",
        "components/hammer/hammer.js",
        "components/iscroll/iscroll.js",
        "components/overwriter/overwriter.js",
        "components/webdb/webdb.js"
      ]


    # =========================================================================
    coffee:
      core_debug: files: '<%=meta.package%>/js/<%=meta.file%>.debug.js': "<%=meta.temp%>/<%=meta.file%>.coffee"

    concat:
      components:
        src: "<%= source.components %>",  dest: "<%=meta.temp%>/<%=meta.file%>.components.js"
      core:
        src: "<%= source.coffee %>",  dest: "<%=meta.temp%>/<%=meta.file%>.coffee"

    uglify:
      options: compress: false
      components: files: '<%=meta.package%>/js/<%=meta.file%>.components.js': '<%=meta.temp%>/<%=meta.file%>.components.js'
      engine: files: '<%=meta.package%>/js/<%=meta.file%>.js': '<%=meta.package%>/js/<%=meta.file%>.debug.js'

    stylus:
      core:
        options: compress: true, import: ['constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.css': '<%=source.stylus%>'
      theme_generic:
        options: compress: true, import: ['../constants', '../../constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.theme.css': '<%=source.theme_generic%>'
      theme_android:
        options: compress: true, import: ['../constants', '../../constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.android.css': '<%=source.theme_android%>'
      theme_ios:
        options: compress: true, import: ['../constants', '../../constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.ios.css': '<%=source.theme_ios%>'
      theme_wp:
        options: compress: true, import: ['../constants', '../../constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.wp.css': '<%=source.theme_wp%>'
      theme_firefoxos:
        options: compress: true, import: ['../constants', '../../constants']
        files: '<%=meta.package%>/stylesheets/<%=meta.file%>.firefoxos.css': '<%=source.theme_firefoxos%>'

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

      theme_generic:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.theme.css'
        ]

      theme_android:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.android.css'
        ]
      theme_ios:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.ios.css'
        ]
      theme_wp:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.wp.css'
        ]
      theme_firefoxos:
        options: position: "top", banner: "<%= meta.banner %>", linebreak: false
        files: src: [
          '<%=meta.package%>/stylesheets/<%=meta.file%>.firefoxos.css'
        ]

    watch:
      coffee:
        files: ["<%= source.coffee %>"]
        tasks: [ "concat:core", "coffee:core_debug", "uglify:engine", "usebanner:js"]
      stylus:
        files: ["<%= source.stylus %>"]
        tasks: ["stylus:core", "usebanner:css"]
      theme_generic:
        files: ["<%= source.theme_generic %>"]
        tasks: ["stylus:theme_generic", "usebanner:theme_generic"]
      theme_android:
        files: ["<%= source.theme_android %>"]
        tasks: ["stylus:theme_android", "usebanner:theme_android"]
      theme_ios:
        files: ["<%= source.theme_ios %>"]
        tasks: ["stylus:theme_ios", "usebanner:theme_ios"]
      theme_wp:
        files: ["<%= source.theme_wp %>"]
        tasks: ["stylus:theme_wp", "usebanner:theme_wp"]
      theme_firefoxos:
        files: ["<%= source.theme_firefoxos %>"]
        tasks: ["stylus:theme_firefoxos", "usebanner:theme_firefoxos"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-banner"

  grunt.registerTask "default", [ "concat", "coffee", "uglify", "stylus", "concat", "usebanner"]
