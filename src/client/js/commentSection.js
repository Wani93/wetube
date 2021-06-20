const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const commentList = document.querySelectorAll('#commentList li');

const handleDelete = async (id, event) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    event.target.parentElement.remove();
  }
};

const addComment = (text, id) => {
  const videoComments = document.querySelector('.video__comments ul');
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.className = 'video__comment';
  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';
  const span = document.createElement('span');
  span.innerText = ` ${text}`;
  const span2 = document.createElement('span');
  span2.innerText = '❌';
  span2.addEventListener('click', handleDelete.bind(event, id));
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === '') {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 서버에 전달할 내용이 string 이지만 JSON 이라는 것을 명시
    },
    body: JSON.stringify({ text }), // JSON -> String으로 변환하여 전달ㅈ
  });
  if (response.status === 201) {
    textarea.value = '';
    const { newCommentId } = await response.json(); // 서버에서 응답한 데이터를 json으로 받음.
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}

commentList.forEach((element) => {
  const commentId = element.dataset.id;
  const deleteBtn = element.querySelectorAll('span')[1];
  if (deleteBtn) {
    deleteBtn.addEventListener('click', handleDelete.bind(event, commentId));
  }
});
