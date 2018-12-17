<template>
  <div class="about">
    {{$store.state.APP_OFFSET_WIDTH}}
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
      <overvue-chart-wrapper
      :getData="getPosts"
      :organizeData="organizeData"
      type="bar"
      title="Posts per user"
      ></overvue-chart-wrapper>
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
      dataLoaded: false
    }
  },
  methods: {
    setDataLoaded() {
      this.dataLoaded = true;
    },
    getPosts() {
      return axios.get('https://my.api.mockaroo.com/test.json?key=c5d2b6a0')
        .then(({data}) => data);
    },
    organizeData(data) {
      data.sort((a, b) => a.userId - b.userId)
      const labels = data.reduce((uniques, current) => {
        if (!uniques.includes(current.userId) && current.userId)
          uniques.push(current.userId);
        return uniques;
      }, []);
      const datasets = [{
        label: 'Number of posts',
        data: labels.map(userId => data.filter(r => r.userId === userId).length)
      }];
      return {
        datasets,
        labels: labels.map(userId => `User ${userId}`)
      }
    },
    idLessThan8(data) {
      return data.filter(r => r.userId < 8);
    },
    idLessThan5(data) {
      return data.filter(r => r.userId < 5);
    }
  },
  mounted() {
    setTimeout(this.setDataLoaded, 2000);
  }
}
</script>
<style lang="scss" scoped>

</style>
