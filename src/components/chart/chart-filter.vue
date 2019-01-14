<template>
  <div class="chart-filter">
    <button
    :class="['button-link', 'context-menu-toggler', 
    { active: contextMenuVisible }]" 
    v-show="compact" 
    @click="contextMenuVisible = !contextMenuVisible">
      <font-awesome-icon icon="filter"></font-awesome-icon>
    </button>
    <form
    v-show="!compact || contextMenuVisible" 
    :class="['filters', { 'context-menu': compact && contextMenuVisible }]"
    >
      <template v-for="(filter, index) in filters">
        <input type="radio" 
        name="active-filter" 
        :id="`chart-filter-` + id + '_' + index" 
        :key="'input-' + index"
        @change="handleFilterChange(filter.name, filter.function)"
        :checked="activeFilter === filter.name"
        />
        <label :class="['button-primary', 'filter-button']" :for="`chart-filter-` + id + '_' + index" :key="'label-' + index">{{filter.name}}</label>
      </template>
      <input type="radio" 
      name="active-filter" 
      :id="'no-filter_' + id" 
      @change="handleFilterChange('no-filter', defaultFilterFunc)"
      :checked="activeFilter === 'no-filter'"
      />
      <label class="button-primary filter-button" :for="'no-filter_' + id">{{unfilteredInputName}}</label>
    </form>
  </div>
</template>
<script>
import FontAwesomeIcon from '@/config/font-awesome';

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
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
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contextMenuVisible: false,
      activeFilter: '',
      id: this._uid
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
    },
    handleFilterChange(name, func) {
      this.activeFilter = name;
      this.emitActiveFilter(func);
      this.contextMenuVisible = false;
    }
  },
  created() {
    this.activeFilter = this.defaultFilter.name || 'no-filter'
    this.emitActiveFilter(this.defaultFilter.function)
  },
  mounted() {
    this.id = this._uid;
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/buttons.scss';
@import '@/config/colors.scss';

div.chart-filter {
  position: relative;
}

form.filters {
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

form.filters.context-menu {
  display: block;
  position: absolute;
  right: 0;
  top: 100%;
  min-width: 100px;
  border-radius: 0;

  label {
    border-radius: 0;
    border: none;
  }
}

.context-menu-toggler {
  &.active {
    color: $light-accent;
  }
}
</style>
