<template>
  <q-page class="flex">
  <q-card class="my-card">
      
      <q-card-section class="bg-orange-2 text-black">
        <div class="text-h6">QUESTIONS
          <q-btn 
            to="/add"
            exact
            icon="add" 
            style="background: goldenrod; color: white;" 
            label="Ask Question" 
            class="float-right" />
        </div>  
      </q-card-section>

      <q-separator />
      
      <q-card-section>
        <div class="q-pa-md ">
          <q-list bordered class="rounded-borders" style="max-width: 100%;">
          {{questions}}
          <Listitem v-for="question in questions" :key="question._id" :question=question />
            
            
          </q-list>
        </div>
      </q-card-section>
  </q-card>
 

  </q-page>
</template>


<script>
import Listitem from "../components/Listquestion";
import { mapState } from "vuex";

export default {
  name: 'PageHome',
  components: {
    Listitem
  },
  computed: {
    ...mapState({
      
      questions: state => state.questions
    })
  },
  mounted(){
    this.$store.dispatch('fetchquestion')
  },
  methods: {

  }
}
</script>


<style scoped>

  .my-card{

    width: 100%;
    max-width: 1000px;
    margin: 40px;
  }
</style>>



