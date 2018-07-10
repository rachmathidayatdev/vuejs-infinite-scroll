<template>
    <div class="bv-example-row" style="margin-top: 40px">
    
    <b-row>

      <b-col class="col-2"></b-col>

      <b-col class="col-8">
        <b-card
            img-src=""
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 100rem;"
            class="mb-2">
          <h4 class="card-title">{{ dataDetail.title }}</h4>  
          <p class="card-text">
            {{ dataDetail.body }}
          </p>
          <router-link :to="{ name: 'HelloWorld' }">
            <b-button variant="primary">Back</b-button>
          </router-link>
        </b-card>
      </b-col>

      <b-col class="col-2"></b-col>

    </b-row>

  </div>
</template>

<script>
export default {
    name: 'HelloWorldDetail',
    data() {
        return {
            dataDetail: []
        }
    },

    created() {
        this.getData(this.$route.params.id)
    },

    methods: {
      getData: function(id) {
        this.axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            var dataDetailTmp = response.data.filter((item, index) => {
                if(item.id == id) {
                    return item
                }
            })

            this.dataDetail = dataDetailTmp[0]
        })
        .catch(err => {
            console.log(err)
        })
      }
    }
}
</script>