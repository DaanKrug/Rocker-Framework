"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var menuTop_component_1 = require("./menuTop.component.js");
var MenuTopModule = (function () {
    function MenuTopModule() {
    }
    return MenuTopModule;
}());
MenuTopModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [menuTop_component_1.MenuTopComponent],
        bootstrap: [menuTop_component_1.MenuTopComponent]
    })
], MenuTopModule);
exports.MenuTopModule = MenuTopModule;
//# sourceMappingURL=menuTop.module.js.map