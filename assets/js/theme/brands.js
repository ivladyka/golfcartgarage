import PageManager from './page-manager';
import yswFA from './make_model_year_filter';
yswFA.settings.page_type = 'brands';

export default class Brands extends PageManager {
    onReady() {
		yswFA.go();
    }

}
