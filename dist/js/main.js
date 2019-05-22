"use strict";var delay,numBeats=8,activeBeat=0,previousBeat=numBeats-1,playing=!1,tempoControl=document.querySelector("#tempo"),bpm=Number(tempoControl.value);function onboard(){for(var o=0;o<numBeats;o++)for(var e=function(e){var t;t=o,setTimeout(function(){toneToggles[t][e].animate(360)},80*t+80*e+200)},t=0;t<numToggles;t++)e(t)}function calcDelay(){delay=6e4/bpm*4}function getRndInteger(e,t){return Math.floor(Math.random()*(t-e+1))+e}function sortNumber(e,t){return e-t}function setupInteraction(){for(var e=0;e<toneToggleDivs.length;e++)toneToggleDivs[e].addEventListener("click",function(e){for(var t=e.target.getAttribute("id"),o=0;o<numBeats;o++)for(var n=0;n<numToggles;n++)toneToggles[o][n].id==t&&toneToggles[o][n].toggle()},!1);document.addEventListener("keydown",function(e){"Tab"===e.key&&document.body.classList.add("user-is-tabbing")," "===e.key&&updatePlaying()},!1);for(var t=document.querySelectorAll(".random-btn"),o=0;o<t.length;o++)t[o].addEventListener("click",function(e){console.log(e),e.preventDefault(),e.target.blur(),randomizeToggle(e.target.id),updateRandomButtonStatus(e.target.id)},!1);document.querySelector("#play-toggle").addEventListener("click",function(e){updatePlaying(),e.target.blur()},!1),document.querySelector(".sound-selector").addEventListener("click",function(e){var t=e.target.value;("tones"==t&&beatsMode||"beats"==t&&!beatsMode)&&(updateToggleDisplays(),updateToggleStatus(e))},!1);var n=document.querySelector("#sound-selector-mini");n.addEventListener("click",function(e){updateToggleDisplays(),n.innerHTML=beatsMode?"Beats":"Tones",e.target.blur()},!1),tempoControl.addEventListener("input",function(){bpm=Number(this.value),document.querySelector("#tempo-readout").innerHTML=this.value,tempoControl.setAttribute("aria-valuenow",bpm),tempoControl.setAttribute("value",bpm),calcDelay()},!1),document.querySelector("#refresh-btn").addEventListener("click",function(e){setTones(),updateToggleTones(),e.target.blur()},!1),document.querySelector("#clear-btn").addEventListener("click",function(e){clearTones(),e.target.blur()},!1),document.querySelector("#about-modal-open").addEventListener("click",function(){document.querySelector("#about-modal").classList.add("visible")},!1),document.querySelector("#about-modal-close").addEventListener("click",function(){document.querySelector("#about-modal").classList.remove("visible")},!1)}function updateToggleStatus(e){for(var t=document.querySelectorAll(".toggle"),o=0;o<t.length;o++)t[o].classList.remove("selected");e.target.classList.add("selected")}function updateRandomButtonStatus(e){var t=document.querySelectorAll(".random-btn")[e];console.log(t,t.value),"off"==t.value?(t.classList.remove("random-btn-off"),t.classList.add("random-btn-on"),t.value="on"):(t.classList.remove("random-btn-on"),t.classList.add("random-btn-off"),t.value="off")}window.onload=function(){createToggles(),setupInteraction(),calcDelay(),onboard(),setupAudioPlayback()};var wavetableSource={real:[0,-1e-6,-.269882,.107057,-.002942,.013992,-.009736,.001942,-.005952,.00175,-.001294,.001534,-433e-6,.001327,-653e-6,677e-6,-264e-6,338e-6,-501e-6,94e-5,-752e-6,.001031,-.001881,812e-6,-.001156,.001026,-888e-6,871e-6,-757e-6,699e-6,-667e-6,617e-6,-607e-6,598e-6,-589e-6,599e-6,-628e-6,619e-6,-611e-6,603e-6,-596e-6,571e-6,-514e-6,478e-6,-473e-6,467e-6,-462e-6,457e-6,-452e-6,361e-6,-358e-6,354e-6,-351e-6,347e-6,-344e-6,341e-6,-338e-6,335e-6,-332e-6,25e-5,-248e-6,246e-6,-244e-6,242e-6,-24e-5,238e-6,-236e-6,234e-6,-233e-6,181e-6,-179e-6,178e-6,-177e-6,176e-6,-175e-6,173e-6,-172e-6,171e-6,-17e-5,169e-6,-168e-6,167e-6,-134e-6,133e-6,-132e-6,131e-6,-131e-6,13e-5,-129e-6,128e-6,-128e-6,127e-6,-126e-6,126e-6,-125e-6,124e-6,-124e-6,123e-6,-122e-6,122e-6,-121e-6,121e-6,-12e-5,119e-6,-119e-6,118e-6,-95e-6,94e-6,-94e-6,94e-6,-93e-6,93e-6,-92e-6,92e-6,-92e-6,91e-6,-91e-6,9e-5,-9e-5,9e-5,-89e-6,89e-6,-89e-6,88e-6,-88e-6,87e-6,-87e-6,87e-6,-86e-6,86e-6,-86e-6,85e-6,-85e-6,85e-6,-84e-6,84e-6,-84e-6,84e-6,-83e-6,83e-6,-78e-6,77e-6,-77e-6,77e-6,-77e-6,76e-6,-76e-6,76e-6,-76e-6,75e-6,-75e-6,75e-6,-75e-6,74e-6,-74e-6,74e-6,-74e-6,73e-6,-73e-6,73e-6,-73e-6,72e-6,-72e-6,72e-6,-72e-6,72e-6,-71e-6,71e-6,-71e-6,71e-6,-7e-5,7e-5,-7e-5,7e-5,-7e-5,69e-6,-69e-6,69e-6,-69e-6,69e-6,-69e-6,68e-6,-68e-6,68e-6,-68e-6,68e-6,-67e-6,67e-6,-67e-6,67e-6,-67e-6,66e-6,-66e-6,66e-6,-66e-6,66e-6,-66e-6,65e-6,-65e-6,65e-6,-65e-6,65e-6,-65e-6,64e-6,-64e-6,64e-6,-64e-6,64e-6,-64e-6,64e-6,-63e-6,63e-6,-63e-6,63e-6,-63e-6,63e-6,-62e-6,57e-6,-57e-6,57e-6,-56e-6,56e-6,-56e-6,56e-6,-56e-6,56e-6,-56e-6,56e-6,-55e-6,55e-6,-55e-6,55e-6,-55e-6,55e-6,-55e-6,55e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-43e-6,43e-6,-43e-6,34e-6,-34e-6,34e-6,-34e-6,34e-6,-34e-6,34e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6],imag:[0,.5,-2e-6,1e-6,-0,1e-6,-1e-6,0,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,1e-6,-0,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,9e-6,-9e-6,9e-6,-9e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-13e-6,13e-6,-13e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-13e-6,13e-6,-13e-6,13e-6,-13e-6,13e-6,-13e-6,13e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0]},wavetable={real:Float32Array.from(wavetableSource.real),imag:Float32Array.from(wavetableSource.imag)},keyFrequencies=[110,130.81,146.83,164.81,196],keyRootNotes=["A","C","D","E","G"],prime=1,minorSecond=12/11,second=9/8,minorThird=1.2,third=5/4,fourth=4/3,tritone=1.4,fifth=1.5,minorSixth=1.6,sixth=5/3,seventh=15/8,harmonicSeventh=7/4,minorSeventh=1.8,scaleIntervals=[prime,minorThird,third,fourth,fifth,sixth,harmonicSeventh,2*prime,2*minorThird,2*third,2*fourth,2*fifth,2*sixth,2*harmonicSeventh,3*prime],chromaticScale=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],scaleNotes=[["A","C","C&#9839;","D","E","F&#9839;","G&#9839;","A","C","C&#9839;","D","E","F&#9839;","G&#9839;","A"],["C","E&#9837;","E","F","G","A","B","C","E&#9837;","E","F","G","A","B","C"],["D","F","F&#9839;","G","A","B","C&#9839;","D","F","F&#9839;","G","A","B","C&#9839;","D"],["E","G","G&#9839;","A","B","C&#9839;","D&#9839;","E","G","G&#9839;","A","B","C&#9839;","D&#9839;","E"],["G","B&#9837;","B","C","D","E","F&#9839;","G","B&#9837;","B","C","D","E","F&#9839;","G"]],scaleColors=[["A","#DC312E"],["A&#9839;","#E3682F"],["B&#9837;","#E3682F"],["B","#E6822C"],["B&#9839;","#F5CC00"],["C","#F5CC00"],["C&#9839;","#39E14F"],["D","#19CC67"],["D&#9839;","#1FDBCC"],["E&#9837;","#1FDBCC"],["E","#10A3D4"],["F","#6700FF"],["F&#9839;","#A620D2"],["G","#CB1DCB"],["G&#9839;","#D92170"]],beatFiles=[["assets/sounds/BD0050.WAV","Kick"],["assets/sounds/SD0075.WAV","Snare"],["assets/sounds/CP.WAV","Clap"],["assets/sounds/OH00.WAV","Hat"],["assets/sounds/MC50.WAV","Tom"],["assets/sounds/CB.WAV","Bell"]];function initBeats(e){var t=audioCtx.createBufferSource(),o=new XMLHttpRequest;o.open("GET",beatFiles[e][0],!0),o.responseType="arraybuffer",o.onload=function(){audioCtx.decodeAudioData(o.response,function(e){t.buffer=e})},o.send(),t.connect(audioCtx.destination),t.start(0)}var toneToggleDivs,toneToggleContainerDivs,key,keyIndex,tones,notesDisplay,numToggles=5,toneToggles=[],beatsMode=!1;function createToggles(){createToggleObjects(),createRandomButtons(),setTones(),updateToggleTones()}function createToggleObjects(){for(var e=0,t=0;t<numBeats;t++){var o=document.createElement("div");o.classList.add("tone-toggles-container"),document.querySelector("#main-container").append(o);for(var n=[],a=0;a<numToggles;a++){n[a]=new ToneToggle(e,t);var s=document.createElement("div");s.id=e,s.classList.add("tone-toggle","beat-"+t);var i=document.createElement("p");i.classList.add("note-display","note-"+a),s.append(i);var r=document.createElement("p");r.classList.add("beat-display","beatTone-"+a,"inactive-display"),s.append(r),o.append(s),e++}toneToggles.push(n)}toneToggleDivs=document.getElementsByClassName("tone-toggle"),toneToggleContainerDivs=document.getElementsByClassName("tone-toggles-container")}function updateToggleTones(){for(var e=0;e<numToggles;e++)for(var t=document.querySelectorAll(".note-"+e),o=document.querySelectorAll(".beatTone-"+e),n=0;n<numBeats;n++){var a=toneToggles[n][e];a.tone=tones[e],a.note=notesDisplay[e],t[n].innerHTML=notesDisplay[e],a.beat=e,a.beatDisplay=beatFiles[e][1],o[n].innerHTML=beatFiles[e][1];for(var s=0;s<scaleColors.length;s++)a.note==scaleColors[s][0]&&(a.toneColor=scaleColors[s][1],a.activeTone&&a.setBackground())}}function createRandomButtons(){for(var e=0;e<toneToggleContainerDivs.length;e++){var t=document.createElement("button");t.id=e,t.classList.add("icon-button","random-btn","random-btn-off"),t.name="random",t.value="off",t.setAttribute("aria-label","Randomly Select Beat"),toneToggleContainerDivs[e].append(t)}}function clearTones(){for(var e=0;e<numBeats;e++)for(var t=0;t<numToggles;t++){var o=toneToggles[e][t];1!=o.activeTone&&1!=o.activeBeat||(o.activeTone=!1,o.activeBeat=!1,o.setBackground())}}function updateToggleDisplays(){var e=document.querySelectorAll(".note-display"),t=document.querySelectorAll(".beat-display");if(beatsMode){for(var o=0;o<e.length;o++)t[o].classList.add("inactive-display"),e[o].classList.remove("inactive-display");beatsMode=!1}else{for(var n=0;n<e.length;n++)e[n].classList.add("inactive-display"),t[n].classList.remove("inactive-display");beatsMode=!0}for(var a=0;a<numBeats;a++)for(var s=0;s<numToggles;s++)toneToggles[a][s].setBackground()}function randomizeToggle(e){for(var t=0;t<numToggles;t++){var o=toneToggles[e][t];o.activeRandom?o.activeRandom=!1:(o.activeTone&&(o.activeTone=!1,beatsMode||o.setBackground()),o.activeRandom=!0)}}function ToneToggle(o,e,t){this.id=o,this.beatId=e,this.activeTone=!1,this.tone=0,this.note="null",this.toneColor=null,this.activeBeat=!1,this.beatDisplay,this.beat,this.beatColor="#3e3e42",this.activeRandom=!1,this.animate=function(e){this.activeTone=!0,this.setBackground(),this.activeTone=!1,setTimeout(this.setBackground,e)},this.toggle=function(){beatsMode?this.activeBeat?this.activeBeat=!1:this.activeBeat=!0:this.activeTone?this.activeTone=!1:(this.activeTone=!0,this.activeRandom&&(randomizeToggle(this.beatId),updateRandomButtonStatus(this.beatId))),this.setBackground()},this.setBackground=function(){var e,t;(this.activeTone||this.activeBeat)&&(t="#FFFFFF"),beatsMode||(e=this.activeTone?this.toneColor:t=null),beatsMode&&(e=this.activeBeat?this.beatColor:t=null),toneToggleDivs[o].style.backgroundColor=e,toneToggleDivs[o].style.borderColor=e,toneToggleDivs[o].style.color=t},this.play=function(){this.activeRandom&&getRndInteger(0,2)<1&&(playOsc(this.tone),beatsMode||this.animate(300));(this.activeTone||this.activeBeat)&&(this.activeTone&&playOsc(this.tone),this.activeBeat&&initBeats(this.beat),this.expand(),setTimeout(this.contract,delay/(2*numBeats)))},this.expand=function(){var e="scale(0.95)";toneToggleDivs[o].style.webkitTransform=e,toneToggleDivs[o].style.MozTransform=e,toneToggleDivs[o].style.msTransform=e,toneToggleDivs[o].style.OTransform=e,toneToggleDivs[o].style.transform=e},this.contract=function(){var e="scale(1)";toneToggleDivs[o].style.webkitTransform=e,toneToggleDivs[o].style.MozTransform=e,toneToggleDivs[o].style.msTransform=e,toneToggleDivs[o].style.OTransform=e,toneToggleDivs[o].style.transform=e}}function setTones(){keySelection(),noteSelection()}function keySelection(){var e;keyIndex=getRndInteger(0,keyFrequencies.length-1),e=getRndInteger(0,2)<1?1:2,key=keyFrequencies[keyIndex]/e}function noteSelection(){tones=[],notesDisplay=[];for(var e=[];e.length<numToggles-1;){var t=Math.floor(Math.random()*(scaleIntervals.length-1))+1;-1===e.indexOf(t)&&e.push(t)}e.sort(sortNumber);for(var o=0;o<numToggles;o++){var n=void 0;n=0==o?0:e[o-1],tones.push(scaleIntervals[n]),notesDisplay.push(scaleNotes[keyIndex][n])}}var osc,wave,masterGainNode,gainNode,timer,AudioContext=window.AudioContext||window.webkitAudioContext,audioCtx=new AudioContext,toneLength=3,gainValue=1;function setupAudioPlayback(){setupMasterGain(),initOsc()}function setupMasterGain(){(masterGainNode=audioCtx.createGain()).connect(audioCtx.destination),masterGainNode.gain.value=gainValue}function initOsc(){wave=audioCtx.createPeriodicWave(wavetable.real,wavetable.imag),(osc=audioCtx.createOscillator()).setPeriodicWave(wave),gainNode=audioCtx.createGain(),osc.connect(gainNode),gainNode.connect(masterGainNode)}function playOsc(e){initOsc();var t=audioCtx.currentTime;osc.frequency.value=e*key,gainNode.gain.setValueAtTime(gainValue,t),osc.start(t),stopOsc(t),playing=!0}function stopOsc(e){gainNode.gain.exponentialRampToValueAtTime(.001,e+toneLength),osc.stop(e+toneLength),playing=!1}function playTones(){timer=setTimeout(function e(){for(var t=0;t<numToggles;t++)toneToggles[activeBeat][t].play();toneToggleContainerDivs[previousBeat].classList.remove("active-beat-container"),toneToggleContainerDivs[activeBeat].classList.add("active-beat-container"),timer=setTimeout(e,delay/numBeats),numBeats<=++activeBeat&&(activeBeat=0),numBeats<=++previousBeat&&(previousBeat=0)})}function stopTones(){clearTimeout(timer)}function updatePlaying(){var e=document.querySelector("#play-toggle");playing=playing?(stopTones(),e.classList.remove("pause-btn"),e.classList.add("play-btn"),!1):(playTones(),e.classList.remove("play-btn"),e.classList.add("pause-btn"),!0)}