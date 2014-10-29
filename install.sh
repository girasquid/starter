#!/bin/sh
# curl get.tcms.me | sh
lsecho "*** Installing..."

echo " __
/__ _  /\   _|_ _
\_|(_)/--\|_||_(_)

"
curl -sL https://github.com/goauto/srarter/tarball/master | tar -xz --strip-components 1

echo 'All done!';
