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
      limit: 5,
      indexNewArray: 0,
      NewArray:[],
    }
  },

  components: {
    InfiniteLoading,
  },

  created() {
    this.getData()
  },

  methods: {
    getData: function() {
      this.axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const NewArray = this.chunk(response.data, this.limit)
        this.NewArray = NewArray

        this.setDataList(this.NewArray, 0, this.limit)
      })
      .catch(err => {
        console.log(err)
      })
    },

    setDataList: function(array, index, limit){
      const temp = []
      for(let i = 0; i < limit; i++){
        temp.push(array[index][i])
      }
      this.dataList = this.dataList.concat(temp)
    },

    chunk: function(array, splitBy, newArray = []) {
      if (array.length <= newArray.length * splitBy) {
        return newArray
      }

      let startLength = newArray.length === 0 ? 0 : (newArray.length * splitBy) 
      let lastLength = newArray.length * splitBy === 0 ? splitBy : startLength + splitBy
      
      newArray.push(array.slice(startLength, lastLength))
      
      return this.chunk(array, splitBy, newArray)
    },

    infiniteHandler($state) {
      this.indexNewArray = this.indexNewArray + 1
      if(this.indexNewArray < 20){
        setTimeout(() => {
          this.setDataList(this.NewArray, this.indexNewArray, this.limit)
            $state.loaded();
        }, 1000);
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
