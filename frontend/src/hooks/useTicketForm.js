import { useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const initialForm = { ...ticket };
  console.log('useTicketForm init:', { ticketAssignedToId: ticket.assignedToId, ticket });
  const [form, dispatch] = useReducer(formReducer, initialForm);

  const set = (field, value) => dispatch({ type: 'SET', field, value });
  const reset = () => dispatch({ type: 'RESET', payload: initialForm });

  const updateMutation = useUpdateTicket();

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.titre?.trim()) return;
    const data = {
      ...form,
      assigneeIds: form.assigneeIds ? form.assigneeIds.map(Number) : [],
      userStoryId: form.userStoryId == null || form.userStoryId === '' || isNaN(Number(form.userStoryId))
        ? null : Number(form.userStoryId),
    };
    updateMutation.mutate(
      { id: ticket.id, data },
      {
        onSuccess: (responseData) => {
          console.log('Save response:', responseData);
          queryClient.setQueryData(['ticket', ticket.id], responseData);
          queryClient.invalidateQueries({ queryKey: ['tickets'] });
          onCancel();
        },
        onError: (err) => {
          console.error('Save failed:', err);
        },
      }
    );
  };

  return { form, set, handleSave, updateMutation, STATUS_OPTIONS };
}