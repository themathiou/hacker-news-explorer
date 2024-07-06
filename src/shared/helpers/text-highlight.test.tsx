import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { highlightText } from './text-highlight.helper';

describe('highlightText', () => {
  test('returns null if text is empty', () => {
    const result = highlightText('', 'test');
    expect(result).toBeNull();
  });

  test('highlights matching text', () => {
    const { container } = render(<>{highlightText('This is a test string', 'test')}</>);
    const highlightedElement = container.querySelector('span');

    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveStyle('background-color: yellow');
    expect(highlightedElement).toHaveTextContent('test');
  });

  test('does not highlight non-matching text', () => {
    const { container } = render(<>{highlightText('This is a string', 'test')}</>);
    const highlightedElement = container.querySelector('span');

    expect(highlightedElement).not.toBeInTheDocument();
  });

  test('handles case-insensitive matching', () => {
    const { container } = render(<>{highlightText('This is a Test string', 'test')}</>);
    const highlightedElement = container.querySelector('span');

    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveStyle('background-color: yellow');
    expect(highlightedElement).toHaveTextContent('Test');
  });
});
