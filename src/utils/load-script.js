/*
 * -----------------------------------------------------------
 * loadScript.js : 0.1.4 : 2014/02/12 : http://mudcu.be
 * -----------------------------------------------------------
 * Copyright 2011-2014 Mudcube. All rights reserved.
 * -----------------------------------------------------------
 * // No verification
 * loadScript.add("../js/jszip/jszip.js")
 * // Strict loading order and verification.
 * loadScript.add({
 *   strictOrder: true,
 *   urls: [
 *     {
 *       url: "../js/jszip/jszip.js",
 *       verify: "JSZip",
 *       onsuccess: function() {
 *         console.log(1)
 *       }
 *     },
 *     {
 *       url: "../inc/downloadify/js/swfobject.js",
 *       verify: "swfobject",
 *       onsuccess: function() {
 *         console.log(2)
 *       }
 *     }
 *   ],
 *   onsuccess: function() {
 *     console.log(3)
 *   }
 * })
 * // Just verification.
 * loadScript.add({
 *   url: "../js/jszip/jszip.js",
 *   verify: "JSZip",
 *   onsuccess: function() {
 *     console.log(1)
 *   }
 * })
 */

const _globalExists = function (path, root) {
  try {
    path = path
      .split('"')
      .join('')
      .split("'")
      .join('')
      .split(']')
      .join('')
      .split('[')
      .join('.');
    const parts = path.split('.');
    const { length } = parts;
    let object = root || window;
    for (let n = 0; n < length; n++) {
      const key = parts[n];
      if (object[key] == null) {
        return false;
      }
      //
      object = object[key];
    }
    return true;
  } catch (e) {
    return false;
  }
};

const LoadScript = function () {
  this.loaded = {};
  this.loading = {};
  return this;
};

LoadScript.prototype.add = function (config) {
  const that = this;
  if (typeof config === 'string') {
    config = { url: config };
  }
  let { urls } = config;
  if (typeof urls === 'undefined') {
    urls = [
      {
        url: config.url,
        verify: config.verify,
      },
    ];
  }
  // / adding the elements to the head
  const doc = document.getElementsByTagName('head')[0];
  // /
  const testElement = function (element, test) {
    if (that.loaded[element.url]) return;
    if (test && _globalExists(test) === false) return;
    that.loaded[element.url] = true;
    //
    if (that.loading[element.url]) that.loading[element.url]();
    delete that.loading[element.url];
    //
    if (element.onsuccess) element.onsuccess();
    if (typeof getNext !== 'undefined') getNext();
  };
  // /
  let hasError = false;
  let batchTest = [];
  const addElement = function (element) {
    if (typeof element === 'string') {
      element = {
        url: element,
        verify: config.verify,
      };
    }
    if (/([\w\d.\[\]'"])$/.test(element.verify)) {
      // check whether its a variable reference
      const verify = (element.test = element.verify);
      if (typeof verify === 'object') {
        for (let n = 0; n < verify.length; n++) {
          batchTest.push(verify[n]);
        }
      } else {
        batchTest.push(verify);
      }
    }
    if (that.loaded[element.url]) return;
    const script = document.createElement('script');
    script.onreadystatechange = function () {
      if (this.readyState !== 'loaded' && this.readyState !== 'complete')
        return;
      testElement(element);
    };
    script.onload = function () {
      testElement(element);
    };
    script.onerror = function () {
      hasError = true;
      delete that.loading[element.url];
      if (typeof element.test === 'object') {
        for (const key in element.test) {
          removeTest(element.test[key]);
        }
      } else {
        removeTest(element.test);
      }
    };
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', element.url);
    doc.appendChild(script);
    that.loading[element.url] = function () {};
  };
  // / checking to see whether everything loaded properly
  var removeTest = function (test) {
    const ret = [];
    for (let n = 0; n < batchTest.length; n++) {
      if (batchTest[n] === test) continue;
      ret.push(batchTest[n]);
    }
    batchTest = ret;
  };
  var onLoad = function (element) {
    if (element) {
      testElement(element, element.test);
    } else {
      for (let n = 0; n < urls.length; n++) {
        testElement(urls[n], urls[n].test);
      }
    }
    let istrue = true;
    for (let n = 0; n < batchTest.length; n++) {
      if (_globalExists(batchTest[n]) === false) {
        istrue = false;
      }
    }
    if (!config.strictOrder && istrue) {
      // finished loading all the requested scripts
      if (hasError) {
        if (config.error) {
          config.error();
        }
      } else if (config.onsuccess) {
        config.onsuccess();
      }
    } else {
      // keep calling back the function
      setTimeout(function () {
        // - should get slower over time?
        onLoad(element);
      }, 10);
    }
  };
  // / loading methods;  strict ordering or loose ordering
  if (config.strictOrder) {
    let ID = -1;
    var getNext = function () {
      ID++;
      if (!urls[ID]) {
        // all elements are loaded
        if (hasError) {
          if (config.error) {
            config.error();
          }
        } else if (config.onsuccess) {
          config.onsuccess();
        }
      } else {
        // loading new script
        const element = urls[ID];
        const { url } = element;
        if (that.loading[url]) {
          // already loading from another call (attach to event)
          that.loading[url] = function () {
            if (element.onsuccess) element.onsuccess();
            getNext();
          };
        } else if (!that.loaded[url]) {
          // create script element
          addElement(element);
          onLoad(element);
        } else {
          // it's already been successfully loaded
          getNext();
        }
      }
    };
    getNext();
  } else {
    // loose ordering
    for (let ID = 0; ID < urls.length; ID++) {
      addElement(urls[ID]);
      onLoad(urls[ID]);
    }
  }
};

export const loadScript = new LoadScript();
