/***************************************************************************
* Configuration file manage class.
***************************************************************************/
function config_helper(config, url, doc) {
    this._config = config || null;
    this._config_item = null;
    this._doc = doc || document;
    this._fnRegister = null;

    var _self = this;

    //Initialize config item.
    if (_self._config && _self._config['WebsiteList']) {
        for (var i = 0; i < _self._config['WebsiteList'].length; ++i) {
            var item = _self._config['WebsiteList'][i];
            var reg = new RegExp(item['URL']);
            if (reg.test(url)) {
                //if (url === item['URL']) {
                _self._config_item = item;
                break;
            }
        }
    }

    this.isSpecialSite = function() {
        return _self._config_item != null;
    }

    this.getDomain = function() {
        if (!_self.isSpecialSite())
            return null;

        return _self._config_item['Domain'];
    }

    this.getIsAutoLogin = function() {
        if (!_self.isSpecialSite())
            return null;

        return _self._config_item['IsAutoLogin'];
    }

    this.getIsRefreshOnLoginFailed = function() {
        if (!_self.isSpecialSite())
            return null;

        return _self._config_item['IsRefreshOnLoginFailed'];
    }

    this.getElementByFilter = function(filter) {
        var type = filter['Type'];
        var content = filter['Content'];
        var value = content['Value'];
        var index = content['Index'];

        var elem = null;

        if (type == 'ID') {
            elem = _self._doc.getElementById(value);
        } else if (type == 'Name') {
            elem = _self._doc.getElementsByName(value)[index];
        } else if (type == 'Tag') {
            elem = _self._doc.getElementsByTagName(value)[index];
        }

        return elem;
    }

    this.getElementByTypeName = function(name) {
        var elem = null;
        var filter = null;

        if (name == 'Username') {
            filter = _self._config_item['Username'];
        } else if (name == 'Password') {
            filter = _self._config_item['Password'];
        }
        else if (name == 'Submit') {
            filter = _self._config_item['Submit'];
        }

        if (!filter)
            return null;

        return _self.getElementByFilter(filter);
    }

    this.getUserName = function() {
        var elem = _self.getElementByTypeName('Username');

        if (!elem)
            return null;

        return elem['value'];
    }

    this.getPassword = function() {
        var elem = _self.getElementByTypeName('Password');

        if (!elem)
            return null;

        return elem['value'];
    }

    this.getSubmit = function() {
        var elem = _self.getElementByTypeName('Submit');

        if (!elem)
            return null;

        return elem['value'];
    }

    function onRegister() {
        var username = _self.getUserName();
        var password = _self.getPassword();

        if (!username || !password) {
            return;
        }

        if (_self._fnRegister)
            _self._fnRegister(username, password);
    }

    this.addLogonListener = function(fnRegister) {
        if (!_self.isSpecialSite())
            return false;

        var elemLogon = _self.getElementByTypeName('Submit');
        if (!elemLogon)
            return false;
            
        elemLogon.addEventListener('click', onRegister, false);

        _self._fnRegister = fnRegister;

        return true;
    }

    this.logon = function(username, password) {
        if (!_self.isSpecialSite())
            return false;

        _self.getElementByTypeName('Username').value = username;
        _self.getElementByTypeName('Password').value = password;

        if (_self.getIsAutoLogin()) {
            var elemLogon = _self.getElementByTypeName('Submit');
            var evt = _self._doc.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elemLogon.dispatchEvent(evt);
        }
    }
}