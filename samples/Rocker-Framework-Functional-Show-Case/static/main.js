"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var menuTop_module_1 = require("./ng/menuTop/menuTop.module.js");
var menuLeft_module_1 = require("./ng/menuLeft/menuLeft.module.js");
var concepts_module_1 = require("./ng/concepts/concepts.module.js");
var components_module_1 = require("./ng/components/components.module.js");
var sourcecode_module_1 = require("./ng/sourcecode/sourcecode.module.js");
var about_module_1 = require("./ng/about/about.module.js");
var downloads_module_1 = require("./ng/downloads/downloads.module.js");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(menuTop_module_1.MenuTopModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(menuLeft_module_1.MenuLeftModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(concepts_module_1.ConceptsModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(components_module_1.ComponentsModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(sourcecode_module_1.SourcecodeModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(about_module_1.AboutModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(downloads_module_1.DownloadsModule);
//# sourceMappingURL=main.js.map