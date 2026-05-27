const API_ROOT = `${window.location.origin}/api`;
const STORAGE_KEY = 'stanchat.session';
const VOTES_STORAGE_PREFIX = 'stanchat.votes.';

const FLAIRS = [
  { name: 'All', label: 'All posts', colorClass: 'color-general' },
  { name: 'Admissions', label: 'Admissions', colorClass: 'color-admissions' },
  { name: 'Campus Life', label: 'Campus Life', colorClass: 'color-campus' },
  { name: 'Career', label: 'Career', colorClass: 'color-career' },
  { name: 'Housing', label: 'Housing', colorClass: 'color-housing' },
  { name: 'Events', label: 'Events', colorClass: 'color-events' },
  { name: 'General', label: 'General', colorClass: 'color-general' },
];

const state = {
  authMode: 'login',
  error: '',
  filter: 'All',
  isLoading: true,
  menuOpen: false,
  commentErrors: new Map(),
  commentLoadingIds: new Set(),
  commentSubmittingIds: new Set(),
  commentsByPost: {},
  posts: [],
  reset: {
    email: '',
    isLoading: false,
    message: '',
    status: '',
    step: 'request',
  },
  search: '',
  selectedPostId: null,
  sort: 'hot',
  user: null,
  userVotes: {},
  voteErrors: new Map(),
  votingIds: new Set(),
};

const elements = {
  activeFilterLabel: document.querySelector('#activeFilterLabel'),
  authEmail: document.querySelector('#authEmail'),
  authEyebrow: document.querySelector('#authEyebrow'),
  authForm: document.querySelector('#authForm'),
  authMessage: document.querySelector('#authMessage'),
  authModal: document.querySelector('#authModal'),
  authModeToggle: document.querySelector('#authModeToggle'),
  authPassword: document.querySelector('#authPassword'),
  authSubmit: document.querySelector('#authSubmit'),
  authTitle: document.querySelector('#authTitle'),
  authUsername: document.querySelector('#authUsername'),
  composeCard: document.querySelector('#composeCard'),
  feedList: document.querySelector('#feedList'),
  feedTools: document.querySelector('.feed-tools'),
  forgotPage: document.querySelector('#forgotPage'),
  forgotPasswordLink: document.querySelector('#forgotPasswordLink'),
  menuButton: document.querySelector('#menuButton'),
  mobileFilters: document.querySelector('#mobileFilters'),
  postDetail: document.querySelector('#postDetail'),
  postModal: document.querySelector('#postModal'),
  profilePanel: document.querySelector('#profilePanel'),
  refreshButton: document.querySelector('#refreshButton'),
  searchInput: document.querySelector('#searchInput'),
  sideFilters: document.querySelector('#sideFilters'),
  sortSelect: document.querySelector('#sortSelect'),
  topbarActions: document.querySelector('#topbarActions'),
  trendList: document.querySelector('#trendList'),
  usernameField: document.querySelector('#usernameField'),
  welcomeBand: document.querySelector('.welcome-band'),
  welcomeMetrics: document.querySelector('#welcomeMetrics'),
};

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char]);
}

function normalizePost(post) {
  return {
    id: post.id,
    title: post.title || 'Untitled post',
    content: post.content || '',
    flair: post.flair || 'General',
    user_id: post.user_id || '',
    votes: Number(post.votes || 0),
    created_at: post.created_at || new Date().toISOString(),
  };
}

