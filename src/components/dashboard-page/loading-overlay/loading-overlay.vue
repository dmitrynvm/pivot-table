<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({ 
    'visible' : 'dashboard/loading/visible'
  })
}
</script>

<template>
  <v-overlay :value='visible'>
    <v-progress-circular
      indeterminate
      dark
      size='64'
    />
  </v-overlay>
</template>
