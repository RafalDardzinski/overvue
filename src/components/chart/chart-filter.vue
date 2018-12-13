<template>
  <div class="chart-filter">
    <form class="filters">
      <template v-for="(filter, index) in filters">
        <input type="radio" 
        name="active-filter" 
        :id="`chart-filter-` + index" 
        :key="'input-' + index"
        @change="emitActiveFilter(filter.function)"
        :checked="!!filter.default"
        />
        <label class="button filter-button" :for="`chart-filter-` + index" :key="'label-' + index">{{filter.name}}</label>
      </template>
      <input type="radio" 
      name="active-filter" 
      id="no-filter" 
      @change="emitActiveFilter(defaultFilterFunc)"
      :checked="!this.defaultFilter.name"
      />
      <label class="button filter-button" for="no-filter">{{unfilteredInputName}}</label>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    filters: {
      type: Array,
      default: () => [],
      validator: filtersArr => {
        return filtersArr.every(filter => filter.name && filter.function && typeof filter.function === 'function')
      }
    },
    unfilteredInputName: {
      type: String,
      default: 'All'
    }
  },
  computed: {
    defaultFilter() {
      return this.filters.find(f => f.default) || { function: this.defaultFilterFunc }
    }
  },
  methods: {
    emitActiveFilter(filterFunction) {
      this.$emit('filter:activated', filterFunction);
    },
    defaultFilterFunc(data) {
      return data;
    }
  },
  created() {
    this.emitActiveFilter(this.defaultFilter.function)
  },
}
</script>
<style lang="scss" scoped>
@import '@/config/colors.scss';
@import '@/config/font.scss';


.filters {
  padding: 0;
  display: flex;
  border-radius: .25em;
  overflow: hidden;
  border: 1px solid $primary;
  box-sizing: border-box;

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked+label{
    background-color: $primary;
    color: $light-shades;
  }
}

.filter-button {
  border-width: 0 1px;
  border-color: $primary;
  flex: 1;
  color: rgba($primary, .8);

  &:first-child {
    border-left: 0;
  }

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background-color: rgba($primary, .2)
  }
}
</style>
