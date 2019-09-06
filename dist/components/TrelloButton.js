'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./TrelloButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrelloButton = function TrelloButton(props) {
    var buttonStyle = props.buttonStyle,
        buttonColor = props.buttonColor,
        buttonText = props.buttonText,
        authorizeMethod = props.authorizeMethod,
        buttonCustomStyles = props.buttonCustomStyles;

    var buttonClasses = [];
    styleHelpers(buttonStyle, buttonColor, buttonClasses);
    return _react2.default.createElement(
        'button',
        {
            style: buttonCustomStyles,
            className: 'trello-login-button ' + String(buttonClasses).split(',').join(' '),
            onClick: authorizeMethod },
        buttonText
    );
};

var styleHelpers = function styleHelpers(buttonStyle, buttonColor, buttonClasses) {
    switch (buttonStyle) {
        case 'metamorph':
            buttonClasses.push('style-metamorph');
            break;

        case 'flat':
            buttonClasses.push('style-flat');
            break;

        default:
            break;
    }

    switch (buttonColor) {
        case 'green':
            buttonClasses.push('color-green');
            break;

        case 'grayish-blue':
            buttonClasses.push('color-grayish-blue');
            break;

        case 'light':
            buttonClasses.push('color-light');
            break;

        default:
            break;
    }
};

TrelloButton.propTypes = {
    buttonStyle: _propTypes2.default.string,
    buttonColor: _propTypes2.default.string,
    buttonText: _propTypes2.default.string,
    authorizeMethod: _propTypes2.default.func,
    buttonCustomStyles: _propTypes2.default.object
};

exports.default = TrelloButton;