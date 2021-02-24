/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import modalFit from './product/modal-fit';
import { classifyForm } from './common/form-utils';
import athleticLoaded from './athletic/product';
import stickyATC from './ysw/stickyATC.js';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });
        athleticLoaded();

        this.productReviewHandler();

        new modalFit(this.context);
        stickyATC();
        this.priceMatchPopUp();
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    priceMatchPopUp() {
        if ($("h1.productView-title").length > 0) {
            $("h1.productView-title").mouseup(function () {
                var highlightedText = "";
                if (window.getSelection) {
                    highlightedText = window.getSelection().toString();
                }
                else if (document.selection && document.selection.type != "Control") {
                    highlightedText = document.selection.createRange().text;
                }
                if (highlightedText != "") {
                    $("div.price-match-pop-up-sku").hide();
                    $("div.price-match-pop-up").show();
                }
            });
            $("dd.productView-info-value").mouseup(function () {
                var highlightedText = "";
                if (window.getSelection) {
                    highlightedText = window.getSelection().toString();
                }
                else if (document.selection && document.selection.type != "Control") {
                    highlightedText = document.selection.createRange().text;
                }
                if (highlightedText != "") {
                    $("div.price-match-pop-up").hide();
                    $("div.price-match-pop-up-sku").show();
                }
            });
            $("body").click(function () {
                $("div.price-match-pop-up").hide();
                $("div.price-match-pop-up-sku").hide();
            });
            $("div.price-match-pop-up").click(function (e) {
                e.stopPropagation();
            });
            $("div.price-match-pop-up-sku").click(function (e) {
                e.stopPropagation();
            });
            $("h1.productView-title").click(function (e) {
                e.stopPropagation();
            });
            $("dd.productView-info-value").click(function (e) {
                e.stopPropagation();
            });
        }
    }
}
