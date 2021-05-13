import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'react-credit-cards/es/styles-compiled.css';

const currentYear = new Date().getFullYear();
const yearsArr = Array.from({ length: 10 }, (_x, i) => currentYear + i);
var brand = 'visa';
function InputForm() {

    const [inputCardNum, setInputCardNum] = useState('');
    const [inputCardName, setInputCardName] = useState('');
    const [inputMonth, setInputMonth] = useState('');
    const [inputYear, setInputYear] = useState('');
    const [inputCvv, setInputCvv] = useState('');

    const OnchageCardNumber = (event) => {
        let { value } = event.target;
        value = value.replace(/[^0-9]+/g, '');
        event.target.value = value;
        let cardNumber = value;

        cardNumber = cc_format(value);
        brand = checkBrand(cardNumber);
        setInputCardNum(cardNumber);
    };

    const showNumberOnCard = (inputCardNum) => {
        let cardArr = inputCardNum.split("");
        return cardArr;
    };

    const OnchageCardName = (event) => {
        let { value} = event.target;
        value = value.replace(/[^A-Za-z\s]/ig, '');
        event.target.value = value;
        let cardName = value;
        setInputCardName(cardName);
    };

    const OnchageCardMonth = (event) => {
        let { value} = event.target;
        let month = value;

        setInputMonth(month);
    };

    const OnchageCardYear = (event) => {
        let { value} = event.target;
        let year = value;

        setInputYear(year);
    };

    const OnchageCvvNumber = (event) => {
        let { value} = event.target;
        value = value.replace(/[^0-9]+/g, '');
        event.target.value = value;
        let cvvNumber = value;

        cvvNumber = cc_format(value);
        setInputCvv(cvvNumber);
    };

    const showCvvOnCard = (inputCvv) => {
        let cardArr = inputCvv.split("");
        return cardArr;
    };

    function cc_format(value) {

        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        var matches = v.match(/\d{4,16}/g);
        var match = (matches && matches[0]) || '';
        var parts = [];

        for (var i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    }

    function checkBrand(cardNumber) {
        let number = cardNumber;
        if (number) {
            let re = new RegExp("^4");
            if (number.match(re) != null) return "visa";

            re = new RegExp("^(34|37)");
            if (number.match(re) != null) return "amex";

            re = new RegExp("^5[1-5]");
            if (number.match(re) != null) return "mastercard";

            re = new RegExp("^6011");
            if (number.match(re) != null) return "discover";

            re = new RegExp('^9792');
            if (number.match(re) != null) return 'troy';
            return "visa";
        } else {
            return "visa"; // default type
        }
    }

    return (

        <div className="Input__containerBG">

            <div className="Input__containerForm">
                <label className="Input__header">Card Number</label>
                <input type="text"
                    className="form-control cc-number"
                    id="cardNumber"
                    onChange={OnchageCardNumber}
                    pattern="[\d]{9}"
                    maxLength="16"
                />

                <label className="Input__header">Card Name</label>
                <input type="text"
                    className="form-control"
                    id="cardName"
                    maxLength="22"
                    onChange={OnchageCardName}
                />

                <div className="Input__header">
                    <div className="form-group row">
                        <div className="col-sm-4">
                            <label className="Input__header">Expiration Date</label>
                            <select className="form-select" value={inputMonth} onChange={OnchageCardMonth}>
                                <option value="MM">Month</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">12</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-select Input__select" value={inputYear} onChange={OnchageCardYear}>
                                <option value="YYYY">Year</option>
                                {yearsArr.map((val, index) => (
                                    <option key={index} value={val}>{val}</option>
                                ))}

                            </select>
                        </div>

                        <div className="col-sm-4">
                            <label className="Input__header">CVV</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardCvv"
                                onChange={OnchageCvvNumber}
                                maxLength="4"

                            />
                            <div>
                                <label >
                                    <div className="reversible">
                                        <div className="card tile-back">
                                            <div className="card-body">
                                                <div className="card__band"></div>
                                                <div className="card__logo card__backCvv">CVV</div>
                                                <div className="cvvBg"></div>
                                                <div className="cvvNum__position">
                                                    <TransitionGroup component="div">
                                                        {inputCvv ? (
                                                            showCvvOnCard(inputCvv).map((val, index) => (
                                                                <CSSTransition timeout={250} key={index}>

                                                                    <div className="card__CvvNumber">{val}</div>
                                                                </CSSTransition>
                                                            ))
                                                        ) : (
                                                            <CSSTransition timeout={250}>
                                                                <div className="card__CvvNumber"></div>
                                                            </CSSTransition>
                                                        )}
                                                    </TransitionGroup>
                                                </div>
                                                <img alt='card' src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${brand}.png`}
                                                    className="card__logoBack"
                                                />
                                            </div>
                                        </div>
                                        <div className="card tile-front">
                                            <div className="card-body">
                                                <div className="form-group row">
                                                    <div className="col-sm-8">
                                                        <img alt='chip'  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                                            className="card__chip" />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <img  alt='logo'  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${brand}.png`}
                                                            className="card__logo"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="card__field">
                                                    <TransitionGroup component="div">
                                                        {inputCardNum ? (
                                                            showNumberOnCard(inputCardNum).map((val, index) => (
                                                                <CSSTransition timeout={250} key={index}>
                                                                    <div className="card-item__numberItem">{val}</div>
                                                                </CSSTransition>
                                                            ))
                                                        ) : (
                                                            <CSSTransition timeout={250}>
                                                                <div className="card-item__numberItem"></div>
                                                            </CSSTransition>
                                                        )}
                                                    </TransitionGroup>

                                                </div>

                                                <div className="form-group row ">
                                                    <div className="col-sm-8">
                                                        <div className="card__logo card__bottom">Card Holder</div>
                                                        <TransitionGroup component="div">
                                                            {inputCardName ? (
                                                                <CSSTransition
                                                                    timeout={250}
                                                                >
                                                                    <div className="card-item__nameItem">{inputCardName}</div>
                                                                </CSSTransition>
                                                            ) : (
                                                                <CSSTransition timeout={250}>
                                                                    <div className="card-item__name">FULL NAME</div>
                                                                </CSSTransition>
                                                            )}
                                                        </TransitionGroup>

                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="card__logo card__bottom-expires">Expires</div>
                                                        <div className="form-group row">
                                                            <div className="col">
                                                                <div id="bloc1" className="card-item__name">
                                                                    <span>{!inputMonth ? "MM" : inputMonth}</span>
                                                                </div>
                                                                <div id="bloc2" className="card-item__name">/</div>
                                                                <div id="bloc3" className="card-item__name">
                                                                    <span>{!inputYear ? "YY" : inputYear.substring(2, 4)}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>
                <input className="Input__submit" type="submit" />
            </div>

        </div>


    );
}

export default InputForm;