// @ts-check
/* eslint-disable no-param-reassign, no-console  */

const modalRenderer = (activePostId, state) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.modal-read');
  state.posts.forEach((item) => {
    item.posts.forEach((post) => {
      if (post.id === activePostId) {
        modalTitle.textContent = post.title;
        modalBody.textContent = post.content;
        modalLink.setAttribute('href', post.link);
      }
    });
  });
};

export default modalRenderer;
