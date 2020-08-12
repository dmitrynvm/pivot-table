<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    "visible" : "dashboard/select-options/visible",
  }),
  methods: mapActions({
    "close" : "dashboard/select-options/close",
    "submit" : "dashboard/select-options/submit",
  }),
  data() {
    return {
      selected: [],
    }
  }
}
/*
 *
                  <tree-select
                    v-model="selected"
                    :multiple="true"
                    :max-height="200"
                    placeholder="Select your records..."
                  />
                  */
</script>


<template>
  <v-dialog
    :value="visible"
    @click:outside="close"
    @keydown.enter="submit"
    @keydown.esc="close"
    hide-overlay
    width="800"
  >
    <v-card>
      <v-card-title>
        <span>
          Data Selection Options
        </span>
        <v-spacer />
        <v-btn
          @click="close"
          class="mx-2"
          icon
        >
          <v-icon>
            clear
          </v-icon>
        </v-btn>
      </v-card-title>
        <v-card-text style="height: 400px">
          <v-form>
            <table cellspacing="3">
              <tr>
                <td>
                  Slicers / Dicers
                </td>
                <td>
                </td>
              </tr>
            </table>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="close"
            class="mx-1"
            text
            width="110"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="submit"
            class="mx-1"
            color="primary"
            width="110"
          >
          <v-icon
            class="mx-1"
            left
          >
            play_arrow
          </v-icon>
          <span>
            Apply
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style>
tr {
  padding-bottom: 5em;
}
</style>
