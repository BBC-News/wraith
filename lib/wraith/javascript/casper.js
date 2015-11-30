// modules
var system = require('system'),
    casper = require('casper').create();

// command line arguments
var url = casper.cli.get(0),
    dimensions = requireRelative('_getDimensions.js')(casper.cli.get(1)),
    image_name = casper.cli.get(2),
    selector = casper.cli.get(3),
    globalBeforeCaptureJS = casper.cli.get(4),
    pathBeforeCaptureJS = casper.cli.get(5),
    dimensionsProcessed = 0,
    currentDimensions;

// functions
function takingMultipleScreenshots() {
  return dimensions.length && dimensions.length > 1;
}
function requireRelative(file) {
  // PhantomJS will automatically `require` relatively, but CasperJS needs some extra help. Hence this function.
  // 'templates/javascript/casper.js' -> 'templates/javascript'
  var currentFilePath = system.args[3].split('/');
  currentFilePath.pop();
  var fs = require('fs');
  currentFilePath = fs.absolute(currentFilePath.join('/'));
  return require(currentFilePath + '/' + file);
}
function snap() {
  console.log('Snapping ' + url + ' at: ' + currentDimensions.viewportWidth + 'x' + currentDimensions.viewportHeight);

  if (!selector) {
    this.capture(image_name);
  }
  else {
    this.captureSelector(image_name, selector);
  }

  dimensionsProcessed++;
  if (takingMultipleScreenshots() && dimensionsProcessed < dimensions.length) {
    currentDimensions = dimensions[dimensionsProcessed];
    image_name = replaceImageNameWithDimensions(image_name, currentDimensions);
    casper.viewport(currentDimensions.viewportWidth, currentDimensions.viewportHeight);
    casper.wait(300, function then () {
      snap.bind(this)();
    });
  }
}
function replaceImageNameWithDimensions(image_name, currentDimensions) {
  // shots/clickable_guide__after_click/MULTI_casperjs_english.png
  // ->
  // shots/clickable_guide__after_click/1024x359_casperjs_english.png
  var dirs = image_name.split('/'),
      filename = dirs[dirs.length - 1],
      filenameParts = filename.split('_'),
      newFilename;

  filenameParts[0] = currentDimensions.viewportWidth + 'x' + currentDimensions.viewportHeight;
  dirs.pop(); // remove MULTI_casperjs_english.png
  newFilename = dirs.join('/') + '/' + filenameParts.join('_');
  return newFilename;
}

if (takingMultipleScreenshots()) {
  currentDimensions = dimensions[0];
  image_name = replaceImageNameWithDimensions(image_name, currentDimensions);
}
else {
  currentDimensions = dimensions;
}

// Casper can now do its magic
casper.start();
casper.open(url);
casper.viewport(currentDimensions.viewportWidth, currentDimensions.viewportHeight);
casper.then(function() {
  if (globalBeforeCaptureJS) {
    require('./' + globalBeforeCaptureJS)(this);
  }
});
casper.then(function() {
  if (pathBeforeCaptureJS) {
    require('./' + pathBeforeCaptureJS)(this);
  }
});
// waits for all images to download before taking screenshots
// (broken images are a big cause of Wraith failures!)
// Credit: http://reff.it/8m3HYP
casper.waitFor(function() {
  return this.evaluate(function() {
    var images = document.getElementsByTagName('img');
    return Array.prototype.every.call(images, function(i) { return i.complete; });
  });
}, function then () {
  snap.bind(this)();
});

casper.run();
