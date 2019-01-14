<template>
  <div class="about">
    <div class="charts">
      <div>
        <overvue-chart-wrapper
        :getData="getPosts"
        :organizeData="organizeData"
        type="line"
        title="Posts per user"
        :filters="[
          { name: 'id < 8', function: idLessThan8 },
          { name: 'id < 5', function: idLessThan5 }
        ]"
        ></overvue-chart-wrapper>
      </div>
      <div>
        <overvue-chart-wrapper
        :getData="getPosts"
        :organizeData="organizeData"
        type="bar"
        title="Posts per user"
        :filters="[
          { name: 'id < 8', function: idLessThan8 },
          { name: 'id < 5', function: idLessThan5 }
        ]"
        ></overvue-chart-wrapper>
      </div>
      <div>
        <overvue-chart-wrapper
        :getData="getPosts"
        :organizeData="organizeData"
        type="pie"
        title="Posts per user"
        :filters="[
          { name: 'id < 82', function: idLessThan82 },
          { name: 'id < 52', function: idLessThan52 }
        ]"
        ></overvue-chart-wrapper>
      </div>
      <div>
        <overvue-chart-wrapper
        :getData="getPosts"
        :organizeData="organizeData"
        type="doughnut"
        title="Posts per user"
        :filters="[
          { name: 'id < 8', function: idLessThan8 },
          { name: 'id < 5', function: idLessThan5 }
        ]"
        ></overvue-chart-wrapper>
      </div>

    </div>
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
      dataLoaded: false,
    }
  },
  methods: {
    setDataLoaded() {
      this.dataLoaded = true;
    },
    getPosts() {
      return axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(({data}) => data.filter(r => r.postId <= 12));
    },
    organizeData(data) {
      data.sort((a, b) => a.postId - b.postId)
      const labels = data.reduce((uniques, current) => {
        if (!uniques.includes(current.postId) && current.postId)
          uniques.push(current.postId);
        return uniques;
      }, []);
      const datasets = [{
        label: 'Number of posts',
        data: labels.map(postId => data.filter(r => r.postId === postId).length)
      }];
      return {
        datasets,
        labels: labels.map(postId => `User ${postId}`)
      }
    },
    idLessThan8(data) {
      return data.filter(r => r.postId < 8);
    },
    idLessThan5(data) {
      return data.filter(r => r.postId < 5);
    },
    idLessThan82(data) {
      return data.filter(r => r.postId < 8);
    },
    idLessThan52(data) {
      return data.filter(r => r.postId < 5);
    }
  },
  mounted() {
    setTimeout(this.setDataLoaded, 2000);
  }
}
</script>
<style lang="scss" scoped>
.charts {
  display: flex;
  flex-wrap: wrap;

  &>* {
    flex-shrink: 1;
    flex-basis: 40%;
  }
}
</style>
