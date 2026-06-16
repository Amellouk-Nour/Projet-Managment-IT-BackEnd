import { useReducer } from 'react';
import { useUpdateTicket } from './useUpdateTicket';

const STATUS_OPTIONS = [
  { value: 'a_faire', label: 'À faire' },
  { value: 'en_cours_dev', label: 'En cours' },
  { value: 'en_code_review', label: 'Code review' },
  { value: 'dev_termine', label: 'Dev terminé' },
  { value: 'en_test', label: 'En test' },
  { value: 'test_valide', label: 'Terminé' },
];

function formReducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value };
    case 'RESET': return action.payload;
    default: return state;
  }
}

export function useTicketForm(ticket, onCancel) {
  const [form, dispatch] = useReducer(formReducer, ticket);

  const set = (field, value) => dispatch({ type: 'SET', field, value });
  const reset = () => dispatch({ type: 'RESET', payload: ticket });

  const updateMutation = useUpdateTicket();

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.titre?.trim()) return;
    updateMutation.mutate(
      { id: ticket.id, data: form },
      { onSuccess: () => onCancel() }
    );
  };

  return { form, set, handleSave, updateMutation, STATUS_OPTIONS };
}