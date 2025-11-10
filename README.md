# SlideShow
node.js Slide Show app.

Displays an image randomly selected from a (configurable) directory for a
(configurable) amount of time before displaying another image. 

Subdirectories are automatically included.

When an image is clicked, options are presented to advance to the next image,
move the image to an alternate directory to remove it from the rotation so
that it can be later archived or deleted, and access a settings page that
allows the selection of the images and deletable images directories and set 
the default delay between images. The delay may be overidden locally (via 
cookies), as well as an option for allowing or disallowing video files.


To run the server, execute the StartServer.bat script.

Connect the client to: server_IP:3000

The port number (3000 by default) may be changed via bin/www.