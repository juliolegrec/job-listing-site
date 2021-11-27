import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
  @tracked listings = this.args.model;

  @tracked filters = {
    role: ['Frontend', 'Fullstack', 'Backend'],
    level: ['Senior', 'Junior', 'Midweight'],
  };

  get filterListings() {
    const filteredListings = this.listings.filter((listing) => {
      // this.filters.role.forEach((el) => console.log(el));
      // console.log(listing.role);
      this.filters.role.forEach((el) => el === listing.role);
    });
    return filteredListings;
  }

  @action
  changeFilter(event) {
    let filterType = event.srcElement.dataset.type;
    let filterValue = event.srcElement.innerText;

    // if (this.filters[filterType].find((el) => el === filterValue)) {
    //   return;
    // }
    // this.filters[filterType].push(filterValue);

    this.filters[filterType] = filterValue;
    console.table(this.filters);
  }

  @action
  clearFilter() {
    this.filters = {
      role: [],
      level: [],
      language: [],
      tool: [],
    };
  }
}
