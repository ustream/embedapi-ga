# Ustream Embed for GA

Transmits Ustream embed iframe events to Google Analytics.

Ustream Embed for GA extends the [Ustream Embed API](https://github.com/ustream/embedapi) to transmit the embeded live iframe events to Google Analytics.
It supports the Universal and the Classic Google Analytics, and the Google Tag Manager.

It listens to the following events:
* `Playing`
* `Stopped`
* `Live`
* `Finished`
* `Offline`


## Dependencies
You have to load the [Ustream Embed API](https://github.com/ustream/embedapi) and one of the three Google's products before the Ustream Embed for GA.

## Usage
Follow the instructions under the [Ustream Embed API](https://github.com/ustream/embedapi) documentation to embed your channel from ustream.tv, and create an UstreamEmbed object.

After pass the viewer object to UstreamEmbedGa
```javascript
var viewer = UstreamEmbed('YOUR IFRAME ID');
var ustreamGa = UstreamEmbedGa(viewer); // Here we pass the viewer object
```

And that's it, we are done. All of the player's events have listened to the Ustream Embed for GA and sent to Google Analytics.

## Usage with Google Tag Manager
To make it work with GTM, you have to do some additional steps in your GTM account.

1. **Create three dataLayer variables** in the gtm with the names:
* ustreamEventAction
* ustreamEventCategory
* ustreamEventLabel

2. **Create a new trigger** with the name: ustreamTriggerEvent

3. **Create a new Universal Analytics tag** with the event track type and set the Category, Action, Label inputs value to the previously defined variables.

## Customize
You can give an optional second parameter with an array of the events you would like to listen to.
```javascript
var ustreamGa = UstreamEmbedGa(viewer, {
    listenTo: ['playing', 'live']
});
```
In the above example the player only listens to the: playing, stopped, and live events.

The following events can be listened:
* playing (includes the stopped event)
* live
* finished
* offline
