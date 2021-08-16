import $ from 'jquery';

export default function () {
    $('body').find('.banners').find('img[alt="Desktop"],img[alt="desktop"]').closest('p').addClass('desktop-only');
    $('body').find('.banners').find('img[alt="Mobile"], img[alt="mobile"]').closest('p').addClass('mobile-only');
}
