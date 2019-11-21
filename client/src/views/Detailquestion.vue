<template>
<q-page class="flex">
<q-card class="my-card">
   <q-card-section class="bg-orange-5 text-white">
      <div class="text-h6">{{detailquestion.title}}</div>
      <div class="text-subtitle2">by {{detailquestion.owner.username}}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row">
        <div class="column" style="width:80px">
          <q-btn @click.prevent="upvote(detailquestion._id)" flat round color="black" icon="keyboard_arrow_up" size="20px" />
              <div style="margin-left: 25px;">
                {{allvotes}}
              </div>
          <q-btn @click.prevent="downvote(detailquestion._id)" flat round color="black" icon="keyboard_arrow_down" size="20px" />
        </div>
        <div class="column">
          <div  v-html="detailquestion.description">
        
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator inset />
    
    <q-card-section>
      <div class="text-h6">List Answers: </div>
      <Listanswers v-for="comment in detailquestion.comments" :key="comment._id" :comment=comment ></Listanswers>

    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="text-h6">
        Your Answer :
      </div>
      <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
    
    </q-card-section>
    <q-card-section>
      <q-btn @click.prevent="addanswer(detailquestion._id)" color="orange" icon-right="send" label="Submit Your Answer" />

    </q-card-section>
    {{detailquestion}}
  </q-card>
</q-page>

</template>

<script>
import { mapState } from "vuex";
import Listanswers from "../components/Listanswers";
import Swal from "sweetalert2";
export default {
  data(){
    return{
      qeditor:''
    }
  },
  computed: {
    ...mapState({
      detailquestion: state => state.detailquestion
    }),
    allvotes(){
      return this.detailquestion.upvotes.length - this.detailquestion.downvotes.length
    }
  },
  components: {
    Listanswers
  },
  watch: {
    detailquestion(){
      return this.$store.dispatch('detailquestion', this.detailquestion._id)
    }
  },
  methods: {
    addanswer(id){
      let payload = {
        id: id,
        description: this.qeditor
      }
      this.$store.dispatch('addanswer', payload)
        .then( data => {
          Swal.fire({
            title: 'success',
            icon: 'success',
            text: 'success add answers'
          })
          this.$store.dispatch('detailquestion', this.detailquestion._id )
        })
        .catch( err => {
          this.next(err)
        })
    },
    upvote(id){
      this.$store.dispatch('upvote', id)
        .then( data => {
          console.log('masuuuukkkkk')
          this.$store.dispatch('detailquestion', this.detailquestion._id )
        })
        .catch( err => {
          this.next(err)
        })
    },
    downvote(id){
      this.$store.dispatch('downvote', id)
        .then( data => {
          this.$store.dispatch('detailquestion', this.detailquestion._id)
        })
        .catch( err => {
          this.next(err)
        })
    }
  }

}
</script>

<style scoped>

.my-card{
    width: 100%;
    max-width: 1000px;
    margin: 40px;
  }
</style>

