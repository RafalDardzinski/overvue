<template>
  <div class="about">
    <div>
      <overvue-chart-wrapper
      :getData="getPosts"
      :organizeData="organizeData"
      type="line"
      title="Posts per user"
      ></overvue-chart-wrapper>
    </div>
    <overvue-error-boundary>
      <overvue-chart 
      chart-type="bar"
      :loaded="dataLoaded"
      :datasets="[{label: 'First', data: [2, 5, 8]},
      {label: 'Second', data: [10, 11, 3]},
      {label: 'Third', data: [4, 5, 1]},
      {label: 'Fourth', data: [8, 15, 10]},
      {label: 'Fifth', data: [13, 11, 9]}]"
      :labels="['One', 'Two', 'Three']"
      />
      <overvue-chart 
      chart-type="line"
      :loaded="dataLoaded"
      :datasets="[{label: 'First', data: [2, 5, 8]},
      {label: 'Second', data: [10, 11, 3]},
      {label: 'Third', data: [4, 5, 1]},
      {label: 'Fourth', data: [8, 15, 10]},
      {label: 'Fifth', data: [13, 11, 9]}]"
      :labels="['One', 'Two', 'Three']"
      />
    </overvue-error-boundary>
  </div>
</template>
<script>
import OvervueChart from '@/components/chart/chart.vue';
import OvervueErrorBoundary from '@/components/error-boundary.vue';
import OvervueChartWrapper from '@/components/chart-wrapper';
import axios from 'axios';
export default {
  components: {
    'overvue-chart': OvervueChart,
    'overvue-chart-wrapper': OvervueChartWrapper,
    'overvue-error-boundary': OvervueErrorBoundary
  },
  data() {
    return {
      dataLoaded: false
    }
  },
  methods: {
    setDataLoaded() {
      this.dataLoaded = true;
    },
    getPosts() {
      return axios.get('https://jsonplaceholder.typicode.com/posts')
    },
    organizeData({data}) {
      const labels = data.reduce((uniques, current) => {
        if (!uniques.includes(current.userId))
          uniques.push(current.userId);
        return uniques;
      }, []);
      const datasets = [{
        label: 'Number of posts',
        data: labels.map(userId => data.filter(r => r.userId === userId).length)
      }]
      return {
        datasets,
        labels: labels.map(userId => `User ${userId}`)
      }
    }
  },
  mounted() {
    setTimeout(this.setDataLoaded, 2000);
  }
}
</script>
<style lang="scss" scoped>

</style>
