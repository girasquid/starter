#!/bin/sh
# curl -sL http://bit.ly/_goauto | sh
echo "*** Installing..."

echo "

                                 .       .
                                / `.   .' \
                        .---.  <    > <    >  .---.
                        |    \  \ - ~ ~ - /  /    |
                         ~-..-~             ~-..-~
                     \~~~\.'                    `./~~~/
           .-~~^-.    \__/                        \__/
         .'  O    \     /               /       \  \
        (_____,    `._.'               |         }  \/~~~/
         `----.          /       }     |        /    \__/
               `-.      |       /      |       /      `. ,~~|
                   ~-.__|      /_ - ~ ^|      /- _      `..-'   f: f:
                        |     /        |     /     ~-.     `-. _||_||_
                        |_____|        |_____|         ~ - . _ _ _ _ _>

"
curl -sL https://github.com/goauto/srarter/tarball/master | tar -xz --strip-components 1

echo 'All done!';
