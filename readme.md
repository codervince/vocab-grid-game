README

# Vocab Grid Game

_Aims_

Adaptation of ReactJS Succinctly project to create a vocabulary trainer in different languages


_Specs_

Users play the memorization game but at the same time are exposed to Swiss German terms

Each square they click on to get right will flip and show the term and the explanation

Allow users to choose from different termbases
e.g. Swiss German, Russian, Math

rows*columns are selected randomly in the constructor shuffled and
added to fronts/backs objects


Keep score!!


# How to Run
Hand rolled Node server, so:

```serve -p 3002```


# extensions

* use data from JSON file 
* change timer to make harder and easier
*  add points
*  pay2play + leader board
* flash winning terms at end


```js
(function blink() { 
  $('.blink_me').fadeOut(500).fadeIn(500, blink); 
})();
```
