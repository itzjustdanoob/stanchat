const API_ROOT = `${window.location.origin}/api`;
const STORAGE_KEY = 'stanchat.session';

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
  posts: [],
  search: '',
  selectedPostId: null,
  sort: 'hot',
  user: null,
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

function saveSession(session) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY);
    state.user = null;
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  state.user = session.user;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const session = JSON.parse(raw);
    if (session && session.user) state.user = session.user;
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

async function votePost(postId) {
  if (state.votingIds.has(postId)) return;

  state.votingIds.add(postId);
  render();

  try {
    const updated = await apiFetch(`/posts/${postId}/vote`, { method: 'POST' });
    const nextPost = normalizePost(updated);
    state.posts = state.posts.map((post) => post.id === postId ? nextPost : post);
  } catch (error) {
    state.error = error.message || 'Could not vote on that post.';
  } finally {
    state.votingIds.delete(postId);
    render();
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

function renderPostCard(post) {
  const flair = getFlair(post.flair);
  const voting = state.votingIds.has(post.id);
  const excerpt = post.content.length > 260 ? `${post.content.slice(0, 260)}...` : post.content;

  return `
    <article class="post-card" data-post-id="${escapeHtml(post.id)}">
      <div class="vote-stack">
        <button class="vote-button" type="button" data-vote-id="${escapeHtml(post.id)}" ${voting ? 'disabled' : ''} aria-label="Upvote ${escapeHtml(post.title)}">▲</button>
        <span class="vote-count">${post.votes}</span>
      </div>
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
          <span class="chip">Discussion</span>
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

function renderPostDetail() {
  const post = state.posts.find((item) => item.id === state.selectedPostId);
  if (!post) return;

  const flair = getFlair(post.flair);
  const voting = state.votingIds.has(post.id);

  elements.postDetail.innerHTML = `
    <button class="close-button" type="button" data-close-post aria-label="Close">×</button>
    <div class="detail-inner">
      <div class="vote-stack">
        <button class="vote-button" type="button" data-vote-id="${escapeHtml(post.id)}" ${voting ? 'disabled' : ''}>▲</button>
        <span class="vote-count">${post.votes}</span>
      </div>
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
      <h2>Replies</h2>
      <p class="reply-empty">No replies yet.</p>
    </div>
  `;
}

function renderAuthModal() {
  const isLogin = state.authMode === 'login';
  elements.authEyebrow.textContent = isLogin ? 'Welcome back' : 'New account';
  elements.authTitle.textContent = isLogin ? 'Log in to Stanchat' : 'Create your Stanchat account';
  elements.authSubmit.textContent = isLogin ? 'Log in' : 'Create account';
  elements.authModeToggle.textContent = isLogin ? 'Create a new account' : 'I already have an account';
  elements.usernameField.style.display = isLogin ? 'none' : 'grid';
  elements.authUsername.required = !isLogin;
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

function handleGlobalClick(event) {
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

  elements.feedList.addEventListener('click', (event) => {
    const voteButton = event.target.closest('[data-vote-id]');
    if (voteButton) {
      event.stopPropagation();
      votePost(voteButton.dataset.voteId);
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

    const voteButton = event.target.closest('[data-vote-id]');
    if (voteButton) votePost(voteButton.dataset.voteId);
  });

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