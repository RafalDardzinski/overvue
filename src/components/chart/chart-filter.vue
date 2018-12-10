<template>
  <div class="chart-filter">
    <form action="">
      <template v-for="(filter, index) in filters">
        <input type="radio" 
        name="active-filter" 
        :id="`chart-filter-` + index" 
        :key="'input-' + index"
        @change="emitActiveFilter(filter.function)"
        :checked="!!filter.default"
        />
        <label :for="`chart-filter-` + index" :key="'label-' + index">{{filter.name}}</label>
      </template>
      <input type="radio" 
      name="active-filter" 
      id="no-filter" 
      @change="emitActiveFilter(defaultFilterFunc)"
      :checked="!this.defaultFilter.name"
      />
      <label for="no-filter">{{unfilteredInputName}}</label>
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

form {
  input[type="radio"] {
    display: none;
  }

  label {
    font-size: $font-size-button + px;
    padding: .8em;
    display: inline-block;
    cursor: pointer;
    background-color: $default;
    color: $light-shades;
    box-sizing: border-box;
    border-left: 1px solid $light-shades;
    transition: background .2s;

    &:hover {
      background-color: rgba($default, .8)
    }
  }

  input[type="radio"]:checked+label{
    background-color: $primary;
  }
}
</style>
