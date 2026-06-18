import { useReducer } from 'react';
import { useUpdateUserStory } from './useUpdateUserStory';

const PRIORITES = [1, 2, 3, 4];
const STATUS_OPTIONS = [
  { value: 'TODO', label: 'À faire' },
  { value: 'IN_PROGRESS', label: 'En cours' },
  { value: 'DONE', label: 'Terminé' },
];

function formReducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value };
    case 'INIT': return action.payload;
    default: return state;
  }
}

export function useUserStoryForm(story, onSaved) {
  const [form, dispatch] = useReducer(formReducer, { ...story });
  const updateMutation = useUpdateUserStory();

  const set = (field) => (e) => dispatch({ type: 'SET', field, value: e.target.value });

  function init() {
    dispatch({ type: 'INIT', payload: { ...story } });
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.titre?.trim()) return;
    updateMutation.mutate(
      { id: story.id, data: form },
      { onSuccess: onSaved }
    );
  }

  return { form, set, init, handleSave, updateMutation, PRIORITES, STATUS_OPTIONS };
}
