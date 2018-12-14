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
        <label class="button-primary filter-button" :for="`chart-filter-` + index" :key="'label-' + index">{{filter.name}}</label>
      </template>
      <input type="radio" 
      name="active-filter" 
      id="no-filter" 
      @change="emitActiveFilter(defaultFilterFunc)"
      :checked="!this.defaultFilter.name"
      />
      <label class="button-primary filter-button" for="no-filter">{{unfilteredInputName}}</label>
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
@import '@/styles/buttons.scss';
@import '@/config/colors.scss';

.filters {
  padding: 0;
  display: flex;
  border-radius: .25em;
  overflow: hidden;
  box-sizing: border-box;
  background-color: $main;

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked+label{
    background-color: $success;
  }
}

.filter-button {
  border-radius: 0 !important;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: $light-shades;
  border-width: 0px 1px;

  &:first-child {
    border-width: 0 1px 0 0
  }

  &:last-child {
    border-width: 0 0 0 1px;
  }
}
</style>
