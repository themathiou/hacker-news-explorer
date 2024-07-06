import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import AutoSuggest from './AutoSuggest';
import renderWithProviders from '../../test-utils';
import { useDispatch } from 'react-redux';

jest.mock('lodash', () => ({
  debounce: jest.fn(fn => fn)
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

const mock = new MockAdapter(axios);

const mockSuggestions = [
  { objectID: '1', title: 'Test Story 1', points: 100, author: 'Author 1', num_comments: 50 },
  { objectID: '2', title: 'Test Story 2', points: 200, author: 'Author 2', num_comments: 100 }
];

describe('AutoSuggest Component', () => {
  let dispatchMock; // jest.Mock

  beforeEach(() => {
    mock.reset();
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render input field', () => {
    renderWithProviders(<AutoSuggest />);
    const inputElement = screen.getByPlaceholderText(/search title/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('should not fetch and display suggestions when input is less than 3 characters', async () => {
    // Adjust the regex to match any query value
    mock.onGet(/https:\/\/hn\.algolia\.com\/api\/v1\/search\?query=.*/).reply(200, { hits: mockSuggestions });

    renderWithProviders(<AutoSuggest />);

    const inputElement = screen.getByPlaceholderText(/search title/i);
    fireEvent.focus(inputElement); // focus to ensure that the suggestions are displayed
    fireEvent.change(inputElement, { target: { value: 'te' } });

    // Results should not be displayed
    await waitFor(() => expect(screen.queryByText(/Test Story 1/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Test Story 2/i)).not.toBeInTheDocument());
  });

  test('should fetch results and highlight the search term in the suggestions', async () => {
    mock.onGet(/search\?query=test/i).reply(200, { hits: mockSuggestions });

    renderWithProviders(<AutoSuggest />);

    const inputElement = screen.getByPlaceholderText(/search title/i);
    fireEvent.focus(inputElement); // focus to ensure that the suggestions are displayed
    fireEvent.change(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
      const highlightedElements = screen.getAllByText(/test/i);
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveStyle('background-color: yellow');
      });
    });
  });

  test('should hide suggestions when input loses focus', async () => {
    mock.onGet(/search\?query=test/i).reply(200, { hits: mockSuggestions });

    renderWithProviders(<AutoSuggest />);

    const inputElement = screen.getByPlaceholderText(/search title/i);
    fireEvent.focus(inputElement); // focus to ensure that the suggestions are displayed
    fireEvent.change(inputElement, { target: { value: 'test story 1' } }); // search full text to avoid highlighting breaking the 'element'

    await waitFor(() => expect(screen.getByText(/Test Story 1/i)).toBeInTheDocument());

    fireEvent.blur(inputElement);

    await waitFor(() => expect(screen.queryByText(/Test Story 1/i)).not.toBeInTheDocument());
    expect(screen.queryByText(/Test Story 2/i)).not.toBeInTheDocument();
  });

  test('should call saveStory when suggestion is clicked', async () => {
    mock.onGet(/https:\/\/hn\.algolia\.com\/api\/v1\/search\?query=.*/).reply(200, { hits: mockSuggestions });

    renderWithProviders(<AutoSuggest />);

    const inputElement = screen.getByPlaceholderText(/search title/i);
    fireEvent.focus(inputElement); // focus to ensure that the suggestions are displayed
    fireEvent.change(inputElement, { target: { value: 'test story 1' } }); // search full text to avoid highlighting breaking the 'element'

    await waitFor(() =>
      expect(screen.getByText((content, element) => content.startsWith('Test Story 1'))).toBeInTheDocument()
    );

    const suggestionItem = screen.getByText((content, element) => content.startsWith('Test Story 1'));
    fireEvent.click(suggestionItem);

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.any(String), // check for the action type
        payload: mockSuggestions[0]
      })
    );
  });
});
