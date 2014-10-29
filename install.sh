#!/bin/sh
# curl get.tcms.me | sh

echo "*** Installing Tentacle CMS..."
echo " _/_/_/_/_/ _/ _/ _/ _/_/ _/_/_/ _/_/_/_/ _/_/_/ _/_/_/ _/ _/_/ _/ _/_/_/_/ _/ _/ _/ _/ _/ _/ _/ _/_/_/_/ _/ _/ _/ _/ _/ _/ _/ _/ _/ _/ _/ _/_/_/ _/ _/ _/_/ _/_/_/ _/_/_/ _/ _/_/_/"

curl -sL https://github.com/adampatterson/Tentacle/tarball/beta-wip | tar -xz --strip-components 1
echo " *** All done, View the site in your web browser to complete the installation."

#   All done!'; #

echo 'To start the install simply refresh this page to begin.';
