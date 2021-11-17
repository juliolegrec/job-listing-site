import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  queryParams = ['language'];

  @tracked language = null;

  @tracked model;

  get filtedLanguages() {
    let language = this.language;
    let languages = this.model.languages;

    console.log(language);
    console.log(languages);
  }
}
