<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      align="center"
    >
      <pivot-table
           :data="data"
           :fields="fields"
           :available-field-keys="availableFieldKeys"
           :row-field-keys="rowFieldKeys"
           :col-field-keys="colFieldKeys"
           :reducer="reducer"
           :default-show-settings="defaultShowSettings"
      >
      <template slot="value" slot-scope="{ value }">
        {{ value.toLocaleString() }}
      </template>
    </pivot-table>
    </v-row>
  </v-container>
</template>

<script>
const data = [
  {"service": "AncillaryFFS", "claim": "-", "payer": "Payer F","money": 128438}
]

export default {

  components: {
      'pivot-table': () => import('@marketconnect/vue-pivot-table')
  },
  data: () => {
    return {
      data: data,
      fields: [{
        key: 'country',
        getter: item => item.country,
        label: 'Country',
        valueFilter: true
      }, {
        key: 'gender',
        getter: item => item.gender,
        label: 'Gender',
        valueFilter: true
      }, {
        key: 'year',
        getter: item => item.year,
        label: 'Year',
        valueFilter: true
      }],
      availableFieldKeys: [],
      rowFieldKeys: ['country', 'gender'],
      colFieldKeys: ['year'],
      reducer: (sum, item) => sum + item.count,
      defaultShowSettings: true,
      isDataLoading: false,

      // Pivot table standalone field params
      rowFields: [{
        getter: item => item.country,
        label: 'Country'
      }, {
        getter: item => item.gender,
        label: 'Gender'
      }],
      colFields: [{
        getter: item => item.year,
        label: 'Year'
      }]
    }
  }
}
</script>


<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
$enable-rounded: false;
$table-cell-padding: .5rem; // default in bs5
$table-cell-padding-sm: .25rem; // default in bs5

table[aria-busy='true'] {
  opacity: 0.6;
}

.svg-inline--fa.fa-fw {
  width: 1.25em;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -.125em !important;
}

.fa-pulse {
  animation: fa-spin 1s infinite steps(8);
}
</style>
