import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
  @tracked listings = this.args.model;

  @tracked role = '';
  @tracked level;
  @tracked language;
  @tracked tool;

  get filterListings() {
    if (this.role) {
      const filteredListings = this.listings.filter((listing) => {
        return listing.role === this.role;
      });
      return filteredListings;
    } else {
      return this.listings;
    }
  }

  @action
  changeFilter(event) {
    let filterType = event.srcElement.dataset.type;
    let filterParam = event.srcElement.innerText;

    if (filterType === 'role') {
      this.role = filterParam;
    }

    console.log(this.role);

    // this.filters[filterType] = filterParam;
  }

  @action
  clearFilter() {
    this.role = '';
  }
}
