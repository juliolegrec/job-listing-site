import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
  @tracked listings = this.args.model;

  @tracked filters = {
    role: '',
    level: '',
    language: '',
    tool: '',
  };

  get filterListings() {
    const filteredListings = this.listings;

    if (this.role) {
      return filteredListings.filter((listing) => listing.role === this.role);
    } else {
      return filteredListings;
    }
  }

  @action
  changeFilter(event) {
    let filterType = event.srcElement.dataset.type;
    let filterParam = event.srcElement.innerText;

    this.filters[filterType] = filterParam;
    console.log(this.filters);
  }

  @action
  clearFilter() {
    this.role = '';
  }
}
