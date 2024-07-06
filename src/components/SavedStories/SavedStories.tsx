import { useDispatch, useSelector } from 'react-redux';
import { HackerNewsActions, selectSavedStories } from '../../shared/store/hacker-news';
import { AppDispatch } from '../../shared/store';

const SavedStories = () => {
  const dispatch: AppDispatch = useDispatch();
  const stories = useSelector(selectSavedStories);

  const deleteStory = (id: string) => {
    dispatch(HackerNewsActions.deleteSavedStory(id));
  };

  return (
    <section>
      <h2>Saved Stories</h2>
      {stories.length > 0 ? (
        <ul>
          {stories.map(story => (
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
  );
};

export default SavedStories;
