<template>
  <div class="bv-example-row" style="margin-top: 40px">

    <b-row>
      <b-col class="col-12">
        <center>
        <h4 class="card-title">List Data</h4>
        </center>
      </b-col>
    </b-row>
    
    <b-row v-for="(data, index) in dataList" :key="index">

      <b-col class="col-2"></b-col>

      <b-col class="col-8">
        <b-card
            img-src=""
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 100rem;"
            class="mb-2">
          <router-link :to="{ name: 'HelloWorldDetail', params: { id: data.id } }">
            <h4 class="card-title">{{ data.title }}</h4>
          </router-link>
          <p class="card-text">
            {{ data.body.substr(0, 50) }}
          </p>
        </b-card>
      </b-col>

      <b-col class="col-2"></b-col>

    </b-row>

    <infinite-loading @infinite="infiniteHandler" :distance="distance" ref="infiniteLoading"></infinite-loading>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'HelloWorld',
  data () {
    return {
      dataList: [],
      distance: 100,
      indexAwal: 0,
      indexAkhir: 5,
    }
  },

  components: {
    InfiniteLoading,
  },

  created() {
    this.getData(0, 5)
  },

  methods: {
    getData: function(indexAwal, indexAkhir) {
      this.axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const temp = []
        for(let i = indexAwal; i < indexAkhir; i++){
          temp.push(response.data[i])
        }
        this.dataList = this.dataList.concat(temp)

        console.log(this.indexAkhir, response.data.length)

        this.indexAwal = this.indexAwal + 5
        this.indexAkhir = this.indexAkhir + 5

      })
      .catch(err => {
        console.log(err)
      })
    },

    infiniteHandler($state) {
      if(this.indexAkhir < 100){
        setTimeout(() => {
          this.getData(this.indexAwal, this.indexAkhir)
            $state.loaded();
        }, 1500);
      }else{
        $state.complete();
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
