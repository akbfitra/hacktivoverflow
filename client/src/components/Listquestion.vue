<template>
<div>

  <q-item>
    <q-item-section avatar top>
      {{question.upvotes.length - question.downvotes.length}}
      <q-item-label class="q-mt-sm">Votes</q-item-label>
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      {{question.comments.length}}
      <q-item-label class="q-mt-sm">Answers</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <span @click.prevent="detailquestion(question._id)" class="cursor-pointer">{{question.title}}</span>
      </q-item-label>
      <div class="text-grey-8 q-gutter-xs" style="margin-top:3px;">
        <q-btn
          v-for="tag in question.tags"
          :key="tag._id"
          color="orange-5"
          size="xs"
          :label="`${tag}`"
      />
      </div>
      
      
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-mt-xs">
        <q-item-label caption lines="1">
          {{question.owner.username}}: Asked on {{formatDate}}
        </q-item-label>
        <div v-if="cek" class="text-grey-8 q-gutter-xs float-right" style="margin-top:3px;">
        <q-btn
          @click.prevent="update(question._id)"
          color="primary"
          size="xs"
          :label="`Update`"
        />
        <q-btn
          @click.prevent="del(question._id)"
          color="negative"
          size="xs"
          :label="`Delete`"
        />
      </div>
      </div>
    </q-item-section>
  </q-item>

  <q-separator spaced />
</div>
</template>

<script>
import moment from "moment";
export default {
  name: 'ListItem',
  props: ['question', 'cek'],
  computed: {
    formatDate: function() {
      return moment(this.question.createdAt).fromNow()
    }
  },
  methods: {
    detailquestion(id){
      this.$store.dispatch('detailquestion', id)
      this.$router.push({name: "detailquestion", params:{id: id}})
    },
    update(id){
      this.$router.push({name: "updatequestion", params:{id: id, data: this.question}})
    },
    del(id){

    }
  }
}
</script>

<style>

</style>