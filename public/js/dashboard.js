const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const editHandler = (event) => {
  if (event.target.matches('.edit-post')) {
    const postEl = event.target.closest('.post');
    postEl.querySelector('.edit-form').style.display = 'block';
    postEl.querySelector('.post-actions').style.display = 'none';
  }
};

const cancelEditHandler = (event) => {
  if (event.target.matches('.cancel-edit')) {
    const postEl = event.target.closest('.post');
    postEl.querySelector('.edit-form').style.display = 'none';
    postEl.querySelector('.post-actions').style.display = 'block';
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();
  if (event.target.matches('.edit-form')) {
    const postEl = event.target.closest('.post');
    const id = postEl.dataset.id;
    const title = postEl.querySelector('.edit-title').value.trim();
    const content = postEl.querySelector('.edit-content').value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  }
};

const deleteHandler = async (event) => {
  if (event.target.matches('.delete-post')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('.post-list').addEventListener('click', editHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', cancelEditHandler);

document
  .querySelector('.post-list')
  .addEventListener('submit', updatePostHandler);

document.querySelector('.post-list').addEventListener('click', deleteHandler);
