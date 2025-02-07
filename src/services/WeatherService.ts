import type { WeatherResponse } from "../interfaces/WeatherResponse.ts";
import type { TravelLocation } from "../interfaces/TravelLocation.ts";
import { fetchWeatherApi } from 'openmeteo';
import { range } from "../utils.ts";

// const URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

export async function getWeatherForLocation(location: TravelLocation, startDate: string, endDate: string) : Promise<WeatherResponse[]> {
    if (!startDate || !endDate || !location) return [];

    const params = {
        "latitude": location.lat,
        "longitude": location.lng,
        "daily": "temperature_2m_max",
        "timezone": "Europe/Berlin",
        "start_date": startDate,
        "end_date": endDate
    };
    const responses = await fetchWeatherApi(ARCHIVE_URL, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;

    const weatherData = {
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0)!.valuesArray()!,
        },
    };

    const results : WeatherResponse[] = []

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const res: WeatherResponse = {
            time: weatherData.daily.time[i].toISOString(),
            temperature: weatherData.daily.temperature2mMax[i]
        }

        results.push(res)
    }

    return results
}