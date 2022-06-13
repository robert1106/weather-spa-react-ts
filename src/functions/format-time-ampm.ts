import translate from '../translate';

export function formatAMPM(dt: string, lang: 'uk' | 'en') {
  const dateToTime = (date: Date) =>
    date.toLocaleString(lang, {
      hour: 'numeric',
      minute: 'numeric',
    });

  let dates = 0;
  const theDate = new Date(String(dt));
  while (theDate.getDate() < new Date().getDate()) {
    dates++;
    theDate.setDate(theDate.getDate() + 1);
  }

  if (dates === 1) {
    return `${translate('yesterday')}`;
  } else if (dates >= 1) {
    return `${dates} ${translate('daysAgo')}`;
  } else {
    return dateToTime(new Date(String(dt)));
  }
}
