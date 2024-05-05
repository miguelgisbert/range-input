"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
var react_1 = __importStar(require("react"));
var Range = function (_a) {
    var min = _a.min, max = _a.max, selectableValues = _a.selectableValues;
    var _b = (0, react_1.useState)({ min: min, max: max }), range = _b[0], setRange = _b[1];
    var _c = (0, react_1.useState)(null), selectable = _c[0], setSelectable = _c[1];
    var _d = (0, react_1.useState)(null), dragging = _d[0], setDragging = _d[1];
    var rangeRef = (0, react_1.useRef)(null);
    var _e = (0, react_1.useState)(null), hover = _e[0], setHover = _e[1];
    var _f = (0, react_1.useState)(false), editingMin = _f[0], setEditingMin = _f[1];
    var _g = (0, react_1.useState)(false), editingMax = _g[0], setEditingMax = _g[1];
    var _h = (0, react_1.useState)(min), minValue = _h[0], setMinValue = _h[1];
    var _j = (0, react_1.useState)(max), maxValue = _j[0], setMaxValue = _j[1];
    var _k = (0, react_1.useState)(min), inputMinValue = _k[0], setInputMinValue = _k[1];
    var _l = (0, react_1.useState)(max), inputMaxValue = _l[0], setInputMaxValue = _l[1];
    var getPercentage = (0, react_1.useCallback)(function (value) { return Math.round(((value - minValue) / (maxValue - minValue)) * 100); }, [minValue, maxValue]);
    var getValue = (0, react_1.useCallback)(function (percentage) { return ((maxValue - minValue) / 100) * percentage + minValue; }, [minValue, maxValue]);
    // Set selectable values if they are received at props and they are within the min and max range
    (0, react_1.useEffect)(function () {
        if (selectableValues && selectableValues.every(function (value) { return value >= min && value <= max; })) {
            setSelectable(selectableValues);
        }
        else {
            setSelectable(null);
        }
    }, [min, max, selectableValues]);
    var change = (0, react_1.useCallback)(function (clientX, type) {
        if (!rangeRef.current)
            return;
        var rect = rangeRef.current.getBoundingClientRect();
        var x = clientX - rect.left; // x position within the element
        var width = rect.right - rect.left;
        var percentage = (x / width) * 100;
        var value = getValue(percentage);
        // If selectable values are provided, find the closest selectable value
        if (selectable) {
            value = selectable.reduce(function (prev, curr) {
                return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
            });
        }
        // Limit the value to the min and max
        value = Math.max(minValue, Math.min(maxValue, value));
        setRange(function (prev) {
            return type === 'min'
                ? __assign(__assign({}, prev), { min: Math.min(value, prev.max) }) : __assign(__assign({}, prev), { max: Math.max(value, prev.min) });
        });
    }, [getValue, min, max, selectable]);
    var handleMouseMove = (0, react_1.useCallback)(function (e) {
        if (dragging) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; // x position within the element
            var width = rect.right - rect.left; // width of the element
            var percentage = x / width; // percentage of x position within the element
            var newValue_1 = min + (max - min) * percentage; // value corresponding to the percentage
            if (selectable) {
                // Find the closest selectable value to the new value
                newValue_1 = selectable.reduce(function (prev, curr) {
                    return Math.abs(curr - newValue_1) < Math.abs(prev - newValue_1) ? curr : prev;
                });
            }
            change(e.clientX, dragging);
        }
    }, [dragging, change]);
    var handleMouseMoveDocument = (0, react_1.useCallback)(function (e) {
        if (dragging) {
            change(e.clientX, dragging);
        }
    }, [dragging, change]);
    var handleMouseUp = (0, react_1.useCallback)(function () {
        setDragging(null);
    }, []);
    (0, react_1.useEffect)(function () {
        document.addEventListener('mousemove', handleMouseMoveDocument);
        document.addEventListener('mouseup', handleMouseUp);
        return function () {
            document.removeEventListener('mousemove', handleMouseMoveDocument);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMoveDocument, handleMouseUp]);
    var handleMinValueChange = function () {
        if (!isNaN(inputMinValue) && inputMinValue < maxValue) {
            setMinValue(Number(inputMinValue));
            setEditingMin(false);
            setRange(function (prevRange) { return (__assign(__assign({}, prevRange), { min: inputMinValue > prevRange.min ? inputMinValue : prevRange.min, max: inputMinValue > prevRange.max ? inputMinValue : prevRange.max })); });
        }
    };
    var handleMaxValueChange = function () {
        if (!isNaN(inputMaxValue) && inputMaxValue > minValue) {
            setMaxValue(Number(inputMaxValue));
            setEditingMax(false);
            setRange(function (prevRange) { return (__assign(__assign({}, prevRange), { min: inputMaxValue < prevRange.min ? inputMaxValue : prevRange.min, max: inputMaxValue < prevRange.max ? inputMaxValue : prevRange.max })); });
        }
    };
    // Avoid numbers overlapping
    var _m = (0, react_1.useState)(false), overlap = _m[0], setOverlap = _m[1];
    (0, react_1.useEffect)(function () {
        var threshold = (maxValue - minValue) * 0.15;
        if (Math.abs(range.min - range.max) < threshold) {
            setOverlap(true);
        }
        else {
            setOverlap(false);
        }
    }, [range]);
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            alignContent: "center",
            height: "100px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'default'
        } },
        editingMin && !selectable ? (react_1.default.createElement("input", { type: "number", value: inputMinValue, style: { marginRight: "20px", width: "auto" }, onChange: function (e) { return setInputMinValue(Number(e.target.value)); }, onBlur: handleMinValueChange, onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleMinValueChange();
                }
            } })) : (react_1.default.createElement("div", { onClick: function () { return setEditingMin(true); }, style: {
                width: "auto",
                padding: "10px 20px",
                fontSize: "12px",
                cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : selectable ? 'default' : 'pointer'
            } },
            minValue !== undefined ? minValue.toFixed(2) : "NaN",
            " \u20AC")),
        react_1.default.createElement("div", { ref: rangeRef, style: {
                height: '10px',
                width: '300px',
                background: 'lightgray',
                borderRadius: '5px',
                position: 'relative',
                userSelect: 'none',
                cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'default'
            }, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp },
            selectable && selectable.map(function (value, index) { return (react_1.default.createElement("div", { key: index, style: {
                    position: 'absolute',
                    height: '20px',
                    width: '2px',
                    top: '-5px',
                    background: value >= range.min && value <= range.max ? 'dodgerblue' : 'lightgray',
                    left: "".concat(getPercentage(value), "%")
                } })); }),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    background: 'dodgerblue',
                    boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.8)',
                    height: '100%',
                    cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'default',
                    left: "".concat(getPercentage(range.min), "%"),
                    right: "".concat(100 - getPercentage(range.max), "%"),
                } }),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: hover === 'min' || dragging === 'min' ? '-6px' : '-4px',
                    width: hover === 'min' || dragging === 'min' ? '22px' : '18px',
                    height: hover === 'min' || dragging === 'min' ? '22px' : '18px',
                    background: 'white',
                    borderRadius: '50%',
                    cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'pointer',
                    boxShadow: '0px 0px 8px 4px rgba(0, 0, 0, 0.8)',
                    left: "".concat(getPercentage(range.min), "%"),
                    marginLeft: '-10px',
                    zIndex: maxValue - range.min < (maxValue - minValue) * 0.1 ? 10 : 0,
                    transition: 'width 0.2s, height 0.2s, top 0.2s',
                }, onMouseDown: function (e) {
                    e.preventDefault();
                    setDragging('min');
                }, onMouseEnter: function () { return setHover('min'); }, onMouseLeave: function () { return setHover(null); } }),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: hover === 'max' || dragging === 'max' ? '-6px' : '-4px',
                    width: hover === 'max' || dragging === 'max' ? '22px' : '18px',
                    height: hover === 'max' || dragging === 'max' ? '22px' : '18px',
                    background: 'white',
                    borderRadius: '50%',
                    cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'pointer',
                    boxShadow: '0px 0px 8px 4px rgba(0, 0, 0, 0.8)',
                    left: "".concat(getPercentage(range.max), "%"),
                    marginLeft: '-10px',
                    zIndex: range.min - minValue < (maxValue - minValue) * 0.1 ? 10 : 0,
                    transition: 'width 0.2s, height 0.2s, top 0.2s',
                }, onMouseDown: function (e) {
                    e.preventDefault();
                    setDragging('max');
                }, onMouseEnter: function () { return setHover('max'); }, onMouseLeave: function () { return setHover(null); } }),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    left: "".concat(getPercentage(range.min) - 3, "%"),
                    top: overlap ? '-30px' : '30px',
                    fontSize: "12px",
                    whiteSpace: 'nowrap',
                    cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'default'
                } },
                range.min !== undefined ? range.min.toFixed(2) : "NaN",
                " \u20AC"),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    left: "".concat(getPercentage(range.max) - 3, "%"),
                    top: '30px',
                    fontSize: "12px",
                    whiteSpace: 'nowrap',
                    cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : 'default'
                } },
                range.max !== undefined ? range.max.toFixed(2) : "NaN",
                " \u20AC")),
        editingMax && !selectable ? (react_1.default.createElement("input", { type: "number", value: inputMaxValue, style: { marginLeft: "20px", width: "auto" }, onChange: function (e) { return setInputMaxValue(Number(e.target.value)); }, onBlur: handleMaxValueChange, onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleMaxValueChange();
                }
            } })) : (react_1.default.createElement("div", { onClick: function () { return setEditingMax(true); }, style: {
                width: "auto",
                margin: "0 20px",
                fontSize: "12px",
                zIndex: 100,
                cursor: dragging === 'min' || dragging === 'max' ? 'col-resize' : selectable ? 'default' : 'pointer'
            } },
            maxValue !== undefined ? maxValue.toFixed(2) : "NaN",
            " \u20AC"))));
};
exports.Range = Range;
//# sourceMappingURL=range.js.map