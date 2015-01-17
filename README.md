## Start
---

Start by creating the related repository. [Download](https://github.com/goauto/starter/archive/master.zip) and extract the repo to that folder.

You can also run `curl -sL http://bit.ly/_goauto | sh` which will download and extract the cotnents to the new project.

If you like, open `~/.bash_profile` and add `alias go='curl -sL http://bit.ly/_goauto | sh'` reload your profile by running `. ~/.bash_profile`.


### Install Node.js

(Node.JS)[http://nodejs.org]

### Install Bower. 

`npm install -g bower`

### Install Gulp

`sudo npm install --global gulp`

## Project setup
---

Open the root of the project in terminal, you should see a few key files `.bowerrc, bower.json, gulpfile.js, package.json`

The key folder structure should be something like this.

* .gitignore
* /src
* /src/_design/ { Photoshop files }
* /src/_recources/ { Fonts and other assets }
* /static/js/src/ { Script source files }
* /static/js/app.js
* /static/img/
* /static/less/app.less
* /static/less/extend.less
* /static/less/bootstrap.less
* /static/source/ { JSON files for Gulp }


### bower.json
    
    {
      "name": "goAuto",
      "version": "0.1.0",
      "dependencies": {
        "ga-assets": "git@github.com:goauto/ga-assets.git"
      }
    }

Run `bower install` this will install the required packages like jQuery, Bootstrap and so on.

You will see a folder named 'ga-assets' this is where we keep the common assets used on all Go Auto sites.


### Gulp
To get grunt up and running use `npm install` to install its packages, after that you only need to run `gulp`.


### Images

[Read more](http://blogs.adobe.com/photoshopdotcom/2013/09/introducing-adobe-generator-for-photoshop-cc.html)

###CokeKit

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
    *.pyc
    *.map
    static/vendor/
    static/node_modules
    npm-debug.log
    .idea/
