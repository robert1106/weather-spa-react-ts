import { ICoords, IPlace } from '../types/types';
import { GOOGLE_API_KEY } from '../params/params';
import axios from 'axios';

export async function getPureCityName(latLon: ICoords, lang: 'uk' | 'en'): Promise<string> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLon.lat},${latLon.lon}&key=${GOOGLE_API_KEY}&language=${lang}`;
  let city = '';
  await axios.get(url).then((response) => (city = extractAddress(response.data.results[0])));
  return city;
}

function extractAddress(place: IPlace): string {
  let city = '';
  place.address_components.forEach((component) => {
    if (component.types.includes('locality')) {
      city = component.long_name;
    }
  });
  return city;
}
