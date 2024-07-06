import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { HNResponse, Hit } from '../../models/hn-response.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../shared/store';
import { HackerNewsActions } from '../../shared/store/hacker-news';

const AutoSuggest: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const fetchSuggestions = useCallback(
    _.debounce((input: string) => {
      if (input.length >= 3) {
        setLoading(true);
        axios
          .get(`https://hn.algolia.com/api/v1/search?query=${input}`)
          .then((res: AxiosResponse<HNResponse>) => {
            const suggestions = res.data.hits.filter((hit: Hit) => hit.title);
            setSuggestions(suggestions);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const saveStory = (suggestion: Hit) => {
    dispatch(HackerNewsActions.addSavedStory(suggestion));
  };

  return (
    <section onBlur={handleBlur} tabIndex={-1}>
      <input type='text' placeholder='Search title' value={query} onChange={handleChange} onFocus={handleFocus} />
      {isFocused && (
        <ul>
          {loading && (
            <li>
              <p>Fetching...</p>
            </li>
          )}

          {query && !suggestions.length && !loading && (
            <li>
              <p>No results...</p>
            </li>
          )}

          {suggestions.map((suggestion: Hit) => (
            <li key={suggestion.objectID} onClick={() => saveStory(suggestion)}>
              <p> {suggestion.title}</p>
              <p>
                {suggestion.points} points| by {suggestion.author} | {suggestion.num_comments} comments
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AutoSuggest;