function getFlair(flairName) {
  return FLAIRS.find((flair) => flair.name === flairName) || FLAIRS[FLAIRS.length - 1];
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'recently';

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function getAuthor(post) {
  if (state.user && post.user_id === state.user.id) return state.user.username;
  if (!post.user_id) return 'Stanchat student';
  return `Student ${String(post.user_id).slice(0, 6)}`;
}

function getCommentAuthor(comment) {
  if (state.user && comment.user_id === state.user.id) return state.user.username;
  if (!comment.user_id) return 'Stanchat student';
  return `Student ${String(comment.user_id).slice(0, 6)}`;
}

function normalizeComment(comment) {
  return {
    id: comment.id || `${comment.post_id}-${comment.created_at || Date.now()}`,
    content: comment.content || '',
    post_id: comment.post_id || '',
    user_id: comment.user_id || '',
    created_at: comment.created_at || new Date().toISOString(),
  };
}

function getVotesStorageKey(userId) {
  return `${VOTES_STORAGE_PREFIX}${userId}`;
}

function loadUserVotes(userId) {
  if (!userId) return {};

  try {
    const raw = localStorage.getItem(getVotesStorageKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    localStorage.removeItem(getVotesStorageKey(userId));
    return {};
  }
}

function saveUserVote(postId, direction) {
  if (!state.user) return;

  state.userVotes = {
    ...state.userVotes,
    [postId]: direction,
  };
  localStorage.setItem(getVotesStorageKey(state.user.id), JSON.stringify(state.userVotes));
}

function getUserVote(postId) {
  return state.user ? state.userVotes[postId] : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isForgotPasswordPage() {
  return window.location.pathname === '/forgot-password';
}

function saveSession(session) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY);
    state.user = null;
    state.userVotes = {};
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  state.user = session.user;
  state.userVotes = loadUserVotes(session.user.id);
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const session = JSON.parse(raw);
    if (session && session.user) {
      state.user = session.user;
      state.userVotes = loadUserVotes(session.user.id);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.error || 'Something went wrong.');
  }

  return payload;
}

async function loadPosts() {
  state.isLoading = true;
  state.error = '';
  renderFeed();

  try {
    const posts = await apiFetch('/posts');
    state.posts = Array.isArray(posts) ? posts.map(normalizePost) : [];
  } catch (error) {
    state.error = error.message || 'Could not load posts.';
  } finally {
    state.isLoading = false;
    render();
  }
}

async function loadComments(postId, force = false) {
  if (!force && state.commentsByPost[postId]) return;
  if (state.commentLoadingIds.has(postId)) return;

  state.commentLoadingIds.add(postId);
  state.commentErrors.delete(postId);
  render();

  try {
    const comments = await apiFetch(`/posts/${postId}/comments`);
    state.commentsByPost = {
      ...state.commentsByPost,
      [postId]: Array.isArray(comments) ? comments.map(normalizeComment) : [],
    };
  } catch (error) {
    state.commentErrors.set(postId, error.message || 'Could not load comments.');
  } finally {
    state.commentLoadingIds.delete(postId);
    render();
  }
}

async function submitPost(event) {
  event.preventDefault();

  if (!state.user) {
    openAuth('login');
    return;
  }

  const form = event.target;
  const formData = new FormData(form);
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const flair = String(formData.get('flair') || 'General');
  const message = form.querySelector('[data-form-message]');
  const button = form.querySelector('button[type="submit"]');

  if (!title || !content) {
    message.textContent = 'Add a title and the details before posting.';
    message.className = 'form-message error';
    return;
  }

  button.disabled = true;
  message.textContent = 'Posting...';
  message.className = 'form-message';

  try {
    const created = await apiFetch('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        flair,
        user_id: state.user.id,
      }),
    });
    state.posts = [normalizePost(created), ...state.posts];
    form.reset();
    message.textContent = 'Posted.';
    message.className = 'form-message success';
    render();
  } catch (error) {
    message.textContent = error.message || 'Could not create post.';
    message.className = 'form-message error';
  } finally {
    button.disabled = false;
  }
}

