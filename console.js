function console(object)
{
  // default variable init
  var globalThis = this; // pointer on the object
  var arrayPosition = [];
  var backPosition = null;
  var currentPosition = 0;
  var blockConsole = false;
  var positionAutoScroll = 9999;

  var nullSymbol = document.createElement('SPAN');
  object.appendChild(nullSymbol);
  object.oncontextmenu = function(){return false;}
  backPosition = nullSymbol;
  // ---

  // functions for addition symbols in console
  function insertAfter(elem, refElem) 
  {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }
  function sym(s)
  {
    if(s.length > 1) return false;
    if(s == ' ') return '&nbsp;';
    if(s == "\t") return '&#9;';
    return s;
  }
  // ---

  // prototypes for constructor
  this.blink = true;
  this.getText = function() // get full text console
  {
    return object.innerText;
  }
  this.fillcolor = 'none';
  this.color = '#FFF';
  this.left = function()
  {
    if(currentPosition)
    {
      arrayPosition[--currentPosition].className = "symbol";
      if(!currentPosition) 
      {
        backPosition = arrayPosition[0];
        backPosition.className = "symbol left";
      }
      else
      {
        backPosition = arrayPosition[currentPosition - 1];
        backPosition.className = "symbol right";
      }
    }
  }
  this.right = function()
  {
    if(currentPosition < arrayPosition.length)
    {
      if(currentPosition) arrayPosition[currentPosition - 1].className = "symbol";
      backPosition = arrayPosition[currentPosition++];
      backPosition.className = "symbol right";
    }
  }
  this.input = null; // event input
  this.delay = 500;
  this.exit = function()
  {
    blockConsole = true;
  }
  this.clear = function()
  {
    object.innerHTML = '';
    arrayPosition = [];
    backPosition = null;
    currentPosition = 0;
    blockConsole = false;

    nullSymbol = document.createElement('SPAN');
    nullSymbol.className = "symbol right";
    object.appendChild(nullSymbol);

    backPosition = nullSymbol;
  }
  this.print = function(text, color, bgcolor) // print text console
  {
    if(blockConsole) return false;
    for(var i = 0; i < text.length; i++)
    {

      var s = text.charAt(i);
      if(s == "\r" || s == "\n") 
      {
        var o = document.createElement('BR');
        object.appendChild(o);
      }
      else 
      {
        var o = document.createElement('SPAN');
        o.className = "symbol";
        if(color != undefined) o.style.color = color;
        else o.style.color = globalThis.color;
        if(bgcolor != undefined) o.style.backgroundColor = bgcolor;
        else o.style.backgroundColor = globalThis.fillcolor;
        o.innerHTML = sym(text.charAt(i));
        object.appendChild(o);
      }
      object.scrollTop = positionAutoScroll;
    }
    object.removeChild(nullSymbol);
    nullSymbol = document.createElement('SPAN');
    nullSymbol.className = "symbol";
    object.appendChild(nullSymbol);
    backPosition.className = "symbol";
    backPosition = nullSymbol;
    arrayPosition = [];
    currentPosition = 0;
    return true;
  }
  // ---
  function sprintf(){var l=arguments,p=0,q=function(b,a,f,c){a=b.length>=a?"":Array(1+a-b.length>>>0).join(f);return c?b+a:a+b},r=function(b,a,f,c,e){var d=c-b.length;0<d&&(b=f||!e?q(b,c," ",f):b.slice(0,a.length)+q("",d,"0",!0)+b.slice(a.length));return b},n=function(b,a,f,c,e,d,k){b>>>=0;f=f&&b&&{2:"0b",8:"0",16:"0x"}[a]||"";b=f+q(b.toString(a),d||0,"0",!1);return r(b,f,c,e,k)},u=function(b,a,f,c,e){null!=c&&(b=b.slice(0,c));return r(b,"",a,f,e)};return l[p++].replace(/%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g,
function(b,a,f,c,e,d,k){if("%%"==b)return"%";e=!1;for(var g="",h=!1,m=!1,t=0;f&&t<f.length;t++)switch(f.charAt(t)){case " ":g=" ";break;case "+":g="+";break;case "-":e=!0;break;case "0":h=!0;break;case "#":m=!0}c=c?"*"==c?+l[p++]:"*"==c.charAt(0)?+l[c.slice(1,-1)]:+c:0;0>c&&(c=-c,e=!0);if(!isFinite(c))throw Error("sprintf: (minimum-)width must be finite");d=d?"*"==d?+l[p++]:"*"==d.charAt(0)?+l[d.slice(1,-1)]:+d:-1<"fFeE".indexOf(k)?6:"d"==k?0:void 0;a=a?l[a.slice(0,-1)]:l[p++];switch(k){case "s":return u(String(a),
e,c,d,h);case "c":return u(String.fromCharCode(+a),e,c,d,h);case "b":return n(a,2,m,e,c,d,h);case "o":return n(a,8,m,e,c,d,h);case "x":return n(a,16,m,e,c,d,h);case "X":return n(a,16,m,e,c,d,h).toUpperCase();case "u":return n(a,10,m,e,c,d,h);case "i":case "d":return b=parseInt(+a),g=0>b?"-":g,a=g+q(String(Math.abs(b)),d,"0",!1),r(a,g,e,c,h);case "e":case "E":case "f":case "F":case "g":case "G":return b=+a,g=0>b?"-":g,a=["toExponential","toFixed","toPrecision"]["efg".indexOf(k.toLowerCase())],k=["toString",
"toUpperCase"]["eEfFgG".indexOf(k)%2],a=g+Math.abs(b)[a](d),r(a,g,e,c,h)[k]();default:return b}})};
  this.printf = function(){globalThis.print(sprintf.apply(this,arguments));}
  // handlers console
  window.addEventListener("keypress",function(event)
  {
    if(blockConsole) return false;
    var s = sym(event.key);
    if(!s) return;

    var o = document.createElement("SPAN");
    o.className = "symbol right";
    o.innerHTML = s;
    o.style.color = globalThis.color;
    o.style.backgroundColor = globalThis.fillcolor;
    
    if(backPosition != null) backPosition.className = "symbol";

    if(currentPosition) insertAfter(o, arrayPosition[currentPosition - 1]);
    else object.insertBefore(o, backPosition);

    backPosition = o;
    arrayPosition.splice(currentPosition++,0,o);
    object.scrollTop = positionAutoScroll;
  });

  window.addEventListener("keydown",function(event)
  {
    //alert(event.keyCode);
    if(blockConsole) return false;
    switch(event.keyCode)
    {
      case 8: // delete
        if(currentPosition > 1)
        {
          object.removeChild(arrayPosition[--currentPosition]);
          backPosition = arrayPosition[currentPosition - 1];
          arrayPosition.splice(currentPosition, 1);
          arrayPosition[currentPosition-1].className = "symbol right";
        }
        else if(currentPosition == 1 && arrayPosition.length == 1) // right
        {
          object.removeChild(arrayPosition[0]);
          nullSymbol.className = "symbol left";
          arrayPosition = [];
          currentPosition = 0;
          backPosition = nullSymbol;
        }
        else if(currentPosition == 1) // left
        {
          object.removeChild(arrayPosition[0]);
          arrayPosition.splice(0,1);
          arrayPosition[0].className = "symbol left";
          currentPosition = 0;
          backPosition = arrayPosition[0];
        }
      break;
      case 13: // enter
        backPosition.className = "symbol";
        var o = document.createElement("BR");
        object.appendChild(o);
        object.removeChild(nullSymbol);
        nullSymbol = document.createElement('SPAN');
        nullSymbol.className = "symbol left";
        object.appendChild(nullSymbol);

        if(globalThis.input != null)
        {
          var text = '';
          for(key in arrayPosition)
          {
            var symbolNode = arrayPosition[key];
            text += symbolNode.innerText;
          }
          globalThis.input(text);
        }

        arrayPosition = [];
        currentPosition = 0;
        backPosition = nullSymbol;
        object.scrollTop = positionAutoScroll;
      break;
      case 37: // left
        globalThis.left();
      break;
      case 39: // right
        globalThis.right();
      break;
    }
  });
  var countTurn = true;
  setInterval(function()
  {
    if(backPosition == null) return true;
    countTurn = !countTurn;
    if(countTurn || !globalThis.blink) 
    {
      if(currentPosition) backPosition.className = "symbol right";
      else backPosition.className = "symbol left";
    }
    else backPosition.className = "symbol";
  },this.delay);
}
