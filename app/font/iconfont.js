;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-caidan" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M127.9994 758.433174c-33.998349 0-64.417725 28.629589-64.417725 62.627339 0 33.998949 30.419376 64.418125 64.417725 64.418125 33.997949 0 62.627938-30.419376 62.627938-64.418125C190.627139 787.062564 161.99715 758.433174 127.9994 758.433174zM127.9994 450.647053c-33.998349 0-64.417725 28.629989-64.417725 62.627938 0 34.006943 30.419376 62.642329 64.417725 62.642329 33.997949 0 62.627938-28.635585 62.627938-62.642329C190.627139 479.277042 161.99715 450.647053 127.9994 450.647053zM357.038912 262.762439l542.180602 0c32.209162 0 59.049764-25.051015 59.049764-57.259578 0-32.209162-26.840602-59.049764-59.049764-59.049764L357.038912 146.453097c-32.208563 0-59.049365 26.840802-59.049365 59.049764C297.989747 237.711624 324.830349 262.762439 357.038912 262.762439zM127.9994 141.085336c-33.998349 0-64.417725 30.419376-64.417725 64.417725 0 33.997949 30.419376 62.627938 64.417725 62.627938 33.997949 0 62.627938-28.629989 62.627938-62.627938C190.627139 171.504512 161.99715 141.085336 127.9994 141.085336zM899.219513 454.225627 357.038912 454.225627c-32.208563 0-59.049365 26.840802-59.049365 59.049365 0 32.216157 26.840802 59.062755 59.049365 59.062755l542.180602 0c32.209162 0 59.049764-26.846598 59.049764-59.062755C958.269277 481.066429 931.428675 454.225627 899.219513 454.225627zM899.219513 762.011748 357.038912 762.011748c-32.208563 0-59.049365 26.840802-59.049365 59.048765 0 32.209162 26.840802 59.049764 59.049365 59.049764l542.180602 0c32.209162 0 59.049764-26.840602 59.049764-59.049764C958.269277 788.85255 931.428675 762.011748 899.219513 762.011748z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xialajianzuo" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M702.07401 159.248957c18.841114 18.841114 10.012028 58.21589-19.718087 87.947028L409.871995 519.67889c-29.731138 29.731138-69.105914 38.559201-87.947028 19.718087l0 0c-18.841114-18.841114-10.012028-58.21589 19.718087-87.947028l272.482905-272.482905C643.85812 149.236929 683.232896 140.407843 702.07401 159.248957L702.07401 159.248957z"  ></path>'+
      ''+
      '<path d="M702.07401 864.751043c-18.841114 18.841114-58.21589 10.012028-87.947028-19.718087L341.644077 572.549028c-29.731138-29.731138-38.559201-69.105914-19.718087-87.947028l0 0c18.841114-18.841114 58.21589-10.012028 87.947028 19.718087l272.482905 272.482905C712.086038 806.535153 720.915124 845.909929 702.07401 864.751043L702.07401 864.751043z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
