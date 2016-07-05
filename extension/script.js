var config = {
  'Orbán Viktornak': [
    'Mészáros Lőrincnek',
    'Tiborcz Istvánnak',
    'Garancsi Istvánnak',
    'Andy Vajnának',
    'Flier Jánosnak'
  ],
  'Orbán Viktorról': [
    'Mészáros Lőrincről',
    'Tiborcz Istvánról',
    'Garancsi Istvánról',
    'Andy Vajnáról',
    'Flier Jánosról'
  ],
  'Orbán Viktort': [
    'Mészáros Lőrincet',
    'Tiborcz Istvánt',
    'Garancsi Istvánt',
    'Andy Vajnát',
    'Flier Jánost'
  ],
  'Orbán Viktorhoz': [
    'Mészáros Lőrinchez',
    'Tiborcz Istvánhoz',
    'Garancsi Istvánhoz',
    'Andy Vajnához',
    'Flier Jánoshoz'
  ],
  'Orbán Viktoré': [
    'Mészáros Lőrincé',
    'Tiborcz Istváné',
    'Garancsi Istváné',
    'Andy Vajnáé',
    'Flier Jánosé'
  ],
  'Orbán Viktortól': [
    'Mészáros Lőrinctől',
    'Tiborcz Istvántól',
    'Garancsi Istvántól',
    'Andy Vajnától',
    'Flier Jánostól'
  ],
  'Orbán Viktorral': [
    'Mészáros Lőrinccel',
    'Tiborcz Istvánnal',
    'Garancsi Istvánnal',
    'Andy Vajnával',
    'Flier Jánossal'
  ],
  'Orbán Viktorra': [
    'Mészáros Lőrincre',
    'Tiborcz Istvánra',
    'Garancsi Istvánra',
    'Andy Vajnára',
    'Flier Jánosra'
  ],
  'Orbán Viktornál': [
    'Mészáros Lőrincnél',
    'Tiborcz Istvánnál',
    'Garancsi Istvánnál',
    'Andy Vajnánál',
    'Flier Jánosnál'
  ],
  'Orbán Viktoron': [
    'Mészáros Lőrincen',
    'Tiborcz Istvánon',
    'Garancsi Istvánon',
    'Andy Vajnán',
    'Flier Jánoson'
  ],
  'Orbán Viktor': [
    'Mészáros Lőrinc',
    'Tiborcz István',
    'Garancsi István',
    'Andy Vajna',
    'Flier János'
  ]
};

var elements = document.getElementsByTagName('*');

var textNodes = Array.from(elements).reduce(function(memo, element) {
  return memo.concat(Array.from(element.childNodes).filter(function(node) {
    return node.nodeType === 3;
  }));
}, []);

var textContent = textNodes.map(function(node) {
  return node.nodeValue;
}).join(' ');

var searchPhrases = Object.keys(config).reduce(function(memo, key) {
  return memo.concat(config[key]);
}, []);

var config = Object.keys(config).reduce(function(memo, key) {
  var found = config[key].filter(function(searchPhrase) {
    return new RegExp(searchPhrase, 'gi').test(textContent);
  });

  if (found.length > 0) {
    memo[key] = found;
  }

  return memo;
}, {});

textNodes.forEach(function(node) {
  for (replacement in config) {
    config[replacement].forEach(function(searchPhrase) {
      var text = node.nodeValue;
      var replacedText = text.replace(new RegExp(searchPhrase, 'gi'), replacement);

      if (replacedText !== text) {
        node.textContent = replacedText;
      }
    });
  };
});



/* ----------- replace images ----------- */

var imgConfig = [
  'Mészáros Lőrinc',
  'Tiborcz István', 
  'Garancsi István',
  'Andy Vajna',
  'Flier János'
];

imgConfig = imgConfig.map(s => s.toLowerCase());

var imgSearchExtra = imgConfig.map(s => ekezetmentesit(s)); //ex.: meszaros lorinc
var imgSearchExtra2 = imgSearchExtra.map(s => s.replace(' ', '_')); //ex.: meszaros_lorinc
var imgSearchExtra3 = imgSearchExtra.map(s => s.replace(' ', '-')); //ex.: meszaros-lorinc

imgConfig = imgConfig.concat(imgSearchExtra, imgSearchExtra2, imgSearchExtra3);

var images = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var image = images[request.imgId];
    image.src = request.uri;
  }
);


var lastAdded = 0;
addAll();

setInterval(function(){
  if(lastAdded + 1000 < Date.now()){
    addAll();
  }
}, 5000);

document.addEventListener('DOMNodeInserted', waitAndAdd);

function waitAndAdd(){
  setTimeout(function(){
    if(lastAdded + 1000 < Date.now()){
      addAll();
    }
  }, 1000);
}

function addAll(){
  lastAdded = Date.now();
  //console.log(Math.floor(lastAdded/1000) + ' addall ');
  addImages(Array.from( document.querySelectorAll('img:not([data-orbanized])') ));
}

function addImages(toAdd){
  toAdd = toAdd.filter(isMutyi);

  var oldLength = images.length;
  images = images.concat(toAdd);

  for(var i = oldLength; i<oldLength+toAdd.length; i++){
    var img = images[i];
    chrome.runtime.sendMessage({url: img.src, imgId: i});
  }

}


function isMutyi(img){
  if(img.dataset.orbanized !== undefined && img.dataset.orbanized){
    return false;
  }

  img.dataset.orbanized = true;

  if(img.src.endsWith('.gif') || img.src.endsWith('.svg')){
    return false;
  }

  var tmp = img.title.toLowerCase() +
            img.alt.toLowerCase() +
            img.src.toLowerCase() +
            decodeURIComponent(img.src).toLowerCase();

  var a = img;
  while(a){
    if(a.nodeName == 'A'){
      tmp += a.href;
      break;
    }
    a = a.parentNode;
  }

  for(var i = 0; i<imgConfig.length; i++){
    if(tmp.includes(imgConfig[i])){
      return true;
    }
  }

  return false;
}

function ekezetmentesit(srt){
  return srt.replace(/[áéíóöőúüű]/g, function(c){
    var map = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u'};
    return map[c];
  });
}