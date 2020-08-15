
module.exports = {
  'devServer': {
    'port': 3001,
    'proxy': 'http://localhost:8000',
    'disableHostCheck': true,
    'headers': {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
