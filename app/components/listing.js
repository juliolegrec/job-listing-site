import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
  @tracked isFiltered = false;
  @tracked listings = this.args.model;
  @tracked filters = {
    role: '',
    level: '',
    language: [],
    tool: [],
  };
  @tracked filterTags = [];

  get filteredListings() {
    if (this.isFiltered) {
      return this.listings
        .filter((listing) => {
          if (this.filters.role === '') {
            return true;
          }
          return listing.role === this.filters.role;
        })
        .filter((listing) => {
          if (this.filters.level === '') {
            return true;
          }
          return listing.level === this.filters.level;
        })
        .filter((listing) => {
          if (this.filters.language.length === 0) {
            return true;
          }
          return listing.languages.some((item) => {
            for (const value of this.filters.language) {
              return item === value;
            }
          });
        })
        .filter((listing) => {
          if (this.filters.tool.length === 0) {
            return true;
          }
          return listing.tools.some((item) => {
            for (const value of this.filters.tool) {
              return item === value;
            }
          });
        });
    } else {
      return this.listings;
    }
  }

  @action
  changeFilter(event) {
    this.isFiltered = true;

    let filterType = event.srcElement.dataset.type;
    let filterValue = event.srcElement.innerText;

    if (filterType === 'language' || filterType === 'tool') {
      if (this.filters[filterType].find((el) => el === filterValue)) {
        return;
      } else {
        this.filters[filterType].push(filterValue);
      }
    } else {
      this.filters[filterType] = filterValue;
    }

    this.filterTags = [...this.filterTags, filterValue];
  }

  @action
  removeTag(index) {
    this.filterTags.splice(index, 1);
    if (this.filterTags.length === 0) {
      this.clearFilter();
    }
    this.filterTags = this.filterTags;
  }

  @action
  clearFilter() {
    this.isFiltered = false;
    this.filters = {
      role: '',
      level: '',
      language: [],
      tool: [],
    };
    this.filterTags = [];
  }
}
