document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', async (event) => {
      const { id } = event.target.dataset;

      try {
        const response = await fetch(`/people/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          return event.target.closest('li').remove();
        }

        console.error('Failed to delete');
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});
