import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
  @tracked isFiltered = false;
  @tracked listings = this.args.model;
  @tracked filters = {
    role: [],
    level: [],
    language: [],
    tool: [],
  };
  @tracked filterTags = [];

  get filteredListings() {
    if (this.isFiltered) {
      // filter the listings based on filters

      return this.listings.filter((listing) => {
        for (let filter of this.filters.role) {
          return listing.role === filter;
        }
      });
    } else {
      return this.listings;
    }
  }

  changeFilter = (event) => {
    this.isFiltered = true;

    let filterType = event.srcElement.dataset.type;
    let filterValue = event.srcElement.innerText;

    if (this.filters[filterType].find((el) => el === filterValue)) {
      return;
    } else {
      this.filters[filterType].push(filterValue);
    }
  };

  get filterTags() {
    for (const [key, value] of Object.entries(this.filters)) {
      if (value.length === 0) {
        return;
      } else {
        this.filterTags.push(value);
      }
      // console.log(`
      // Key: ${key}
      // Value: ${value}
      // `);
    }

    console.log(this.filterTags);

    return this.filterTags;
  }

  clearFilter = () => {
    this.isFiltered = false;
    this.filters = {
      role: [],
      level: [],
      language: [],
      tool: [],
    };
  };
}
