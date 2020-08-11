<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      align="center"
    >
      <pivot-table
        :data="data"
        :fields="fields"
        :available-field-keys="allFieldKeys"
        :row-field-keys="rowFieldKeys"
        :col-field-keys="colFieldKeys"
        :reducer="reducer"
        :default-show-settings="true"
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
    {"service":"AncillaryFFS","claim":"-","payer":"Payer F","money":128438},{"service":"AncillaryFFS","claim":"-","payer":"Payer H","money":66624},{"service":"AncillaryFFS","claim":"-","payer":"Payer O","money":118108},{"service":"AncillaryFFS","claim":"-","payer":"Payer W","money":1073},{"service":"AncillaryFFS","claim":"ACH","payer":"Payer W","money":604},{"service":"AncillaryFFS","claim":"Advanced Registered Nurse Prac","payer":"Payer UN","money":0},{"service":"AncillaryFFS","claim":"ADVANCED RN PRACT","payer":"Payer CA","money":1772},{"service":"AncillaryFFS","claim":"AMBULANCE","payer":"Payer CA","money":446698},{"service":"AncillaryFFS","claim":"AMBULANCE","payer":"Payer CO","money":51664},{"service":"AncillaryFFS","claim":"AMBULANCE","payer":"Payer F","money":1083232}
]

export default {
  data: () => {
    return {
      data: data,
      fields: [{
        key: 'service',
        getter: item => item.service,
        label: 'Service',
        valueFilter: true
      }, {
        key: 'claim',
        getter: item => item.claim,
        label: 'Claim',
        valueFilter: true
      }, {
        key: 'payer',
        getter: item => item.payer,
        label: 'Payer',
        valueFilter: true
      }, {
        key: 'money',
        getter: item => item.money,
        label: 'Money',
        valueFilter: true
      }
              ],
      allFieldKeys: ['service', 'claim', 'payer', 'money'],
      rowFieldKeys: [],
      colFieldKeys: [],
      reducer: (sum, item) => sum + item.count,
    }
  }
}
</script>
