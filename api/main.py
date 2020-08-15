import pandas
import sanic
import json
from numpyencoder import NumpyEncoder



app = sanic.Sanic("App Name")
db = pandas.read_csv('data1.csv', index_col=0, parse_dates=True)[:100]


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




def options_headers(input):
    output = []
    output.append({
        'field': 'name',
        'label': 'Columns',
        'type': 'string',
        'width': '220px'
    })
    output.append({
        'field': 'action',
        'label': '',
        'width': '30px'
    })
    return output


def options_items(input):
    output = []
    for idx, col in enumerate(input.columns):
        output.append({
            'id': idx,
            'name': col,
            'vgtSelected': True
        })
    return output


def options_subheaders(input):
    output = []
    output.append({
        'field': 'value',
        'label': 'Value',
        'type': 'string',
        'width': '270px'
    })
    return output


def options_subitems(input):
    output = []
    filled = input.fillna('-')
    not_nan = lambda x: x != '-'
    for i, col in enumerate(filled.columns):
        cleaned = filled[col].apply(clean)
        cleaned.replace('True', 'true')
        cleaned.replace('False', 'false')
        vals = sorted(filter(not_nan, list(cleaned.unique())))
        children = []
        for si, val in enumerate(vals):
            children.append({
                'id': int(si),
                'value': val,
                'vgtSelected': True
            })
        output.append({
            'children': children
        })
    return output


def dashboard_headers(input):
    output = []
    for column in input.columns:
        if column == 'dob':
            output.append({
                'label': column,
                'field': column,
                'type': 'date',
                'dateInputFormat': 'dd/MM/yyyy',
                'dateOutputFormat': 'dd/MM/yyyy',
            })
        else:
            output.append({
                'label': column,
                'field': column,
            })
    return output


def dashboard_items(input):
    '''
    Converts dataframe 'input' in more convinient for frontend json-format
    '''
    output = []
    filled = input.fillna('-')#.sort_values(by='dob')
    for id, vals in filled.iterrows():
        cleaned = [id] + [clean(val) for val in vals]
        output.append(dict(zip(['id'] + list(input.columns), cleaned)))
    return output


@app.route("/dashboard")
async def dashboard(request):
    '''
    Request handler that loads the input dataframe and returns the data in json-format
    '''
    output = {
        'headers': dashboard_headers(db),
        'items': dashboard_items(db)
    }
    return sanic.response.json(output)


@app.route("/options")
async def options(request):
    '''
    Request handler that loads the input dataframe and returns the data in json-format
    '''
    output = {
        'headers': options_headers(db),
        'items': options_items(db),
        'subheaders': options_subheaders(db),
        'subitems': options_subitems(db),
    }
    return sanic.response.json(output)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
    '''
    output = options_headers(db)
    print(output)
    output = options_subitems(db)
    print(output)
    '''
