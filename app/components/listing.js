import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ListingComponent extends Component {
  @tracked model = this.args.model;

  testModel() {
    console.log(model);
  }
}
