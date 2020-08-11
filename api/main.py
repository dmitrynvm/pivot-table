import pandas
import sanic


app = sanic.Sanic("App Name")


def jsonify(input):
    '''
    Converts dataframe 'input' in more convinient for frontend json-format
    '''
    output = []
    filled = input.fillna('-')
    for _, vals in filled.iterrows():
        output.append(dict(zip(input.columns, vals)))
    return output


@app.route("/dashboard")
async def dashboard(request):
    '''
    Request handler that loads the input dataframe and returns the data in json-format
    '''
    frame = pandas.read_csv('data2.csv', index_col=0, parse_dates=True)[:10]
    output = {
        'headers': list(frame.columns),
        'items': jsonify(frame)
    }
    return sanic.response.json(output)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
