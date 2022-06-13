import { FC, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import uniqid from 'uniqid';
import {
  AutocompleteDropdownContainer,
  InputSearch,
  SelectOption,
  WrapSearch,
} from '../styles/styles';
import { addFetchWeather } from '../store/WeatherSlice';
import { useAppDispatch } from '../hooks/redux';
import translate from '../translate';

const SearchCity: FC = () => {
  const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSelect = (value: string) => {
    setAddress(value);
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng: lon } = latLng;
        const latLon = { lat, lon };
        const variant = 'ADD_CITY';
        dispatch(addFetchWeather({ latLon, variant }));
      });
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <WrapSearch>
          <InputSearch
            {...getInputProps({
              placeholder: translate('search'),
            })}
          />
          <AutocompleteDropdownContainer>
            {loading && <SelectOption>Loading...</SelectOption>}
            {suggestions.map((suggestion) => {
              return (
                <SelectOption {...getSuggestionItemProps(suggestion)} key={uniqid()}>
                  {suggestion.description}
                </SelectOption>
              );
            })}
          </AutocompleteDropdownContainer>
        </WrapSearch>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchCity;
