"use strict";
var ComponentsService = (function () {
    function ComponentsService() {
        this.body = { title: '', content: '' };
    }
    ComponentsService.setBody = function (i) {
        if (null == i || !(i >= 0)) {
            this.instance.body = { title: '', content: '' };
            return;
        }
        this.instance.body = {
            title: ((null != componentsData()[i][0]) ? componentsData()[i][0] : ''),
            content: ((null != componentsData()[i][1]) ? componentsData()[i][1] : '')
        };
    };
    ComponentsService.getInstance = function () {
        return this.instance;
    };
    return ComponentsService;
}());
ComponentsService.instance = new ComponentsService();
exports.ComponentsService = ComponentsService;
//# sourceMappingURL=components.service.js.map