import React from 'react';
import PropTypes from 'prop-types';
import './TrelloButton.css';

const TrelloButton = (props) => {
    const { buttonStyle, buttonColor, buttonText, authorizeMethod, buttonCustomStyles } = props;
    const buttonClasses = [];
    styleHelpers(buttonStyle, buttonColor, buttonClasses);
    return (
        <button
            style={buttonCustomStyles}
            className={`trello-login-button ${String(buttonClasses).split(',').join(' ')}`}
            onClick={authorizeMethod}>
            {buttonText}
        </button>
    )
}

const styleHelpers = (buttonStyle, buttonColor, buttonClasses) => {
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
            buttonClasses.push('color-grayish-blue')
            break;

        case 'light':
            buttonClasses.push('color-light');
            break;

        default:
            break;
    }
}

TrelloButton.propTypes = {
    buttonStyle: PropTypes.string,
    buttonColor: PropTypes.string,
    buttonText: PropTypes.string,
    authorizeMethod: PropTypes.func,
    buttonCustomStyles: PropTypes.object
}

export default TrelloButton;