import PageManager from './page-manager';
import yswFA from './make_model_year_filter';

yswFA.settings.page_type = 'home';
yswFA.go();

export default class Home extends PageManager {}
