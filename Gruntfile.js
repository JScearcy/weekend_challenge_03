module.exports = function(grunt) {
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       my_target: {
         files: {
           'public/javascripts/app.min.js': 'client/javascripts/app.js'
         }
       }
     },
     copy: {
       main: {
         files: [
           {expand: true, cwd: 'client/vendors', src: 'jquery-ui.min.css', dest:'public/vendors/', filter: 'isFile'},
           {expand: true, cwd: 'client/vendors', src: 'jquery-ui.min.js', dest:'public/vendors/', filter: 'isFile'},
           {expand: true, cwd: 'node_modules/bootstrap/dist/css', src: 'bootstrap.min.css', dest:'public/stylesheets/', filter: 'isFile'},
           {expand: true, cwd: 'node_modules/bootstrap/dist/js', src: 'bootstrap.min.js', dest:'public/vendors/', filter: 'isFile'},
           {expand: true, cwd: 'node_modules/bootstrap/fonts', src: '*', dest:'public/fonts/', filter: 'isFile'},
           {expand: true, cwd: 'client/images', src: 'corkboard.jpeg', dest:'public/images/', filter: 'isFile'},
           {expand: true, cwd: 'client/images', src: 'notecard.jpg', dest:'public/images/', filter: 'isFile'},
           {expand: true, cwd: 'client/images', src: 'pinsprite.png', dest:'public/images/', filter: 'isFile'},
           {expand: true, cwd: 'client', src: 'vendors/*', dest:'public/', filter: 'isFile'},
           {expand: true, cwd: 'client', src: 'stylesheets/*', dest: 'public/', filter: 'isFile'}
         ]
       }
     }
   })
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.registerTask('default', ['uglify', 'copy']);
};
