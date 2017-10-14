/* global io:true */
(function () {
  'use strict';

  var canvas = Object.create(null);
  var layers = Object.create(null);

  // get the playground id from a data-attribute generated by the view. Hacky.
  var container = document.getElementById('container');
  var playgroundid = container.getAttribute('data-playgroundid');

  io = io({query: {
    playgroundId: playgroundid,
    client: 'renderer'
  }}).connect();

  io.on('code delete', function (data) {
    var id = data.codeObjectId;
    console.log('canvas deleted for ' + id);

    deleteLayer(id);
    deleteCanvas(id);
  });

  io.on('code update', function (data) {
    var id = data.codeObjectId;
    var code = data.code;
    console.log('code received for ' + id, data);

    updateObject(id, code);
  });

  io.on('playground full update', function (data) {
    clearLayersAndCanvas();
    Object.keys(data).forEach(function (codeObjectId) {
      updateObject(codeObjectId, data[codeObjectId].code);
    });
  });

  function clearLayersAndCanvas () {
    Object.keys(layers).forEach(deleteLayer);
    Object.keys(canvas).forEach(deleteCanvas);
  }

  function resizeToWindow (layer) {
    layer.size(window.innerWidth, window.innerHeight);
  }

  function setDefaultBackgroundToTransparent (layer) {
    layer.background(0, 0);
  }

  function patchBackgroundFunctionToBeTransparentByDefault (layer) {
    var originalBackground = layer.background;

    // This is a replacement for the background() function
    // that defaults the alpha component to zero (fully transparent).
    function zeroAlphaDefaultBackground () {
      var args = [].slice.call(arguments);
      // If no alpha component was specified, add a zero value
      // to force a transparent background
      if (args.length === 1 || args.length === 3) {
        args.push(0);
      }
      return originalBackground.apply(this, args);
    }

    layer.background = zeroAlphaDefaultBackground;
  }

  function createCanvas (id) {
    canvas[id] = document.createElement('canvas');
    document.getElementById('container').appendChild(canvas[id]);
  }

  function deleteCanvas (id) {
    canvas[id].parentNode.removeChild(canvas[id]);
    delete canvas[id];
  }

  function deleteLayer (id) {
    if (layers[id]) {
      try {
        layers[id].exit();
      } catch (e) { }
      delete layers[id];
    }
  }

  function updateObject (id, code) {
    try {
      deleteLayer(id);
      if (!canvas[id]) {
        createCanvas(id);
        console.log('canvas created for ' + id);
      } else {
        console.log('canvas reused for ' + id);
      }
      layers[id] = createLayer(canvas[id], code);
    } catch (e) {
      console.error('Error in code object ' + id + '. Code not rendered. ' + e);
    }
  }

  function createLayer (targetCanvas, code) {
    // The compilation step is split from the creation of the Processing object
    // so that we can hook the onLoad event to set width, height, and background
    // correctly before setup() runs.
    var sketch = window.Processing.compile(code);
    sketch.onLoad = function (layer) {
      setDefaultBackgroundToTransparent(layer);
      patchBackgroundFunctionToBeTransparentByDefault(layer);
      resizeToWindow(layer);
    };
    return new window.Processing(targetCanvas, sketch);
  }

  var resizeTimeout;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      Object.keys(layers).forEach(function (id) {
        resizeToWindow(layers[id]);
      });
    }, 1000);
  });
})();
