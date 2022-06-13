import { createIntl, createIntlCache } from 'react-intl';

export const messages = {
  en: {
    search: 'City Search...',
    check: 'Choose a city!',
    gps: 'Current geolocation',
    feelsLike: 'Feels like',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    back: 'Back',
    perDay: 'Weather for next 24 years',
    pressure: 'Atmospheric pressure at sea level, hPa',
    humidity: 'Humidity, %',
    speed: 'Wind, m/s',
    gust: 'Gust',
  },
  uk: {
    search: 'Пошук міста...',
    check: 'Виберіть місто!',
    gps: 'Поточна геолокація',
    feelsLike: 'Відчувається як',
    yesterday: 'Вчора',
    daysAgo: 'днів тому',
    back: 'Повернутися',
    perDay: 'Погода на найближчі 24 години',
    pressure: 'Атмосферний тиск на рівні моря, гПа',
    humidity: 'Вологість, %',
    speed: 'Вітер, м/с',
    gust: 'Пориви',
  },
};

const cache = createIntlCache();

let int = createIntl(
  {
    locale: 'uk',
    messages: messages['uk'],
  },
  cache
);

export function changeLanguage(lang: 'en' | 'uk') {
  const newInt = createIntl(
    {
      locale: lang,
      messages: messages[lang],
    },
    cache
  );
  int = newInt;
}

const translate = (id: string) => {
  return int.formatMessage({ id });
};

export default translate;
