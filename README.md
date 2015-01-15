### Install Node.js

(Node.JS)[http://nodejs.org]

### Install Bower. 

`npm install -g bower`

### Install Grunt

`sudo npm install -g grunt-cli`

### Setup the project.

Open the root of the project in terminal, you should see a few key files `.bowerrc, bower.json, Gruntfile.js, package.json`

The key folder structure should be something like this.

* .gitignore
* /src
* /src/_design/ {photoshop files}
* /src/_recources/ {fonts and other assets}
* /static/js/app.js
* /static/img/
* /static/less/app.less
* /static/less/extend.less
* /static/less/bootstrap.less


### bower.json
    
    {
      "name": "goAuto",
      "version": "0.1.0",
      "dependencies": {
        "ga-assets": "git@github.com:goauto/ga-assets.git",
        "jquery.lazyload": "https://github.com/tuupola/jquery_lazyload/"
      }
    }

Run `bower install` to install the required packages.

`bootstrap.less` can be copied out from the vendor/bootstrap folder and placed in `/static/less/bootstrap.less` with the addition of an `@import "extend";` jsut after the bootstraps own import of `variables.less`

### Grunt
To get grunt up and running use `npm install` to install its packages, after that you only need to run `grunt watch`.

Grunt helps by watching for file changes in the `/src/_design/` folders and moving any image assets generated by photoshop into the `   `/static/img/` folder

[Read more](http://blogs.adobe.com/photoshopdotcom/2013/09/introducing-adobe-generator-for-photoshop-cc.html)

###CokeKit

However you like to compile the LESS and Javascript should work fine, but all LESS and JS should be minified.

app.js contains the sites specific javascript while any external javascript should be included ( prepended ) in the same file to keep the file size aad number of requests lower. This will compile a minified souce file to `/static/js/app.min.js`

Use discretion here, if the file started to get to big consider a payload or package file and then keep the app javascript separate.


Here is an example of my `app.less` file, this compiles to `/static/css/app.min.css`

    // Import the Bootstrap Core.
    @import "bootstrap.less";
    
    // Extended
    @import "mixins";
    @import "responsive";
    @import "ie";
    
    // Main site styles
    @import "style";


### .gitignore

Bower basically clones a remote repository to your working project, thus it also brings over a lot of junk. Here is an basic example of what I ignored. You will need to adjust depending on what packages you include.  

It is VERY important not to include the `/node_modules/` folder in git!

    *.DS_Store
    /node_modules/
    /static/vendor/
