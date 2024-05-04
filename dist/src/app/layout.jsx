"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var google_1 = require("next/font/google");
require("./globals.css");
var inter = (0, google_1.Inter)({ subsets: ["latin"] });
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <body className={inter.className}>{children}</body>
    </html>);
}
exports.default = RootLayout;
//# sourceMappingURL=layout.jsx.map