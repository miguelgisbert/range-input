"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = __importDefault(require("./components/range"));
function Home() {
    return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "30px", alignContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
        <h3 style={{ padding: "20px" }}>Exercise 1</h3>
        <range_1.default min={5.99} max={19.99}/>
        <h3 style={{ padding: "20px" }}>Exercise 2</h3>
        <range_1.default min={5.99} max={70.99} selectableValues={[5.99, 10.99, 30.99, 50.99, 70.99]}/>
    </div>);
}
exports.default = Home;
//# sourceMappingURL=page.jsx.map