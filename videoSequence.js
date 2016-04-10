var videoSequence = function(options) {
 "use strict";

 var vendors = ['ms', 'moz', 'webkit', 'o'];

 this.filesLoaded = 0;
 this.options = {};
 this.defaults = {
  secondsNum: 20,
  imageNum: 150,
  filesToBuffer: 2, // After loading this number of files the video sequence will be played.
  filesPath: ["assets/images01.js",
   "assets/images02.js",
   "assets/images03.js",
   "assets/images04.js",
   "assets/images05.js",
   "assets/images06.js"
  ],
  onBufferStart: function() {},
  onBufferComplete: function() {},
  onSequenceStart: function() {},
  onSequence25: function() {},
  onSequence50: function() {},
  onSequence75: function() {},
  onSequenceComplete: function() {},
  onSequencePlay: function() {},
  onSequenceStop: function() {}
 };

 this.image = new Image();
 this.animation;
 this.now;
 this.then = Date.now();
 this.delta;

 this.options = extend(this.defaults, options);

 for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
 }

 function extend() {
  for (var i = 1; i < arguments.length; i++)
   for (var key in arguments[i])
    if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
  return arguments[0];
 }
}

videoSequence.prototype = {
 init: function() {
  this.currentFPS = this.getFPS(this.options.imageNum, this.options.secondsNum);
  this.currentInterval = this.getMyInterval(this.currentFPS);
  this.startBuffering(this);
  this.options.onBufferStart.call(this);
 },
 startBuffering: function(obj) {
  var currentFile = document.createElement('script');
  currentFile.onload = function() {
   obj.filesLoaded++;
   if (obj.filesLoaded < obj.options.filesPath.length) {
    obj.startBuffering(obj);
   } else {
    obj.options.onBufferComplete.call(obj);
   }
   if (obj.options.filesToBuffer == obj.filesLoaded) {
    obj.startSequence();
   }
  };
  currentFile.src = obj.options.filesPath[obj.filesLoaded];
  document.body.appendChild(currentFile);
 },
 stopBuffering: function() {
  this.filesLoaded = 1000;
 },
 startSequence: function() {
  cancelAnimationFrame(this.animation);
  this.options.onSequenceStart.call(this);
  this.imagesPlayed = 0;
  this.imageSet = imageSet;
  return this.animate(this);
 },
 resumeSequence: function() {
  this.options.onSequenceStart.call(this);
  return this.animate(this);
 },
 stopSequence: function() {
  this.options.onSequenceStart.call(this);
  return cancelAnimationFrame(this.animation);
 },
 animate: function(obj) {
  this.animation = requestAnimationFrame(function() {
   obj.animate(obj);
  });
  this.now = Date.now();
  this.delta = this.now - this.then;
  if (this.delta > this.currentInterval) {
   this.then = this.now - (this.delta % this.currentInterval);
   this.imagesPlayed++;
   this.image.src = this.imageSet[this.imagesPlayed];
   this.options.sequenceContainer.src = this.imageSet[this.imagesPlayed];
   switch (this.getVideoPlayed(obj)) //lastInteraction prevents to dispatch multiple interactions
   {
    case 25:
     if (obj.lastInteraction != 25) {
      this.options.onSequence25.call(this);
      obj.lastInteraction = 25;
     }
     break;
    case 50:
     if (obj.lastInteraction != 50) {
      this.options.onSequence50.call(this);
      obj.lastInteraction = 50;
     }
     break;
    case 75:
     if (obj.lastInteraction != 75) {
      this.options.onSequence75.call(this);
      obj.lastInteraction = 75;
     }
     break;
    case 100:
     obj.lastInteraction = 100;
     cancelAnimationFrame(obj.animation);
     obj.options.onSequenceComplete.call(obj);
     break;
   }
  }

 },
 getVideoPlayed: function(obj) {
  return Math.round((obj.imagesPlayed * 100 / obj.options.imageNum));
 },
 getFPS: function(framesNUM, secondsNUM) {
  return framesNUM / secondsNUM;
 },
 getMyInterval: function(FPSNUM) {
  return 1000 / FPSNUM;
 }
}