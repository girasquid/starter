module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      images: {
        expand: true,
        flatten: true,
        src: ['src/_design/*/*'],
        dest: 'static/img/',
        filter: 'isFile'
      }
    },

    watch: {
      options: {
        // Make sure you load the chrome extension, https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
        livereload: false
      },
      image: {
        // Place your Adobe CC files here with asset generation turned on.
        // This will automatically move the images to your img folder.
        files: ['src/_design/*/*'],
        tasks: ['copy:images']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
}
