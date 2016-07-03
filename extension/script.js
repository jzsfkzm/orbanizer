var chChChanges = {
  'Orbán Viktor': [
    'Mészáros Lőrinc',
    'Tiborcz István',
    'Garancsi István',
    'Andy Vajna',
    'Flier János'
  ],
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
  ]
};

var elements = document.getElementsByTagName('*');
Array.from(elements).forEach(function(element) {
  element.childNodes.forEach(function(node) {
    if (node.nodeType === 3) {
      for (replacement in chChChanges) {
        chChChanges[replacement].forEach(function(searchPhrase) {
          var text = node.nodeValue;
          var replacedText = text.replace(new RegExp(searchPhrase, 'gi'), replacement);

          if (replacedText !== text) {
           node.textContent = replacedText;
          }
        });
      };
    }
  });
});
