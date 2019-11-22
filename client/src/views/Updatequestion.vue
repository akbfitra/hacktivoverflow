<template>
<q-page class="flex">
<q-card class="my-card">

  <div class="q-pa-md q-gutter-sm">
    Title: 
    <q-input
        filled
        v-model="title"
        label="Title"
        
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    Description Question: 
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
    
    Tags: 
    
    <input-tag placeholder="Add Tag" v-model="tags" :limit=10></input-tag>
    <q-btn @click.prevent="updatequestion(data._id)" style="background: goldenrod; color: white; margin-top:30px;;" label="Update Question"  class="full-width" />
    </div>

</q-card>
</q-page>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import InputTag from 'vue-input-tag'
import Swal from 'sweetalert2'
export default {
  name:'Updatequestion',
  components: {
    VueTagsInput,
    InputTag
  },
  props: ['id', 'data'],
  data(){
    return {
      qeditor: this.data.description,
      tag: '',
      tags: this.data.tags,
      title: this.data.title
    }
  },
  methods: {
    updatequestion(id){
      let payload = {
        title: this.title,
        description: this.qeditor,
        tags: this.tags,
        id: id
      }
      this.$store.dispatch('updatequestions', payload)
        .then(data => {
          Swal.fire({
            title: 'success',
            icon: 'success',
            text: 'success update question'
          })
          this.$store.dispatch('fetchquestion')
          this.$router.push('/')
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

</style>>