async function votePost(postId, direction = 'up') {
  if (state.votingIds.has(postId)) return;
  if (!state.user) {
    state.voteErrors.set(postId, 'Log in to vote.');
    openAuth('login');
    render();
    return;
  }

  if (getUserVote(postId)) {
    state.voteErrors.set(postId, 'You already voted.');
    render();
    return;
  }

  const endpoint = direction === 'down' ? 'downvote' : 'vote';
  state.votingIds.add(postId);
  state.voteErrors.delete(postId);
  render();

  try {
    const updated = await apiFetch(`/posts/${postId}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify({ user_id: state.user.id }),
    });
    const nextPost = normalizePost(updated);
    state.posts = state.posts.map((post) => post.id === postId ? nextPost : post);
    saveUserVote(postId, direction);
  } catch (error) {
    state.voteErrors.set(postId, error.message || 'Could not update this vote.');
  } finally {
    state.votingIds.delete(postId);
    render();
  }
}

async function submitComment(event) {
  event.preventDefault();

  if (!state.user) {
    openAuth('login');
    return;
  }

  const form = event.target;
  const postId = form.dataset.commentPostId;
  const content = String(new FormData(form).get('content') || '').trim();

  if (!content) {
    state.commentErrors.set(postId, 'Write a comment first.');
    renderPostDetail();
    return;
  }

  state.commentSubmittingIds.add(postId);
  state.commentErrors.delete(postId);
  renderPostDetail();

  try {
    const created = await apiFetch(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        user_id: state.user.id,
      }),
    });
    const nextComment = normalizeComment(created);
    state.commentsByPost = {
      ...state.commentsByPost,
      [postId]: [...(state.commentsByPost[postId] || []), nextComment],
    };
    form.reset();
  } catch (error) {
    state.commentErrors.set(postId, error.message || 'Could not post comment.');
  } finally {
    state.commentSubmittingIds.delete(postId);
    renderPostDetail();
  }
}

async function submitForgotPassword(event) {
  event.preventDefault();

  const form = event.target;
  const email = String(new FormData(form).get('email') || '').trim().toLowerCase();

  if (!isValidEmail(email)) {
    state.reset = {
      ...state.reset,
      email,
      message: 'Enter a valid email address.',
      status: 'error',
    };
    renderForgotPage();
    return;
  }

  state.reset = {
    ...state.reset,
    email,
    isLoading: true,
    message: 'Sending reset code...',
    status: '',
  };
  renderForgotPage();

  try {
    const payload = await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    state.reset = {
      ...state.reset,
      email,
      isLoading: false,
      message: payload?.message || 'Reset code sent to your email.',
      status: 'success',
      step: 'reset',
    };
  } catch (error) {
    state.reset = {
      ...state.reset,
      isLoading: false,
      message: error.message || 'Could not send a reset code.',
      status: 'error',
    };
  } finally {
    renderForgotPage();
  }
}

async function submitPasswordReset(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const code = String(formData.get('code') || '').trim();
  const newPassword = String(formData.get('newPassword') || '');

  if (!isValidEmail(email)) {
    state.reset = { ...state.reset, email, message: 'Enter a valid email address.', status: 'error' };
    renderForgotPage();
    return;
  }

  if (!/^\d{6}$/.test(code)) {
    state.reset = { ...state.reset, email, message: 'Enter the 6-digit reset code.', status: 'error' };
    renderForgotPage();
    return;
  }

  if (newPassword.length < 6) {
    state.reset = { ...state.reset, email, message: 'Use at least 6 characters for the new password.', status: 'error' };
    renderForgotPage();
    return;
  }

  state.reset = {
    ...state.reset,
    email,
    isLoading: true,
    message: 'Resetting password...',
    status: '',
  };
  renderForgotPage();

  try {
    const payload = await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    });
    state.reset = {
      email: '',
      isLoading: false,
      message: payload?.message || 'Password reset successfully.',
      status: 'success',
      step: 'done',
    };
  } catch (error) {
    state.reset = {
      ...state.reset,
      isLoading: false,
      message: error.message || 'Could not reset the password.',
      status: 'error',
    };
  } finally {
    renderForgotPage();
  }
}

async function submitAuth(event) {
  event.preventDefault();

  const username = elements.authUsername.value.trim();
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value;

  elements.authSubmit.disabled = true;
  elements.authMessage.textContent = state.authMode === 'login' ? 'Logging in...' : 'Creating account...';
  elements.authMessage.className = 'form-message';

  try {
    const path = state.authMode === 'login' ? '/auth/login' : '/auth/register';
    const body = state.authMode === 'login' ? { email, password } : { username, email, password };
    const session = await apiFetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    saveSession(session);
    closeAuth();
    render();
  } catch (error) {
    elements.authMessage.textContent = error.message || 'Authentication failed.';
    elements.authMessage.className = 'form-message error';
  } finally {
    elements.authSubmit.disabled = false;
  }
}

function getFilteredPosts() {
  const query = state.search.trim().toLowerCase();

  const filtered = state.posts.filter((post) => {
    const matchesFlair = state.filter === 'All' || post.flair === state.filter;
    const haystack = `${post.title} ${post.content} ${post.flair} ${getAuthor(post)}`.toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesFlair && matchesSearch;
  });

  return filtered.sort((a, b) => {
    if (state.sort === 'new') return new Date(b.created_at) - new Date(a.created_at);
    if (state.sort === 'old') return new Date(a.created_at) - new Date(b.created_at);
    return (b.votes - a.votes) || (new Date(b.created_at) - new Date(a.created_at));
  });
}

function getCounts() {
  return FLAIRS.reduce((counts, flair) => {
    counts[flair.name] = flair.name === 'All'
      ? state.posts.length
      : state.posts.filter((post) => post.flair === flair.name).length;
    return counts;
  }, {});
}

function renderFilters() {
  const counts = getCounts();
  const html = FLAIRS.map((flair) => {
    const active = state.filter === flair.name ? ' active' : '';
    return `
      <button class="nav-item${active}" type="button" data-filter="${escapeHtml(flair.name)}">
        <span><i class="dot ${flair.colorClass}" aria-hidden="true"></i>${escapeHtml(flair.label)}</span>
        <span class="nav-count">${counts[flair.name] || 0}</span>
      </button>
    `;
  }).join('');

  elements.sideFilters.innerHTML = html;
  elements.mobileFilters.innerHTML = html;
  elements.mobileFilters.classList.toggle('open', state.menuOpen);
  elements.activeFilterLabel.textContent = getFlair(state.filter).label;
}

function renderTopbar() {
  if (state.user) {
    elements.topbarActions.innerHTML = `
      <span class="chip">${escapeHtml(state.user.username)}</span>
      <button class="ghost-button" type="button" data-sign-out>Sign out</button>
    `;
    return;
  }

  elements.topbarActions.innerHTML = `
    <button class="ghost-button" type="button" data-open-auth="login">Log in</button>
    <button class="primary-button" type="button" data-open-auth="register">Join</button>
  `;
}

function renderWelcomeMetrics() {
  const totalVotes = state.posts.reduce((sum, post) => sum + post.votes, 0);
  const activeFlairs = new Set(state.posts.map((post) => post.flair)).size;
  elements.welcomeMetrics.innerHTML = `
    <div class="metric"><strong>${state.posts.length}</strong><span>posts</span></div>
    <div class="metric"><strong>${totalVotes}</strong><span>votes</span></div>
    <div class="metric"><strong>${activeFlairs}</strong><span>topics</span></div>
  `;
}

function renderCompose() {
  if (!state.user) {
    elements.composeCard.innerHTML = `
      <div class="compose-signed-out">
        <div>
          <h2>Join the college conversation</h2>
          <p class="compose-copy">Ask about admissions, compare campuses, or share what you wish you knew earlier.</p>
        </div>
        <button class="primary-button" type="button" data-open-auth="register">Create account</button>
      </div>
    `;
    return;
  }

  const flairOptions = FLAIRS
    .filter((flair) => flair.name !== 'All')
    .map((flair) => `<option value="${escapeHtml(flair.name)}">${escapeHtml(flair.label)}</option>`)
    .join('');

  elements.composeCard.innerHTML = `
    <form class="compose-form" id="composeForm">
      <div>
        <h2>Start a post</h2>
        <p class="compose-copy">Posting as ${escapeHtml(state.user.username)}</p>
      </div>
      <div class="compose-grid">
        <label class="field-shell">
          <span>Title</span>
          <input class="input-box" name="title" maxlength="120" placeholder="What do you want to ask or share?" />
        </label>
        <label class="field-shell">
          <span>Topic</span>
          <select name="flair">${flairOptions}</select>
        </label>
      </div>
      <label class="field-shell">
        <span>Details</span>
        <textarea name="content" maxlength="1800" placeholder="Add context, college names, deadlines, scores, tradeoffs, or what you already tried."></textarea>
      </label>
      <div class="compose-footer">
        <p class="form-message" data-form-message></p>
        <button class="primary-button" type="submit">Post</button>
      </div>
    </form>
  `;
}

function renderFeed() {
  if (state.isLoading) {
    elements.feedList.innerHTML = `
      <div class="empty-state">
        <h2>Loading posts...</h2>
        <p>Fetching the latest student discussions.</p>
      </div>
    `;
    return;
  }

  if (state.error) {
    elements.feedList.innerHTML = `
      <div class="error-state">
        <h2>Could not load the feed</h2>
        <p>${escapeHtml(state.error)}</p>
        <button class="primary-button" type="button" data-refresh>Try again</button>
      </div>
    `;
    return;
  }

  const posts = getFilteredPosts();

  if (!posts.length) {
    elements.feedList.innerHTML = `
      <div class="empty-state">
        <h2>No posts here yet</h2>
        <p>${state.search ? 'Try a different search or clear the filter.' : 'Be the first student to start this lane.'}</p>
        ${state.user ? '' : '<button class="primary-button" type="button" data-open-auth="register">Join Stanchat</button>'}
      </div>
    `;
    return;
  }

  elements.feedList.innerHTML = posts.map(renderPostCard).join('');
}

function renderVoteControls(post) {
  const voting = state.votingIds.has(post.id);
  const voteError = state.voteErrors.get(post.id);
  const userVote = getUserVote(post.id);
  const disabled = voting || Boolean(userVote);
  const votedText = userVote === 'up' ? 'Upvoted' : 'Downvoted';

  return `
    <div class="vote-stack">
      <button class="vote-button ${userVote === 'up' ? 'selected' : ''}" type="button" data-vote-id="${escapeHtml(post.id)}" data-vote-direction="up" ${disabled ? 'disabled' : ''} aria-label="Upvote ${escapeHtml(post.title)}">▲</button>
      <span class="vote-count">${post.votes}</span>
      <button class="vote-button down ${userVote === 'down' ? 'selected' : ''}" type="button" data-vote-id="${escapeHtml(post.id)}" data-vote-direction="down" ${disabled ? 'disabled' : ''} aria-label="Downvote ${escapeHtml(post.title)}">▼</button>
      ${userVote ? `<p class="vote-note">${votedText}</p>` : ''}
      ${voteError ? `<p class="vote-error">${escapeHtml(voteError)}</p>` : ''}
    </div>
  `;
}

function renderPostCard(post) {
  const flair = getFlair(post.flair);
  const excerpt = post.content.length > 260 ? `${post.content.slice(0, 260)}...` : post.content;
  const comments = state.commentsByPost[post.id];
  const commentLabel = comments ? `${comments.length} comments` : 'Comments';

  return `
    <article class="post-card" data-post-id="${escapeHtml(post.id)}">
      ${renderVoteControls(post)}
      <div class="post-content">
        <div class="post-meta">
          <span class="flair-pill"><i class="flair-dot ${flair.colorClass}" aria-hidden="true"></i>${escapeHtml(flair.label)}</span>
          <span>${escapeHtml(getAuthor(post))}</span>
          <span>•</span>
          <time datetime="${escapeHtml(post.created_at)}">${formatDate(post.created_at)}</time>
        </div>
        <button class="post-title" type="button" data-open-post="${escapeHtml(post.id)}">${escapeHtml(post.title)}</button>
        <p class="post-excerpt">${escapeHtml(excerpt)}</p>
        <div class="post-actions">
          <button class="chip chip-button" type="button" data-open-post="${escapeHtml(post.id)}">${commentLabel}</button>
          <span class="chip">${post.content.length} chars</span>
        </div>
      </div>
    </article>
  `;
}

function renderProfile() {
  if (!state.user) {
    elements.profilePanel.innerHTML = `
      <div class="profile-card">
        <div class="profile-head">
          <span class="avatar">S</span>
          <div>
            <h2>Your Stanchat seat</h2>
            <p class="profile-meta">Log in to post questions and vote in the feed.</p>
          </div>
        </div>
        <button class="primary-button" type="button" data-open-auth="login">Log in</button>
      </div>
    `;
    return;
  }

  const ownPosts = state.posts.filter((post) => post.user_id === state.user.id).length;
  elements.profilePanel.innerHTML = `
    <div class="profile-card">
      <div class="profile-head">
        <span class="avatar">${escapeHtml(state.user.username.slice(0, 1).toUpperCase())}</span>
        <div>
          <h2>${escapeHtml(state.user.username)}</h2>
          <p class="profile-meta">${escapeHtml(state.user.email)}</p>
        </div>
      </div>
      <div class="metric">
        <strong>${ownPosts}</strong>
        <span>posts from you</span>
      </div>
    </div>
  `;
}

function renderTrends() {
  const counts = getCounts();
  const trends = FLAIRS
    .filter((flair) => flair.name !== 'All')
    .map((flair) => ({ ...flair, count: counts[flair.name] || 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  elements.trendList.innerHTML = trends.map((flair) => `
    <button class="trend-item text-button" type="button" data-filter="${escapeHtml(flair.name)}">
      <strong><i class="flair-dot ${flair.colorClass}" aria-hidden="true"></i>${escapeHtml(flair.label)}</strong>
      <span>${flair.count}</span>
    </button>
  `).join('');
}

function renderCommentsSection(postId) {
  const comments = state.commentsByPost[postId] || [];
  const isLoading = state.commentLoadingIds.has(postId);
  const isSubmitting = state.commentSubmittingIds.has(postId);
  const error = state.commentErrors.get(postId);
  const commentsHtml = comments.length
    ? comments.map((comment) => `
      <article class="comment-item">
        <div class="comment-avatar">${escapeHtml(getCommentAuthor(comment).slice(0, 1).toUpperCase())}</div>
        <div>
          <div class="comment-meta">
            <strong>${escapeHtml(getCommentAuthor(comment))}</strong>
            <time datetime="${escapeHtml(comment.created_at)}">${formatDate(comment.created_at)}</time>
          </div>
          <p>${escapeHtml(comment.content)}</p>
        </div>
      </article>
    `).join('')
    : '';

  return `
    <section class="comments-section">
      <div class="comments-heading">
        <div>
          <p class="eyebrow">Discussion</p>
          <h2>Comments</h2>
        </div>
        <button class="ghost-button" type="button" data-refresh-comments="${escapeHtml(postId)}" ${isLoading ? 'disabled' : ''}>Refresh</button>
      </div>
      ${isLoading ? '<p class="comment-state">Loading comments...</p>' : ''}
      ${error ? `<p class="form-message error">${escapeHtml(error)}</p>` : ''}
      ${!isLoading && !comments.length ? '<p class="reply-empty">No comments yet. Start the discussion.</p>' : ''}
      ${comments.length ? `<div class="comment-list">${commentsHtml}</div>` : ''}
      ${state.user ? `
        <form class="comment-form" data-comment-post-id="${escapeHtml(postId)}">
          <label class="field-shell">
            <span>Add a comment</span>
            <textarea name="content" maxlength="1000" placeholder="Share a helpful answer, follow-up, or campus detail."></textarea>
          </label>
          <div class="comment-actions">
            <span class="profile-meta">Posting as ${escapeHtml(state.user.username)}</span>
            <button class="primary-button" type="submit" ${isSubmitting ? 'disabled' : ''}>${isSubmitting ? 'Posting...' : 'Comment'}</button>
          </div>
        </form>
      ` : `
        <div class="comment-login">
          <p>Log in to add a comment.</p>
          <button class="primary-button" type="button" data-open-auth="login">Log in</button>
        </div>
      `}
    </section>
  `;
}

function renderPostDetail() {
  const post = state.posts.find((item) => item.id === state.selectedPostId);
  if (!post) return;

  const flair = getFlair(post.flair);

  elements.postDetail.innerHTML = `
    <button class="close-button" type="button" data-close-post aria-label="Close">×</button>
    <div class="detail-inner">
      ${renderVoteControls(post)}
      <div>
        <div class="post-meta">
          <span class="flair-pill"><i class="flair-dot ${flair.colorClass}" aria-hidden="true"></i>${escapeHtml(flair.label)}</span>
          <span>${escapeHtml(getAuthor(post))}</span>
          <span>•</span>
          <time datetime="${escapeHtml(post.created_at)}">${formatDate(post.created_at)}</time>
        </div>
        <h2 class="detail-title">${escapeHtml(post.title)}</h2>
        <p class="detail-body">${escapeHtml(post.content)}</p>
      </div>
    </div>
    <div class="detail-footer">
      ${renderCommentsSection(post.id)}
    </div>
  `;
}

function renderForgotPage() {
  const { email, isLoading, message, status, step } = state.reset;
  const messageClass = status ? `form-message ${status}` : 'form-message';

  if (step === 'done') {
    elements.forgotPage.innerHTML = `
      <section class="forgot-card">
        <p class="eyebrow">Password reset</p>
        <h1>You can log in now.</h1>
        <p class="forgot-copy">${escapeHtml(message || 'Password reset successfully.')}</p>
        <div class="forgot-actions">
          <button class="ghost-button" type="button" data-go-home>Back to feed</button>
          <button class="primary-button" type="button" data-open-auth="login">Log in</button>
        </div>
      </section>
    `;
    return;
  }

  const isResetStep = step === 'reset';
  elements.forgotPage.innerHTML = `
    <section class="forgot-card">
      <p class="eyebrow">${isResetStep ? 'Check your email' : 'Account recovery'}</p>
      <h1>${isResetStep ? 'Enter your reset code.' : 'Reset your password.'}</h1>
      <p class="forgot-copy">
        ${isResetStep
          ? 'Use the 6-digit code we sent, then choose a new password.'
          : 'Enter the email on your Stanchat account and we will send you a reset code.'}
      </p>
      <form class="stacked-form" id="${isResetStep ? 'resetPasswordForm' : 'forgotPasswordForm'}" novalidate>
        <label>
          <span>Email</span>
          <input name="email" type="email" autocomplete="email" value="${escapeHtml(email)}" required />
        </label>
        ${isResetStep ? `
          <label>
            <span>Reset code</span>
            <input name="code" inputmode="numeric" maxlength="6" placeholder="123456" required />
          </label>
          <label>
            <span>New password</span>
            <input name="newPassword" type="password" autocomplete="new-password" minlength="6" required />
          </label>
        ` : ''}
        <p class="${messageClass}">${escapeHtml(message)}</p>
        <div class="forgot-actions">
          <button class="ghost-button" type="button" data-go-home>Back to feed</button>
          <button class="primary-button" type="submit" ${isLoading ? 'disabled' : ''}>
            ${isLoading ? 'Working...' : isResetStep ? 'Reset password' : 'Send code'}
          </button>
        </div>
      </form>
    </section>
  `;
}

function renderPage() {
  const isForgot = isForgotPasswordPage();
  const homeSections = [
    elements.mobileFilters,
    elements.welcomeBand,
    elements.composeCard,
    elements.feedTools,
    elements.feedList,
  ];

  elements.forgotPage.hidden = !isForgot;
  homeSections.forEach((section) => {
    section.classList.toggle('home-view-hidden', isForgot);
  });

  if (isForgot) renderForgotPage();
}

function renderAuthModal() {
  const isLogin = state.authMode === 'login';
  elements.authEyebrow.textContent = isLogin ? 'Welcome back' : 'New account';
  elements.authTitle.textContent = isLogin ? 'Log in to Stanchat' : 'Create your Stanchat account';
  elements.authSubmit.textContent = isLogin ? 'Log in' : 'Create account';
  elements.authModeToggle.textContent = isLogin ? 'Create a new account' : 'I already have an account';
  elements.usernameField.style.display = isLogin ? 'none' : 'grid';
  elements.authUsername.required = !isLogin;
  elements.forgotPasswordLink.hidden = !isLogin;
}

function render() {
  renderFilters();
  renderTopbar();
  renderWelcomeMetrics();
  renderCompose();
  renderFeed();
  renderProfile();
  renderTrends();
  renderAuthModal();
  if (state.selectedPostId) renderPostDetail();
  renderPage();
}

function openAuth(mode = 'login') {
  state.authMode = mode;
  elements.authMessage.textContent = '';
  elements.authForm.reset();
  renderAuthModal();
  elements.authModal.classList.add('open');
  elements.authModal.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    (mode === 'register' ? elements.authUsername : elements.authEmail).focus();
  }, 0);
}

function closeAuth() {
  elements.authModal.classList.remove('open');
  elements.authModal.setAttribute('aria-hidden', 'true');
}

function openPost(postId) {
  state.selectedPostId = postId;
  renderPostDetail();
  elements.postModal.classList.add('open');
  elements.postModal.setAttribute('aria-hidden', 'false');
  loadComments(postId);
}

function closePost() {
  state.selectedPostId = null;
  elements.postModal.classList.remove('open');
  elements.postModal.setAttribute('aria-hidden', 'true');
}

function setFilter(filter) {
  state.filter = filter;
  state.menuOpen = false;
  render();
}

function goToForgotPassword() {
  closeAuth();
  if (!isForgotPasswordPage()) {
    history.pushState({}, '', '/forgot-password');
  }
  render();
}

function goHome() {
  if (isForgotPasswordPage()) {
    history.pushState({}, '', '/');
  }
  render();
}

function handleGlobalClick(event) {
  if (event.target.closest('[data-go-forgot]')) {
    goToForgotPassword();
    return;
  }

  if (event.target.closest('[data-go-home]')) {
    goHome();
    return;
  }

  const authButton = event.target.closest('[data-open-auth]');
  if (authButton) {
    openAuth(authButton.dataset.openAuth);
    return;
  }

  if (event.target.closest('[data-sign-out]')) {
    saveSession(null);
    render();
    return;
  }

  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    setFilter(filterButton.dataset.filter);
    return;
  }

  if (event.target.closest('[data-refresh]')) {
    loadPosts();
    return;
  }
}

function bindEvents() {
  document.addEventListener('click', handleGlobalClick);

  elements.menuButton.addEventListener('click', () => {
    state.menuOpen = !state.menuOpen;
    renderFilters();
  });

  elements.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderFeed();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderFeed();
  });

  elements.refreshButton.addEventListener('click', loadPosts);
  elements.authForm.addEventListener('submit', submitAuth);

  elements.authModeToggle.addEventListener('click', () => {
    state.authMode = state.authMode === 'login' ? 'register' : 'login';
    elements.authMessage.textContent = '';
    renderAuthModal();
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeAuth);
  });

  document.querySelectorAll('[data-close-post]').forEach((button) => {
    button.addEventListener('click', closePost);
  });

  elements.composeCard.addEventListener('submit', (event) => {
    if (event.target.id === 'composeForm') submitPost(event);
  });

  elements.forgotPage.addEventListener('submit', (event) => {
    if (event.target.id === 'forgotPasswordForm') submitForgotPassword(event);
    if (event.target.id === 'resetPasswordForm') submitPasswordReset(event);
  });

  elements.feedList.addEventListener('click', (event) => {
    const voteButton = event.target.closest('[data-vote-id]');
    if (voteButton) {
      event.stopPropagation();
      votePost(voteButton.dataset.voteId, voteButton.dataset.voteDirection);
      return;
    }

    const openButton = event.target.closest('[data-open-post]');
    if (openButton) {
      openPost(openButton.dataset.openPost);
    }
  });

  elements.postDetail.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-close-post]');
    if (closeButton) {
      closePost();
      return;
    }

    const refreshCommentsButton = event.target.closest('[data-refresh-comments]');
    if (refreshCommentsButton) {
      loadComments(refreshCommentsButton.dataset.refreshComments, true);
      return;
    }

    const voteButton = event.target.closest('[data-vote-id]');
    if (voteButton) votePost(voteButton.dataset.voteId, voteButton.dataset.voteDirection);
  });

  elements.postDetail.addEventListener('submit', (event) => {
    if (event.target.matches('.comment-form')) submitComment(event);
  });

  window.addEventListener('popstate', render);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeAuth();
    closePost();
  });
}

loadSession();
bindEvents();
render();
loadPosts();
