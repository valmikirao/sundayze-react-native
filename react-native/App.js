"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var stream_for_client_1 = __importDefault(require("./lib/stream-for-client"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        var _this = this;
        var onPress = function () {
            var note = _this.state.note;
            stream_for_client_1.default.shareToronto({ note: note });
        };
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, null, "Write something to post"),
            react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, padding: 10 }, placeholder: "note", onChangeText: function (note) { return _this.setState({ note: note }); } }),
            react_1.default.createElement(react_native_1.Button, { onPress: onPress, title: "Share!" })));
    };
    return App;
}(react_1.default.Component));
exports.default = App;
exports.default = ;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
react_native_1.AppRegistry.registerComponent('AwesomeProject', function () { return App; });
