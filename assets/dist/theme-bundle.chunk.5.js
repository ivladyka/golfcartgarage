(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
    if (typeof cert !== 'string') {
        return false;
    }

    // Add any custom gift certificate validation logic here
    return true;
});

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
    email: function email(value) {
        var re = /^.+@.+\..+/;
        return re.test(value);
    },


    /**
     * Validates a password field
     * @param value
     * @returns {boolean}
     */
    password: function password(value) {
        return this.notEmpty(value);
    },


    /**
     * validates if a field is empty
     * @param value
     * @returns {boolean}
     *
     */
    notEmpty: function notEmpty(value) {
        return value.length > 0;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var GiftCertificate = function (_PageManager) {
    _inherits(GiftCertificate, _PageManager);

    function GiftCertificate(context) {
        _classCallCheck(this, GiftCertificate);

        var _this = _possibleConstructorReturn(this, _PageManager.call(this, context));

        var $certBalanceForm = jquery__WEBPACK_IMPORTED_MODULE_1___default()('#gift-certificate-balance');

        var purchaseModel = {
            recipientName: function recipientName(val) {
                return val.length;
            },
            recipientEmail: function recipientEmail() {
                return _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"], arguments);
            },
            senderName: function senderName(val) {
                return val.length;
            },
            senderEmail: function senderEmail() {
                return _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"], arguments);
            },
            customAmount: function customAmount(value, min, max) {
                return value && value >= min && value <= max;
            },
            setAmount: function setAmount(value, options) {
                var found = false;

                options.forEach(function (option) {
                    if (option === value) {
                        found = true;
                        return false;
                    }
                });

                return found;
            }
        };

        var $purchaseForm = jquery__WEBPACK_IMPORTED_MODULE_1___default()('#gift-certificate-form');
        var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
        var purchaseValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
            submit: '#gift-certificate-form input[type="submit"]',
            delay: 300
        });

        if ($customAmounts.length) {
            var $element = $purchaseForm.find('input[name="certificate_amount"]');
            var min = $element.data('min');
            var minFormatted = $element.data('minFormatted');
            var max = $element.data('max');
            var maxFormatted = $element.data('maxFormatted');

            purchaseValidator.add({
                selector: '#gift-certificate-form input[name="certificate_amount"]',
                validate: function validate(cb, val) {
                    var numberVal = Number(val);

                    if (!numberVal) {
                        cb(false);
                    }

                    cb(numberVal >= min && numberVal <= max);
                },
                errorMessage: 'You must enter a certificate amount between ' + minFormatted + ' and ' + maxFormatted + '.'
            });
        }

        purchaseValidator.add([{
            selector: '#gift-certificate-form input[name="to_name"]',
            validate: function validate(cb, val) {
                var result = purchaseModel.recipientName(val);

                cb(result);
            },
            errorMessage: _this.context.toName
        }, {
            selector: '#gift-certificate-form input[name="to_email"]',
            validate: function validate(cb, val) {
                var result = purchaseModel.recipientEmail(val);

                cb(result);
            },
            errorMessage: _this.context.toEmail
        }, {
            selector: '#gift-certificate-form input[name="from_name"]',
            validate: function validate(cb, val) {
                var result = purchaseModel.senderName(val);

                cb(result);
            },
            errorMessage: _this.context.fromName
        }, {
            selector: '#gift-certificate-form input[name="from_email"]',
            validate: function validate(cb, val) {
                var result = purchaseModel.senderEmail(val);

                cb(result);
            },
            errorMessage: _this.context.fromEmail
        }, {
            selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
            triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
            validate: function validate(cb) {
                var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();

                cb(typeof val === 'string');
            },
            errorMessage: _this.context.certTheme
        }, {
            selector: '#gift-certificate-form input[name="agree"]',
            validate: function validate(cb) {
                var val = $purchaseForm.find('input[name="agree"]').get(0).checked;

                cb(val);
            },
            errorMessage: _this.context.agreeToTerms
        }, {
            selector: '#gift-certificate-form input[name="agree2"]',
            validate: function validate(cb) {
                var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;

                cb(val);
            },
            errorMessage: _this.context.agreeToTerms
        }]);

        if ($certBalanceForm.length) {
            var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

            $certBalanceForm.on('submit', function () {
                balanceVal.performCheck();

                if (!balanceVal.areAll('valid')) {
                    return false;
                }
            });
        }

        $purchaseForm.on('submit', function (event) {
            purchaseValidator.performCheck();

            if (!purchaseValidator.areAll('valid')) {
                return event.preventDefault();
            }
        });

        jquery__WEBPACK_IMPORTED_MODULE_1___default()('#gift-certificate-preview').click(function (event) {
            event.preventDefault();

            purchaseValidator.performCheck();

            if (!purchaseValidator.areAll('valid')) {
                return;
            }

            var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
            var previewUrl = jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data('previewUrl') + '&' + $purchaseForm.serialize();

            modal.open();

            _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["api"].getPage(previewUrl, {}, function (err, content) {
                if (err) {
                    return modal.updateContent(_this.context.previewError);
                }

                modal.updateContent(content, { wrap: true });
            });
        });
        return _this;
    }

    GiftCertificate.prototype.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
        var balanceValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
            submit: $balanceForm.find('input[type="submit"]')
        });

        balanceValidator.add({
            selector: $balanceForm.find('input[name="giftcertificatecode"]'),
            validate: function validate(cb, val) {
                cb(Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(val));
            },

            errorMessage: 'You must enter a certificate code.'
        });

        return balanceValidator;
    };

    return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GiftCertificate);

/***/ })

}]);
//# sourceMappingURL=theme-bundle.chunk.5.js.map
