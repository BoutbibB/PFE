from flask import Flask, jsonify
from prophet import Prophet
import pandas as pd
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/forecast', methods=['GET'])
def forecast():
    try:
        response = requests.get('http://localhost:5000/dailystats')
        daily_sales_data = response.json()

        df = pd.DataFrame(daily_sales_data)
        df['ds'] = pd.to_datetime(df['ds'])

        model = Prophet()
        model.fit(df)

        future = model.make_future_dataframe(periods=7, freq='D')
        forecast = model.predict(future)

        forecast_next_7_days = forecast[['ds', 'yhat']].tail(7)
        forecast_next_7_days['date'] = forecast_next_7_days['ds'].dt.strftime('%b %d')
        forecast_next_7_days = forecast_next_7_days.rename(columns={'yhat': 'profit'})
        forecast_next_7_days['profit'] = forecast_next_7_days['profit'].round(2)

        return jsonify(forecast_next_7_days[['ds', 'date', 'profit']].to_dict(orient='records')), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
