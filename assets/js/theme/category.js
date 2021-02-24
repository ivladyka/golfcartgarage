import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
import athleticLoaded from './athletic/category';
import yswFA from './make_model_year_filter';

yswFA.settings.page_type = 'category';
yswFA.go();

export default class Category extends CatalogPage {
    onReady() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        athleticLoaded();
        $("div.SubCategoryList").click(function (e) {
            if (e.target == this)
            {
                if ($(this).hasClass("show-categories")) {
                    $(this).find("ul").hide();
                    $(this).removeClass("show-categories");
                }
                else {
                    $(this).find("ul").show();
                    $(this).addClass("show-categories");
                }
            }
        });
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }
}
