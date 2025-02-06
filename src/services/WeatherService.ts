import type { WeatherResponse } from "../interfaces/WeatherResponse.ts";
import type { TravelLocation } from "../interfaces/TravelLocation.ts";
import { fetchWeatherApi } from 'openmeteo';

const URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherForLocation(location: TravelLocation) : Promise<WeatherResponse[]> {

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const params = {
            "latitude": location.lat,
            "longitude": location.lng,
            "daily": "temperature_2m_max",
            "timezone": "Europe/Berlin",
            "start_date": "2025-01-06",
            "end_date": "2025-01-12"
        };
        const responses = await fetchWeatherApi(URL, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2mMax: daily.variables(0)!.valuesArray()!,
            },
        };

        const results : WeatherResponse[] = []

        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.daily.time.length; i++) {
            const res: WeatherResponse = {
                time: weatherData.daily.time[i].toISOString(),
                temperature: weatherData.daily.temperature2mMax[i]
            }
            results.push(res)
        }

    return results
}