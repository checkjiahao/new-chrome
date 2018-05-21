var editEnabled = false;

function onLoad() {
	try{
	    chrome.tabs.getSelected(null,function(tab){
    		var bRes = chrome.extension.getBackgroundPage().websiteLogonBG.isProfileExist(tab.url);
    		console.log('<onLoad> bRes: '+ bRes);
    		if (bRes) {
    			document.getElementById("menuEdit").style.color="#000";
    			editEnabled = true;
    		} else {
    			document.getElementById("menuEdit").style.color="#aaa";
    		}
		});
	}catch(e){
		console.error("<onLoad> Exception:"+e);
	}
}

function editWebCard() {
	try{
		console.log("<editWebCard> menu entering...");
		if (editEnabled) {
			chrome.extension.getBackgroundPage().websiteLogonBG.editWebCard();
			window.close();
		}
	}catch(e){
		console.error("<editWebCard> Exception:"+e);
	}
}

function openApp() {
	try{
		console.log("<openApp> menu entering...");
		chrome.extension.getBackgroundPage().websiteLogonBG.openApp();
		window.close();
	}catch(e){
		console.error("<editWebCard> Exception:"+e);
	}
}

function navigateToSupport() {
	chrome.tabs.create({url: 'http://support.authentec.com/'});
}

function navigateToStore() {
	chrome.tabs.create({url: 'http://store.authentec.com/'});
}

function initMultiLanguage() {
    try {
        document.getElementById("menuEdit").innerHTML = chrome.i18n.getMessage("editText");
        document.getElementById("menuReport").innerHTML = chrome.i18n.getMessage("reportText");
        document.getElementById("menuRunApp").innerHTML = chrome.i18n.getMessage("runAppText");
        document.getElementById("menuStore").innerHTML = chrome.i18n.getMessage("storeText");
    }catch(e){
		console.error("<initMultiLanguage> Exception:"+e);
	}
}