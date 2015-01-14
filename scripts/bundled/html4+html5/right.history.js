var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="",n,r,i,s,o,u,a,f=0;e=LZString.compress(e);while(f<e.length*2)f%2==0?(n=e.charCodeAt(f/2)>>8,r=e.charCodeAt(f/2)&255,f/2+1<e.length?i=e.charCodeAt(f/2+1)>>8:i=NaN):(n=e.charCodeAt((f-1)/2)&255,(f+1)/2<e.length?(r=e.charCodeAt((f+1)/2)>>8,i=e.charCodeAt((f+1)/2)&255):r=i=NaN),f+=3,s=n>>2,o=(n&3)<<4|r>>4,u=(r&15)<<2|i>>6,a=i&63,isNaN(r)?u=a=64:isNaN(i)&&(a=64),t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a);return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length)u=LZString._keyStr.indexOf(e.charAt(c++)),a=LZString._keyStr.indexOf(e.charAt(c++)),f=LZString._keyStr.indexOf(e.charAt(c++)),l=LZString._keyStr.indexOf(e.charAt(c++)),i=u<<2|a>>4,s=(a&15)<<4|f>>2,o=(f&3)<<6|l,n%2==0?(r=i<<8,f!=64&&(t+=h(r|s)),l!=64&&(r=o<<8)):(t+=h(r|i),f!=64&&(r=s<<8),l!=64&&(t+=h(r|o))),n+=3;return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32),i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32),i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32),i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32),i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32),i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32),i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32),i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32),i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32),i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32),i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32),i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32),i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32),i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32),i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32),s=0}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14),n=(r&16383)<<2;break;case 2:t+=o(n|r>>13),n=(r&8191)<<3;break;case 3:t+=o(n|r>>12),n=(r&4095)<<4;break;case 4:t+=o(n|r>>11),n=(r&2047)<<5;break;case 5:t+=o(n|r>>10),n=(r&1023)<<6;break;case 6:t+=o(n|r>>9),n=(r&511)<<7;break;case 7:t+=o(n|r>>8),n=(r&255)<<8;break;case 8:t+=o(n|r>>7),n=(r&127)<<9;break;case 9:t+=o(n|r>>6),n=(r&63)<<10;break;case 10:t+=o(n|r>>5),n=(r&31)<<11;break;case 11:t+=o(n|r>>4),n=(r&15)<<12;break;case 12:t+=o(n|r>>3),n=(r&7)<<13;break;case 13:t+=o(n|r>>2),n=(r&3)<<14;break;case 14:t+=o(n|r>>1),n=(r&1)<<15;break;case 15:t+=o(n|r),i=0}s++}return LZString.decompress(t)},compressToUint8Array:function(e){var t=LZString.compress(e),n=new Uint8Array(t.length*2);for(var r=0,i=t.length;r<i;r++){var s=t.charCodeAt(r);n[r*2]=s>>>8,n[r*2+1]=s%256}return n},decompressFromUint8Array:function(e){if(e===null||e===undefined)return LZString.decompress(e);var t=new Array(e.length/2);for(var n=0,r=t.length;n<r;n++)t[n]=e[n*2]*256+e[n*2+1];return LZString.decompress(String.fromCharCode.apply(null,t))},compressToEncodedURIComponent:function(e){return LZString.compressToBase64(e).replace(/=/g,"$").replace(/\//g,"-")},decompressFromEncodedURIComponent:function(e){return e&&(e=e.replace(/$/g,"=").replace(/-/g,"/")),LZString.decompressFromBase64(e)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d),Object.prototype.hasOwnProperty.call(r,s)||(r[s]=f++,i[s]=!0),o=u+s;if(Object.prototype.hasOwnProperty.call(r,o))u=o;else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++)h<<=1,p==15?(p=0,c+=v(h),h=0):p++;n=u.charCodeAt(0);for(t=0;t<8;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}else{n=1;for(t=0;t<l;t++)h=h<<1|n,p==15?(p=0,c+=v(h),h=0):p++,n=0;n=u.charCodeAt(0);for(t=0;t<16;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}a--,a==0&&(a=Math.pow(2,l),l++),delete i[u]}else{n=r[u];for(t=0;t<l;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}a--,a==0&&(a=Math.pow(2,l),l++),r[o]=f++,u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++)h<<=1,p==15?(p=0,c+=v(h),h=0):p++;n=u.charCodeAt(0);for(t=0;t<8;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}else{n=1;for(t=0;t<l;t++)h=h<<1|n,p==15?(p=0,c+=v(h),h=0):p++,n=0;n=u.charCodeAt(0);for(t=0;t<16;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}a--,a==0&&(a=Math.pow(2,l),l++),delete i[u]}else{n=r[u];for(t=0;t<l;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1}a--,a==0&&(a=Math.pow(2,l),l++)}n=2;for(t=0;t<l;t++)h=h<<1|n&1,p==15?(p=0,c+=v(h),h=0):p++,n>>=1;for(;;){h<<=1;if(p==15){c+=v(h);break}p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1)t[a]=a;l=0,h=Math.pow(2,2),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;switch(n=l){case 0:l=0,h=Math.pow(2,8),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;d=v(l);break;case 1:l=0,h=Math.pow(2,16),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;d=v(l);break;case 2:return""}t[3]=d,f=u=d;for(;;){if(m.index>m.string.length)return"";l=0,h=Math.pow(2,s),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;switch(d=l){case 0:l=0,h=Math.pow(2,8),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;t[i++]=v(l),d=i-1,r--;break;case 1:l=0,h=Math.pow(2,16),p=1;while(p!=h)c=m.val&m.position,m.position>>=1,m.position==0&&(m.position=32768,m.val=m.string.charCodeAt(m.index++)),l|=(c>0?1:0)*p,p<<=1;t[i++]=v(l),d=i-1,r--;break;case 2:return u}r==0&&(r=Math.pow(2,s),s++);if(t[d])o=t[d];else{if(d!==i)return null;o=f+f.charAt(0)}u+=o,t[i++]=f+o.charAt(0),r--,f=o,r==0&&(r=Math.pow(2,s),s++)}}};typeof module!="undefined"&&module!=null&&(module.exports=LZString),window.JSON||(window.JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)r=rep[n],typeof r=="string"&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e,t){"use strict";var n=e.History=e.History||{},r=e.document,i=e.RightJS,s=i.$;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){s(e).on(t,n)},trigger:function(e,t,n){s(e).fire(t,n)},extractEventData:function(e,n){var r=n&&n._&&n._[e]||t;return r},onDomLoad:function(e){s(r).onReady(e)}},typeof n.init!="undefined"&&n.init()}(window),function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0,o.enabled=!0,o.savedHashes=[],o.isLastHash=function(e){var t=o.getHashByIndex(),n;return n=e===t,n},o.saveHash=function(e){return o.isLastHash(e)?!1:(o.savedHashes.push(e),!0)},o.getHashByIndex=function(e){var t=null;return typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e],t},o.discardedHashes={},o.discardedStates={},o.discardState=function(e,t,n){var r=o.getHashByState(e),i;return i={discardedState:e,backState:n,forwardState:t},o.discardedStates[r]=i,!0},o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};return o.discardedHashes[e]=r,!0},o.discardedState=function(e){var t=o.getHashByState(e),n;return n=o.discardedStates[t]||!1,n},o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t},o.recycleState=function(e){var t=o.getHashByState(e);return o.discardedState(e)&&delete o.discardedStates[t],!0},o.emulated.hashChange&&(o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a;return o.isInternetExplorer()?(r="historyjs-iframe",i=n.createElement("iframe"),i.setAttribute("id",r),i.style.display="none",n.body.appendChild(i),i.contentWindow.document.open(),i.contentWindow.document.close(),u="",a=!1,o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash()||"",r=o.unescapeHash(i.contentWindow.document.location.hash)||"";return n!==t?(t=n,r!==n&&(u=r=n,i.contentWindow.document.open(),i.contentWindow.document.close(),i.contentWindow.document.location.hash=o.escapeHash(n)),o.Adapter.trigger(e,"hashchange")):r!==u&&(u=r,o.setHash(r,!1)),a=!1,!0}):o.checkerFunction=function(){var n=o.getHash();return n!==t&&(t=n,o.Adapter.trigger(e,"hashchange")),!0},o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval)),!0},o.Adapter.onDomLoad(o.hashChangeInit)),o.emulated.pushState&&(o.onHashChange=function(t){var r=t&&t.newURL||n.location.href,i=o.getHashByUrl(r),s=null,u=null,a=null,f;return o.isLastHash(i)?(o.busy(!1),!1):(o.doubleCheckComplete(),o.saveHash(i),i&&o.isTraditionalAnchor(i)?(o.Adapter.trigger(e,"anchorchange"),o.busy(!1),!1):(s=o.extractState(o.getFullUrl(i||n.location.href,!1),!0),o.isLastSavedState(s)?(o.busy(!1),!1):(u=o.getHashByState(s),f=o.discardedState(s),f?(o.getHashByIndex(-2)===o.getHashByState(f.forwardState)?o.back(!1):o.forward(!1),!1):(o.saveState(s),o.Adapter.trigger(e,"statechange"),o.busy(!1),!0))))},o.Adapter.bind(e,"hashchange",o.onHashChange),o.pushState=function(t,r,i,s){if(o.getHashByUrl(i))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(s!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:s}),!1;o.busy(!0);var u=o.createStateObject(t,r,i),a=o.getHashByState(u),f=o.getState(!1),l=o.getHashByState(f),c=o.getHash();return o.storeState(u),o.expectedStateId=u.id,o.recycleState(u),o.setTitle(u),a===l?(o.busy(!1),!1):a!==c&&a!==o.getShortUrl(n.location.href)?(o.setHash(a,!1),!1):(o.saveState(u),o.Adapter.trigger(e,"statechange"),o.busy(!1),!0)},o.replaceState=function(e,t,n,r,i){if(o.getHashByUrl(n))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(r!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:r}),!1;var s,u,a;return i?(o.busy(!0),e.rnd=(new Date).getTime(),s=o.createStateObject(e,t,n),u=o.getState(!1),a=o.getStateByIndex(-2),o.discardState(u,s,a),o.pushState(s.data,s.title,s.url,!1)):(s=o.getState(),s.data=e,o.idToState[s.id]=s,o.extendObject(o.getLastSavedState(),s)),!0}),o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})},typeof o.init!="undefined"&&o.init()}(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;try{s=e.sessionStorage,s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.extendObject=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},h.setSessionStorageItem=function(e,t){try{s.setItem(e,t)}catch(n){try{s.removeItem(e),s.setItem(e,t)}catch(n){}}},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||r.location.href,n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=r.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var n=h.extractId(e.url),r;if(!n){r=h.getStateString(e);if(typeof h.stateToId[r]!="undefined")n=h.stateToId[r];else if(typeof h.store.stateToId[r]!="undefined")n=h.store.stateToId[r];else{n=s?s.getItem("uniqId"):(new Date).getTime(),n==t&&(n=0);for(;;){++n;if(typeof h.idToState[n]=="undefined"&&typeof h.store.idToState[n]=="undefined"){s&&h.setSessionStorageItem("uniqId",n);break}}h.stateToId[r]=n,h.idToState[n]=e}}return n},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(h.unescapeString(e.url||r.location.href)),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data);if(t.title||n)t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id;return t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r;return n=/(.*)\&_suid=([0-9]+)$/.exec(e),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getHash=function(){var e=h.unescapeHash(r.location.hash);return e},h.unescapeString=function(t){var n=t,r;for(;;){r=e.unescape(n);if(r===n)break;n=r}return n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=h.unescapeString(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i,s;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(n=h.escapeHash(e),h.busy(!0),i=h.extractState(e,!0),i&&!h.emulated.pushState?h.pushState(i.data,i.title,i.url,!1):r.location.hash!==n&&(h.bugs.setHash?(s=h.getPageUrl(),h.pushState(null,null,s+"#"+n,!1)):r.location.hash=n),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.escape(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(r.location.href),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var d=function(){};h.pushState=h.pushState||d,h.replaceState=h.replaceState||d}else h.onPopState=function(t,n){var i=!1,s=!1,o,u;return h.doubleCheckComplete(),o=h.getHash(),o?(u=h.extractState(o||r.location.href,!0),u?h.replaceState(u.data,u.title,u.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(i=h.Adapter.extractEventData("state",t,n)||!1,i?s=h.getStateById(i):h.expectedStateId?s=h.getStateById(h.expectedStateId):s=h.extractState(r.location.href),s||(s=h.createStateObject(null,null,r.location.href)),h.expectedStateId=!1,h.isLastSavedState(s)?(h.busy(!1),!1):(h.storeState(s),h.saveState(s),h.setTitle(s),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i,s){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var o;return s?(t.rnd=(new Date).getTime(),o=h.createStateObject(t,n,r)):(o=h.getState(),o.data=t,h.idToState[o.id]=o,h.extendObject(h.getLastSavedState(),o)),h.isLastSavedState(o)?h.busy(!1):(h.storeState(o),h.expectedStateId=o.id,p.replaceState(o.id,o.title,o.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(LZString.decompress(s.getItem("History.store")))||{}}catch(v){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"beforeunload",h.clearAllIntervals),h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(r.location.href,!0))),s&&(h.onUnload=function(){var e,t;try{e=l.parse(LZString.decompress(s.getItem("History.store")))||{}}catch(n){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),h.setSessionStorageItem("History.store",LZString.compress(l.stringify(e)))},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},h.init()}(window)