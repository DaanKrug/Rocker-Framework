"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var components_service_1 = require("./components.service.js");
var ComponentsComponent = (function () {
    function ComponentsComponent() {
        this.body = { title: '', content: '' };
    }
    ComponentsComponent.prototype.loadComponent = function () {
        this.inst = components_service_1.ComponentsService.getInstance();
        if (null != this.inst) {
            if (this.body.title != this.inst.body.title || this.body.content != this.inst.body.content) {
                this.body = this.inst.body;
            }
        }
        if (singletonRockerCommons.trim(this.body.title) != '') {
            singletonRockerCommons.show('divShowerComponentData');
        }
        else {
            singletonRockerCommons.hide('divShowerComponentData');
        }
    };
    return ComponentsComponent;
}());
ComponentsComponent = __decorate([
    core_1.Component({
        selector: 'components',
        templateUrl: "../static/ng/components/components.html"
    })
], ComponentsComponent);
exports.ComponentsComponent = ComponentsComponent;
//# sourceMappingURL=components.component.js.map