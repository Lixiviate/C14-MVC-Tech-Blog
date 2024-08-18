const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = event.target.querySelector('.comment-body').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelectorAll('.comment-form')
  .forEach((form) => form.addEventListener('submit', commentFormHandler));
