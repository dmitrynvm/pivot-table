import pandas
import sanic
import json
from numpyencoder import NumpyEncoder



app = sanic.Sanic("App Name")
db = pandas.read_csv('data1.csv', index_col=0, parse_dates=True)#[:10]


def clean(input):
    output = None
    if isinstance(input, str):
        if input.find('$') == -1:
            output = input
        else:
            if input.find('.') == -1:
                output = int(input[1:].replace(',', ''))
            else:
                output = float(input[1:].replace(',', ''))
    elif isinstance(input, bool):
        if input == True:
            return 'true'
        else:
            return 'false'
    else:
        output = str(input)
    return output


def jsonify(input):
    '''
    Converts dataframe 'input' in more convinient for frontend json-format
    '''
    output = []
    filled = input.fillna('-')
    for id, vals in filled.iterrows():
        cleaned = [id] + [clean(val) for val in vals]
        output.append(dict(zip(['id'] + list(input.columns), cleaned)))
    return output


def get_options(input):
    output = []
    filled = input.fillna('-')
    for idx, col in enumerate(filled.columns):
        cleaned = filled[col].apply(clean)
        cleaned.replace('True', 'true')
        cleaned.replace('False', 'false')
        output.append({
            'id': idx,
            'label': col,
            'children': list(cleaned.unique())
        })
    return output


@app.route("/dashboard")
async def dashboard(request):
    '''
    Request handler that loads the input dataframe and returns the data in json-format
    '''
    output = {
        'headers': list(db.columns),
        'items': jsonify(db)
    }
    return sanic.response.json(output)


@app.route("/options")
async def options(request):
    '''
    Request handler that loads the input dataframe and returns the data in json-format
    '''

    options = get_options(db)

    output = {
        'options': options
    }
    return sanic.response.json(output)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
