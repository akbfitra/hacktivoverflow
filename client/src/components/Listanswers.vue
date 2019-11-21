<template>
  <div>
   <q-card-section>
      <div class="row">
        <div class="column" style="width:80px">
          <q-btn @click.prevent="upvoteanswer(comment._id)" flat round color="black" icon="keyboard_arrow_up" size="20px" />
              <div style="margin-left: 25px;">
                {{votesanswer}}
              </div>
          <q-btn @click.prevent="downvoteanswer(comment._id)" flat round color="black" icon="keyboard_arrow_down" size="20px" />
        </div>
        <div class="column">
          <div  v-html="comment.description">
        
          </div>
        </div>
      </div>
    </q-card-section>
    {{comment}}
    <q-separator inset />
  </div>
</template>

<script>
export default {
  name: 'Listanswer',
  data(){
    return {
      
    }
  },
  props: ['comment'],
  computed: {
    votesanswer(){
      return this.comment.upvotes.length - this.comment.downvotes.length
    }
  },
  methods: {
    upvoteanswer(id){
      console.log(id)
      this.$store.dispatch('upvoteanswer', id)
        .then( data => {
  
        })
        .catch( err => {
          this.next(err)
        })
    },
    downvoteanswer(id){
      this.$store.dispatch('downvoteanswer', id)
        .then( data => {
        
        })
        .catch( err => {
          this.next(err)
        })
    }
  }
}
</script>

<style>

</style>