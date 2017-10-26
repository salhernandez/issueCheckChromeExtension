// Inject the payload.js script into the current tab after the popout has loaded
// window.addEventListener('load', function (evt) {
// 	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
// 		file: 'payload.js'
// 	});
// });

//
// // Listen to messages from the payload.js script and write to popout.html
// chrome.runtime.onMessage.addListener(function (message) {
// 	document.getElementById('pagetitle').innerHTML = message;
// });

var storage = chrome.storage.local;

//when the extension opens
window.addEventListener('load', function (evt) {
  changeUI();
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

		//makes sure that the extension is only triggered if it is base dona google search

		if(tab.url.includes("https://www.google.com/search?")){
			chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
				file: 'payload.js'
			});

		}

		else{//it's not a google search
		}
  }
})


//UI related code
function doSwitchOnStack() {
  let stackButton = document.getElementById('stack-overflow-button');
    //turn off
    if(stackButton.className == "on") {
      stackButton.className="off";
      stackButton.innerHTML = "off";
      updateData("stackOverflow", false);

    } else {//turn on
      stackButton.className="on";
      stackButton.innerHTML = "on";
      updateData("stackOverflow", true);
    }
}

function doSwitchOnGitHub() {
  //turn off
    if(document.getElementById('github-button').className == "on") {
            document.getElementById('github-button').className="off";
            updateData("GitHub", false);
    } else {//turn on
              document.getElementById('github-button').className="on";
              updateData("GitHub", true);
    }
}

document.getElementById('stack-overflow-button').onclick = doSwitchOnStack
document.getElementById('github-button').onclick = doSwitchOnGitHub

//aruments, what to update, value
//saved using chrome extenion API
function updateData(uType, uValue){
  /*Grab Value. Update the needed header, set the values again
  */
  let tempOptions = {};
  storage.get('options', function(items) {
    if (items.options) {
      // textarea.value = items.css;
      // alert("Loaded saved options: ");
      //store options object
      tempOptions = items.options;

      //update value
      tempOptions.userOptions[uType] = uValue;

      //set value
      storage.set({'options': tempOptions}, function() {
        // Notify that we saved.
        // alert("Settings saved with updates: "+uType+" to "+uValue);
      });
    }
    else{
      let anObject = {
      userOptions: {
        stackOverflow: false,
        GitHub: false
      }
    }
  }
    //set value
    storage.set({'options': anObject}, function() {
      // Notify that we saved.
      // alert("Settings saved");
    });

  });
}

function changeUI(){
  storage.get('options', function(items) {
    if (items.options) {

      if(items.options.userOptions.stackOverflow) {
              document.getElementById('stack-overflow-button').className="on";
              ocument.getElementById(button_id).innerHTML = 'Lock';
      } else {
                document.getElementById('stack-overflow-button').className="off";
      }

      if(items.options.userOptions.GitHub) {
              document.getElementById('github-button').className="on";
      } else {
                document.getElementById('github-button').className="off";
      }
    }
  });
}
