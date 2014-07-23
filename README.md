# Launch Party Photobooth!

This app was created to satisfy the need of a photobooth during Brazil's Firefox Australis launch party that took place at FISL. We've created an app based on [Christian Heilmann's Interaction Cam](http://codepo8.github.com/interaction-cam/). I've made a few changes (since we were not using MaKey MaKey unfortunately) and have created a personalized framing for our event.

## Setup

The app has been tested on Chrome, Opera an Firefox Nightly 18. In order to get it to work on Chrome, you need to grant it access to theCamera. On Firefox, it should be ok since getting an stream from the Camera has already landed on stable!

The demo is [right here on GitHub on this repository](http://marcussaad.github.io/launchparty-photobooth/).

##Screenshot

![screenshot](http://i.imgur.com/wmnvC7v.png)

## Usage

Design is simplistic and functional (not really, but I did my best). 

* Click on the Camera Icon (Yes, it was borrowed from Firefox OS intentionally)
* Before taking a picture, customize your Adjective by selecting a new one on the dropdown.
* You'll need to use timers to take a picture, they are set to shoot on 3, 5 or 10 seconds.
* You may try again if the result doesn't meet your needs.
* If you're good to go, go ahead and click on Share This! Your image will be uploaded to imgur. As soon as the callback is made, click on the Twitter Icon to share it using your credentials.

## Image uploading 

The image uploading is using the [CORS anonymous API of imgur](http://api.imgur.com/#anonapi) for storing pictures. The original code was used in the [Motivational Poster Generator](https://github.com/paulrouget/motivational) which used to be part of the Mozilla Web'o'Wonder.

If you use this, please [get your own Application Key](https://imgur.com/register/api_anon) as the API is limited to 50 images per hour!



