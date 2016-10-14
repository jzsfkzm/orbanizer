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
  'Orbán Viktorok': [
    'Mészáros Lőrincek',
    'Tiborcz Istvánok',
    'Garancsi Istvánok',
    'Andy Vajnák',
    'Flier Jánosok'
  ],
  'Orbán Viktoréknak': [
    'Mészáros Lőrincéknek',
    'Tiborcz Istvánéknak',
    'Garancsi Istvánéknak',
    'Andy Vajnáéknak',
    'Flier Jánoséknak'
  ],
  'Orbán Viktorék': [
    'Mészáros Lőrincék',
    'Tiborcz Istvánék',
    'Garancsi Istvánék',
    'Andy Vajnáék',
    'Flier Jánosék'
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

const createSpan = (textNodes, searchPhrase, replacement) => {
  const div = document.createElement('span');
  textNodes.forEach((item, index) => {
    appendTextNode(div, item);
    if (index < textNodes.length - 1) {
      appendStrike(div, searchPhrase, replacement);
    }
  });

  return div;
};

const clearChildren = (parent) => {
  parent.childNodes.forEach(childElement => parent.removeChild(childElement));
}

const appendTextNode = (parent, text) => {
  parent.appendChild(document.createTextNode(text));
}

const appendStrike = (parent, text, replacement) => {
  let strike = document.createElement('strike');
  parent.appendChild(strike);
  appendTextNode(strike, text);
  appendTextNode(parent, ' ' + replacement);
}

textNodes.forEach(function(node) {
  let replaced = false;
  for (replacement in config) {
    config[replacement].forEach(function(searchPhrase) {
      var text = node.nodeValue;
      var foundItems = text.split(searchPhrase);
      if (!replaced && foundItems.length > 1) {
        replaced = true;
        node.parentElement.replaceChild(createSpan(foundItems, searchPhrase, replacement), node);
      }
    });
  };
});
