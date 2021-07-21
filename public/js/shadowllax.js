// Parallax
const depthFactor = 5; // Depth of the image wrt to the 0 z-index. Infinity being at the same distance as the rest of the content and 1 being as far away as possible.

const resizeParallax = () => {
  document.querySelectorAll('.parallax').forEach(parallax => {
    let height = 0; // To take into account absolute elements;

    parallax.querySelectorAll('.parallax-layer').forEach(layer => {
      const changeHeight = () => {
        height = Math.max(height, layer.clientHeight);

        if(height > parallax.clientHeight) parallax.style.height = `${height}px`; // The largest element's height
      }

      if (layer.clientHeight == 0 && layer.tagName == 'IMG') layer.addEventListener('load', changeHeight); // Images need to load first, then their size becomes determined.
      else changeHeight();
    })
  })
}

const getInitialHeights = () => {
  document.querySelectorAll('.parallax-layer').forEach(layer => {
    layer.setAttribute('data-initial-height', layer.getBoundingClientRect().top + window.pageYOffset)
  })
}

const reposition = () => {
  document.querySelectorAll('.parallax').forEach(parallax => {
    parallax.querySelectorAll('.parallax-layer').forEach(layer => {
      const depth = Number(layer.getAttribute('data-depth-factor') || depthFactor); // Dynamically get depthFactor
      const initialLayerHeight = Number(layer.getAttribute('data-initial-height'));
      let moveLayer = window.scrollY / depth; // The amount the layer should be moved by

      if (initialLayerHeight > document.documentElement.clientHeight) moveLayer -= (initialLayerHeight - document.documentElement.clientHeight) / depth;

      const renderedLayerTop = layer.getBoundingClientRect().top + moveLayer;
      const renderedLayerBottom = layer.getBoundingClientRect().bottom + moveLayer;

      if (renderedLayerTop <= document.documentElement.clientHeight && renderedLayerBottom >= 0) { // Only translate if the final element will be on screen
        layer.style.transform = `translateY(${moveLayer}px)`; // Move differently than the rest of the window
      }
    })
  })

  window.requestAnimationFrame(reposition);
}

window.addEventListener('DOMContentLoaded', () => {
  resizeParallax();
  getInitialHeights();
  window.requestAnimationFrame(reposition);
})
window.addEventListener('resize', resizeParallax);
