import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { HNResponse, Hit } from '../models/hn-response.model';

const AutoSuggest: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Hit[]>([]);
  const [savedStories, setSavedStories] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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

  const saveStory = (story: Hit) => {
    setSavedStories([...savedStories, story]);
  };

  const deleteStory = (id: string) => {
    setSavedStories(savedStories.filter(story => story.objectID !== id));
  };

  return (
    <Fragment>
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
      <section>
        <h2>Saved Stories</h2>
        {savedStories.length > 0 ? (
          <ul>
            {savedStories.map(story => (
              <li key={story.objectID}>
                <a href={story.url} target='_blank' rel='noreferrer' title='Open in new tab'>
                  {story.title}
                </a>
                <button onClick={() => deleteStory(story.objectID)} title='Delete'>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved stories</p>
        )}
      </section>
    </Fragment>
  );
};

export default AutoSuggest;
