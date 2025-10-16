// ============================
// Data Storage and Configuration
// ============================

const STORAGE_KEYS = {
    MAGAZINES: 'life_in_pahadi_magazines',
    LIFESTYLE: 'life_in_pahadi_lifestyle',
    CULTURE: 'life_in_pahadi_culture',
    ADVENTURE: 'life_in_pahadi_adventure',
    ENVIRONMENT: 'life_in_pahadi_environment',
    PHOTOS: 'life_in_pahadi_photos',
    VIDEOS: 'life_in_pahadi_videos',
    VIEWS_360: 'life_in_pahadi_360',
    ART: 'life_in_pahadi_art',
    SUBSCRIBERS: 'life_in_pahadi_subscribers',
    INTERACTIONS: 'life_in_pahadi_interactions'
};

const ADMIN_PASSWORD_KEY = 'life_in_pahadi_admin_password';
const DEFAULT_PASSWORD = 'pahadi2024';

const backgroundImages = [
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%2303396c'/><path d='M0,450 Q800,150 1600,450 L1600,900 L0,900 Z' fill='%235a8c3c'/><path d='M0,500 Q800,200 1600,500 L1600,900 L0,900 Z' fill='%238db860'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%231e3d59'/><path d='M0,400 Q800,100 1600,400 L1600,900 L0,900 Z' fill='%235a8c3c'/><path d='M0,500 Q800,250 1600,500 L1600,900 L0,900 Z' fill='%238db860'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%238B4513'/><path d='M0,350 Q800,50 1600,350 L1600,900 L0,900 Z' fill='%235a8c3c'/><path d='M0,450 Q800,150 1600,450 L1600,900 L0,900 Z' fill='%238db860'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%2303396c'/><path d='M0,300 Q800,50 1600,300 L1600,900 L0,900 Z' fill='%231e3d59'/><path d='M0,400 Q800,100 1600,400 L1600,900 L0,900 Z' fill='%235a8c3c'/></svg>"
];

const CONTENT_TYPES = {
    magazine: {
        key: 'MAGAZINES',
        formId: 'magazine-form',
        fields: ['magazine-title', 'magazine-description', 'magazine-cover', 'magazine-date', 'magazine-content'],
        displayName: 'Magazine Issue',
        containerId: 'magazine-items',
        storageKey: STORAGE_KEYS.MAGAZINES,
        renderFunction: renderContentCards,
        renderContainer: 'magazine-container',
        category: null
    },
    lifestyle: {
        key: 'LIFESTYLE',
        formId: 'lifestyle-form',
        fields: ['lifestyle-title', 'lifestyle-description', 'lifestyle-image', 'lifestyle-content'],
        displayName: 'Lifestyle Content',
        containerId: 'lifestyle-items',
        storageKey: STORAGE_KEYS.LIFESTYLE,
        renderFunction: renderContentCards,
        renderContainer: 'lifestyle-content',
        category: 'Lifestyle'
    },
    culture: {
        key: 'CULTURE',
        formId: 'culture-form',
        fields: ['culture-title', 'culture-description', 'culture-image', 'culture-content'],
        displayName: 'Cultural Content',
        containerId: 'culture-items',
        storageKey: STORAGE_KEYS.CULTURE,
        renderFunction: renderContentCards,
        renderContainer: 'culture-content',
        category: 'Culture'
    },
    adventure: {
        key: 'ADVENTURE',
        formId: 'adventure-form',
        fields: ['adventure-title', 'adventure-description', 'adventure-image', 'adventure-content'],
        displayName: 'Adventure Content',
        containerId: 'adventure-items',
        storageKey: STORAGE_KEYS.ADVENTURE,
        renderFunction: renderContentCards,
        renderContainer: 'adventure-content',
        category: 'Adventure'
    },
    environment: {
        key: 'ENVIRONMENT',
        formId: 'environment-form',
        fields: ['environment-title', 'environment-description', 'environment-image', 'environment-content'],
        displayName: 'Environment Content',
        containerId: 'environment-items',
        storageKey: STORAGE_KEYS.ENVIRONMENT,
        renderFunction: renderContentCards,
        renderContainer: 'environment-content',
        category: 'Environment'
    },
    photos: {
        key: 'PHOTOS',
        formId: 'photos-form',
        fields: ['photo-title', 'photo-description', 'photo-url'],
        displayName: 'Photo',
        containerId: 'photo-items',
        storageKey: STORAGE_KEYS.PHOTOS,
        renderFunction: renderGalleryItems,
        renderContainer: 'photos-content',
        category: 'photos'
    },
    videos: {
        key: 'VIDEOS',
        formId: 'videos-form',
        fields: ['video-title', 'video-description', 'video-url', 'video-thumbnail'],
        displayName: 'Video',
        containerId: 'video-items',
        storageKey: STORAGE_KEYS.VIDEOS,
        renderFunction: renderGalleryItems,
        renderContainer: 'videos-content',
        category: 'videos'
    },
    views360: {
        key: 'VIEWS_360',
        formId: 'views360-form',
        fields: ['views360-title', 'views360-description', 'views360-url'],
        displayName: '360° View',
        containerId: 'views360-items',
        storageKey: STORAGE_KEYS.VIEWS_360,
        renderFunction: renderGalleryItems,
        renderContainer: '360-content',
        category: '360'
    },
    art: {
        key: 'ART',
        formId: 'art-form',
        fields: ['art-title', 'art-description', 'art-url'],
        displayName: 'Art',
        containerId: 'art-items',
        storageKey: STORAGE_KEYS.ART,
        renderFunction: renderGalleryItems,
        renderContainer: 'art-content',
        category: 'art'
    }
};

// Global variables
let currentLightboxItems = null;
let currentLightboxIndex = -1;
let currentArticleId = null;

// ============================
// Core Initialization
// ============================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing Life in Pahadi...');
    initializeDOMReferences();
    initializeData();
    initializeCommonFeatures();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    initializePageSpecificFeatures(currentPage);
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Logout clicked');
            adminLogout();
        });
    } else {
        console.warn('Logout button not found');
    }
});

function initializeDOMReferences() {
    console.log('Initializing DOM references...');
    
    // Main site elements
    window.magazineContainer = document.getElementById('magazine-container');
    window.lifestyleGrid = document.getElementById('lifestyle-content')?.querySelector('.mountain-life-grid');
    window.cultureGrid = document.getElementById('culture-content')?.querySelector('.heritage-grid');
    window.adventureGrid = document.getElementById('adventure-content')?.querySelector('.adventure-grid');
    window.environmentGrid = document.getElementById('environment-content')?.querySelector('.mountain-life-grid');
    window.photosContent = document.getElementById('photos-content');
    window.videosContent = document.getElementById('videos-content');
    window.views360Content = document.getElementById('360-content');
    window.artContent = document.getElementById('art-content');
    window.contentTabs = document.querySelectorAll('.content-tab');
    window.galleryTabs = document.querySelectorAll('.gallery-tab');
    window.contentModal = document.getElementById('content-modal');
    window.closeModal = document.getElementById('close-modal');
    window.modalTitle = document.getElementById('modal-title');
    window.modalMeta = document.getElementById('modal-meta');
    window.modalBody = document.getElementById('modal-body');
    window.modalImage = document.getElementById('modal-image');
    window.heroBackgrounds = document.querySelectorAll('.hero-background');
    window.scrollToTopBtn = document.getElementById('scrollToTop');
    window.subscriptionConfirmation = document.getElementById('subscriptionConfirmation');
    window.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    window.mainNav = document.getElementById('mainNav');

    // Article interaction elements
    window.articleActions = document.getElementById('article-actions');
    window.likeBtn = document.getElementById('like-btn');
    window.shareBtn = document.getElementById('share-btn');
    window.viewsCount = document.getElementById('views-count');
    window.likesCount = document.getElementById('likes-count');
    window.sharesCount = document.getElementById('shares-count');
    window.shareModal = document.getElementById('share-modal');
    window.closeShareModal = document.getElementById('close-share-modal');
    window.shareOptions = document.querySelectorAll('.share-option');

    // Admin elements
    window.adminTabs = document.querySelectorAll('.admin-tab');
    window.adminForms = document.querySelectorAll('.admin-form');
    window.adminPasswordInput = document.getElementById('admin-password');
    window.loginError = document.getElementById('login-error');
    window.logoutBtn = document.getElementById('logout-btn');

    // Gallery Lightbox elements
    window.galleryLightbox = document.getElementById('gallery-lightbox');
    window.lightboxImage = document.getElementById('lightbox-image');
    window.lightboxVideo = document.getElementById('lightbox-video');
    window.lightboxTitle = document.getElementById('lightbox-title');
    window.lightboxDescription = document.getElementById('lightbox-description');
    window.lightboxClose = document.getElementById('lightbox-close');
    window.lightboxPrev = document.getElementById('lightbox-prev');
    window.lightboxNext = document.getElementById('lightbox-next');
    
    console.log('DOM references initialized');
}

function initializeData() {
    console.log('Initializing data storage...');
    
    Object.values(STORAGE_KEYS).forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
            console.log(`Initialized empty storage for: ${key}`);
        }
    });
    
    if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
        localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD);
        console.log('Default admin password set');
    }
    
    console.log('Data storage initialized');
}

function initializeCommonFeatures() {
    console.log('Initializing common features...');
    
    // Set current year in copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize common UI components
    if (mobileMenuBtn && mainNav) initMobileMenu();
    if (scrollToTopBtn) initScrollToTop();
    if (contentModal && closeModal) initModal();
    if (galleryLightbox) initGalleryLightbox();
    if (shareModal) initShareModal();
    
    initSmoothScrolling();
    initSubscriptionForm();
    
    console.log('Common features initialized');
}

function initializePageSpecificFeatures(currentPage) {
    console.log('Initializing page-specific features for:', currentPage);
    
    const pageConfig = {
        'index.html': initHomePage,
        'index.html': initHomePage,
        '': initHomePage,
        'Mountain Life.html': initMountainLifePage,
        'Gallery.html': initGalleryPage,
        'Admin.html': initAdminPage,
        'About Us.html': () => {} // About page doesn't need specific JS
    };

    const pageHandler = pageConfig[currentPage];
    if (pageHandler) {
        pageHandler();
    } else {
        console.log('Unknown page, trying to detect content...');
        detectAndInitializePage();
    }
}

function detectAndInitializePage() {
    if (document.getElementById('magazine-container')) {
        initHomePage();
    } else if (document.getElementById('lifestyle-content')) {
        initMountainLifePage();
    } else if (document.getElementById('photos-content')) {
        initGalleryPage();
    } else if (document.getElementById('admin-login-form')) {
        initAdminPage();
    }
}

// ============================
// Data Management
// ============================

function getData(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        return data;
    } catch (error) {
        console.error(`Error reading data from ${key}:`, error);
        return [];
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error saving data to ${key}:`, error);
        return false;
    }
}

// Data getter functions
function getMagazines() { return getData(STORAGE_KEYS.MAGAZINES); }
function getLifestyle() { return getData(STORAGE_KEYS.LIFESTYLE); }
function getCulture() { return getData(STORAGE_KEYS.CULTURE); }
function getAdventure() { return getData(STORAGE_KEYS.ADVENTURE); }
function getEnvironment() { return getData(STORAGE_KEYS.ENVIRONMENT); }
function getPhotos() { return getData(STORAGE_KEYS.PHOTOS); }
function getVideos() { return getData(STORAGE_KEYS.VIDEOS); }
function get360() { return getData(STORAGE_KEYS.VIEWS_360); }
function getArt() { return getData(STORAGE_KEYS.ART); }
function getSubscribers() { return getData(STORAGE_KEYS.SUBSCRIBERS); }
function getInteractions() { return getData(STORAGE_KEYS.INTERACTIONS); }

// ============================
// Article Interaction Functions
// ============================

function initArticleInteractions() {
    console.log('Initializing article interactions...');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            if (currentArticleId) {
                likeArticle(currentArticleId);
            }
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (currentArticleId) {
                openShareModal(currentArticleId);
            }
        });
    }
    
    console.log('Article interactions initialized');
}

function getArticleInteractions(articleId) {
    const interactions = getInteractions();
    const articleInteractions = interactions.find(i => i.articleId == articleId);
    
    if (!articleInteractions) {
        // Create default interactions if none exist
        const defaultInteractions = {
            articleId: parseInt(articleId),
            views: 0,
            likes: 0,
            shares: 0,
            likedBy: [],
            sharedBy: []
        };
        interactions.push(defaultInteractions);
        saveData(STORAGE_KEYS.INTERACTIONS, interactions);
        return defaultInteractions;
    }
    
    return articleInteractions;
}

function updateArticleInteractions(articleId, updates) {
    const interactions = getInteractions();
    const articleIndex = interactions.findIndex(i => i.articleId == articleId);
    
    if (articleIndex !== -1) {
        interactions[articleIndex] = { ...interactions[articleIndex], ...updates };
        return saveData(STORAGE_KEYS.INTERACTIONS, interactions);
    }
    
    return false;
}

function trackArticleView(articleId) {
    const interactions = getArticleInteractions(articleId);
    const newViews = interactions.views + 1;
    updateArticleInteractions(articleId, { views: newViews });
    
    // Update view count in modal if open
    if (viewsCount && currentArticleId == articleId) {
        viewsCount.textContent = newViews;
    }
    
    return newViews;
}

function likeArticle(articleId) {
    const interactions = getArticleInteractions(articleId);
    const userIdentifier = generateUserIdentifier();
    
    let newLikes = interactions.likes;
    let likedBy = [...interactions.likedBy];
    let isLiked = likedBy.includes(userIdentifier);
    
    if (isLiked) {
        // Unlike
        newLikes = Math.max(0, interactions.likes - 1);
        likedBy = likedBy.filter(id => id !== userIdentifier);
        if (likeBtn) likeBtn.classList.remove('liked');
    } else {
        // Like
        newLikes = interactions.likes + 1;
        likedBy.push(userIdentifier);
        if (likeBtn) likeBtn.classList.add('liked');
    }
    
    updateArticleInteractions(articleId, { 
        likes: newLikes, 
        likedBy: likedBy 
    });
    
    // Update like count in modal
    if (likesCount && currentArticleId == articleId) {
        likesCount.textContent = newLikes;
    }
    
    // Update card interactions
    updateCardInteractions(articleId, newLikes, interactions.views, interactions.shares);
    
    showNotification(isLiked ? 'Article unliked' : 'Article liked!', 'success');
    return newLikes;
}

function shareArticle(articleId, platform) {
    const interactions = getArticleInteractions(articleId);
    const userIdentifier = generateUserIdentifier();
    
    let newShares = interactions.shares;
    let sharedBy = [...interactions.sharedBy];
    
    if (!sharedBy.includes(userIdentifier)) {
        newShares = interactions.shares + 1;
        sharedBy.push(userIdentifier);
    }
    
    updateArticleInteractions(articleId, { 
        shares: newShares, 
        sharedBy: sharedBy 
    });
    
    // Update share count in modal
    if (sharesCount && currentArticleId == articleId) {
        sharesCount.textContent = newShares;
    }
    
    // Update card interactions
    updateCardInteractions(articleId, interactions.likes, interactions.views, newShares);
    
    // Perform platform-specific sharing
    performShare(articleId, platform);
    
    return newShares;
}

function generateUserIdentifier() {
    // Generate a simple user identifier (in a real app, use proper user authentication)
    let userId = localStorage.getItem('user_identifier');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_identifier', userId);
    }
    return userId;
}

function performShare(articleId, platform) {
    const article = findArticleById(articleId);
    if (!article) return;
    
    const url = window.location.href;
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(article.description);
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${title}&body=${text}%0A%0ARead more: ${url}`;
            break;
        default:
            return;
    }
    
    if (platform === 'email') {
        window.location.href = shareUrl;
    } else {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    showNotification(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, 'success');
}

function findArticleById(articleId) {
    // Search through all content types for the article
    for (const type in CONTENT_TYPES) {
        const items = getData(CONTENT_TYPES[type].storageKey);
        const article = items.find(item => item.id == articleId);
        if (article) return article;
    }
    return null;
}

function updateCardInteractions(articleId, likes, views, shares) {
    // Find and update the card with new interaction counts
    const card = document.querySelector(`[data-id="${articleId}"]`);
    if (card) {
        const likesElement = card.querySelector('.likes-count');
        const viewsElement = card.querySelector('.views-count');
        const sharesElement = card.querySelector('.shares-count');
        
        if (likesElement) likesElement.textContent = likes;
        if (viewsElement) viewsElement.textContent = views;
        if (sharesElement) sharesElement.textContent = shares;
    }
}

function initShareModal() {
    if (!shareModal || !closeShareModal) return;
    
    closeShareModal.addEventListener('click', function() {
        shareModal.style.display = 'none';
    });
    
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // Add click handlers for share options
    if (shareOptions) {
        shareOptions.forEach(option => {
            option.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                if (currentArticleId && platform) {
                    shareArticle(currentArticleId, platform);
                    shareModal.style.display = 'none';
                }
            });
        });
    }
}

function openShareModal(articleId) {
    if (shareModal) {
        shareModal.style.display = 'flex';
    }
}

// ============================
// Pin Points Functionality
// ============================

function createPinPoints(container, itemId, totalPoints = 3) {
    const pinPointsContainer = document.createElement('div');
    pinPointsContainer.className = 'pin-points';
    
    for (let i = 0; i < totalPoints; i++) {
        const pinPoint = document.createElement('div');
        pinPoint.className = 'pin-point';
        if (i === 0) pinPoint.classList.add('active');
        
        pinPoint.addEventListener('click', function() {
            // Remove active class from all points
            pinPointsContainer.querySelectorAll('.pin-point').forEach(point => {
                point.classList.remove('active');
            });
            // Add active class to clicked point
            this.classList.add('active');
            
            // Here you can add functionality for different pin points
            // For example, showing different content sections
            handlePinPointClick(itemId, i);
        });
        
        pinPointsContainer.appendChild(pinPoint);
    }
    
    container.appendChild(pinPointsContainer);
}

function handlePinPointClick(itemId, pointIndex) {
    console.log(`Pin point ${pointIndex} clicked for item ${itemId}`);
    
    // You can implement different behaviors based on the pin point clicked
    switch(pointIndex) {
        case 0:
            // First pin point - maybe show summary
            break;
        case 1:
            // Second pin point - maybe show key highlights
            break;
        case 2:
            // Third pin point - maybe show related content
            break;
    }
    
    showNotification(`Navigated to section ${pointIndex + 1}`, 'info');
}

// ============================
// Enhanced Rendering Functions
// ============================

function renderContentCards(items, container, type, category, emptyMessage) {
    if (!container) {
        console.warn('Container not found for rendering content cards');
        return;
    }
    
    console.log(`Rendering ${items.length} ${type} items to container`);
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>${emptyMessage}</h3>
                <p>Upload content using the Admin Panel</p>
            </div>
        `;
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${type}-card`;
        card.setAttribute('data-id', item.id);
        
        const interactions = getArticleInteractions(item.id);
        const badge = category ? `<div class="category-badge badge-${category.toLowerCase()}">${category}</div>` : '';
        const date = item.displayDate ? `<div class="card-date">${item.displayDate}</div>` : '';
        const imageSrc = item.cover || item.image || item.url;
        const imageContent = imageSrc ? 
            `<img src="${imageSrc}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">` : 
            `<div class="no-image">No Image</div>`;
        
        card.innerHTML = `
            <div class="card-image">
                ${imageContent}
            </div>
            <div class="card-content">
                ${badge}
                <h3>${item.title}</h3>
                ${date}
                <div class="card-description">${item.description}</div>
                <div class="article-interactions">
                    <div class="interaction-stats">
                        <span class="interaction-stat">
                            <span class="views-count">${interactions.views}</span> 👁️
                        </span>
                        <span class="interaction-stat">
                            <span class="likes-count">${interactions.likes}</span> ❤️
                        </span>
                        <span class="interaction-stat">
                            <span class="shares-count">${interactions.shares}</span> ↗️
                        </span>
                    </div>
                    <div class="interaction-buttons">
                        <button class="interaction-btn like-btn" data-id="${item.id}">❤️</button>
                        <button class="interaction-btn share-btn" data-id="${item.id}">↗️</button>
                    </div>
                </div>
                <button class="read-more" data-type="${type}" data-id="${item.id}">Read More</button>
            </div>
        `;
        container.appendChild(card);
        
        // Add pin points to card
        createPinPoints(card, item.id);
        
        // Add interaction button handlers
        const likeBtn = card.querySelector('.like-btn');
        const shareBtn = card.querySelector('.share-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemId = this.getAttribute('data-id');
                likeArticle(itemId);
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemId = this.getAttribute('data-id');
                openShareModal(itemId);
                currentArticleId = itemId;
            });
        }
    });
    
    const readMoreButtons = container.querySelectorAll('.read-more');
    console.log(`Added ${readMoreButtons.length} read more buttons`);
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const itemType = this.getAttribute('data-type');
            const itemId = this.getAttribute('data-id');
            console.log(`Opening modal for ${itemType} with ID: ${itemId}`);
            openContentModal(itemType, itemId);
        });
    });
}

function renderGalleryItems(items, container, type, emptyMessage) {
    if (!container) return;
    
    const grid = container.querySelector('.photo-grid') || container;
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>${emptyMessage}</h3>
                <p>Upload content using the Admin Panel</p>
            </div>
        `;
        return;
    }
    
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'photo-item';
        
        const mediaType = determineMediaType(item, type);
        const isVideo = mediaType === 'video' || mediaType === 'iframe';
        let mediaContent = '';
        
        if (isVideo) {
            const thumbnail = item.thumbnail || item.url || '';
            mediaContent = `
                <div class="video-thumbnail">
                    <img src="${thumbnail}" alt="${item.title}" loading="lazy" 
                         onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"200\" viewBox=\"0 0 300 200\"><rect width=\"300\" height=\"200\" fill=\"%23333\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"white\" font-family=\"Arial\" font-size=\"14\">Video</text></svg>'">
                    <div class="play-button">▶</div>
                    <div class="video-badge">VIDEO</div>
                </div>
            `;
        } else {
            mediaContent = `
                <img src="${item.url}" alt="${item.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"200\" viewBox=\"0 0 300 200\"><rect width=\"300\" height=\"200\" fill=\"%23333\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"white\" font-family=\"Arial\" font-size=\"14\">Image</text></svg>'">
            `;
        }
        
        itemElement.innerHTML = `
            ${mediaContent}
            <div class="photo-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        itemElement.addEventListener('click', function() {
            openLightbox(items, index, type);
        });
        
        grid.appendChild(itemElement);
    });
}

// ============================
// Enhanced Modal Functions
// ============================

function openContentModal(type, id) {
    console.log(`Opening content modal for ${type} with ID: ${id}`);
    
    let items = [];
    let item = null;
    
    const contentTypes = {
        'magazine': { data: getMagazines, meta: 'Published' },
        'lifestyle': { data: getLifestyle, meta: 'Lifestyle' },
        'culture': { data: getCulture, meta: 'Cultural Heritage' },
        'adventure': { data: getAdventure, meta: 'Adventure' },
        'environment': { data: getEnvironment, meta: 'Environment' }
    };
    
    if (contentTypes[type]) {
        items = contentTypes[type].data();
        item = items.find(i => i.id == id);
        
        if (item) {
            currentArticleId = id;
            
            // Track view
            const interactions = getArticleInteractions(id);
            trackArticleView(id);
            
            modalTitle.textContent = item.title;
            modalMeta.innerHTML = `<span>${contentTypes[type].meta}${item.displayDate ? ': ' + item.displayDate : ''}</span>`;
            modalImage.src = item.cover || item.image || '';
            modalBody.innerHTML = item.content || 'No content available';
            
            // Update interaction counts in modal
            if (viewsCount) viewsCount.textContent = interactions.views + 1; // +1 for current view
            if (likesCount) likesCount.textContent = interactions.likes;
            if (sharesCount) sharesCount.textContent = interactions.shares;
            
            // Initialize article interactions
            initArticleInteractions();
            
            contentModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully');
        } else {
            console.error('Item not found for modal:', type, id);
            showNotification('Content not found', 'error');
        }
    } else {
        console.error('Unknown content type for modal:', type);
    }
}

// ============================
// Enhanced Admin Dashboard Functions
// ============================

function updateAdminDashboard() {
    console.log('Updating admin dashboard...');
    updateAdminStatistics();
    updateRecentActivity();
    updateContentOverview();
    updateStorageUsage();
}

function updateRecentActivity() {
    const recentActivityList = document.getElementById('recent-activity-list');
    if (!recentActivityList) return;

    let allActivities = [];
    
    Object.keys(CONTENT_TYPES).forEach(type => {
        const config = CONTENT_TYPES[type];
        const items = getData(config.storageKey);
        
        items.forEach(item => {
            allActivities.push({
                type: config.displayName,
                title: item.title,
                date: new Date(item.date),
                action: 'added',
                item: item
            });
        });
    });

    allActivities.sort((a, b) => b.date - a.date);
    const recentActivities = allActivities.slice(0, 5);

    recentActivityList.innerHTML = '';

    if (recentActivities.length === 0) {
        recentActivityList.innerHTML = '<div class="empty-activity">No recent activity</div>';
        return;
    }

    recentActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const timeAgo = getTimeAgo(activity.date);
        const icon = getActivityIcon(activity.type);
        
        activityItem.innerHTML = `
            <div class="activity-icon">${icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-meta">${activity.type} • ${timeAgo}</div>
            </div>
        `;
        
        recentActivityList.appendChild(activityItem);
    });
}

function updateContentOverview() {
    const contentOverview = document.getElementById('content-overview');
    if (!contentOverview) return;

    let overviewHTML = '';
    
    Object.keys(CONTENT_TYPES).forEach(type => {
        const config = CONTENT_TYPES[type];
        const items = getData(config.storageKey);
        const count = items.length;
        
        overviewHTML += `
            <div class="content-overview-item">
                <div class="overview-icon">${getContentIcon(type)}</div>
                <div class="overview-info">
                    <div class="overview-count">${count}</div>
                    <div class="overview-label">${config.displayName}</div>
                </div>
            </div>
        `;
    });

    contentOverview.innerHTML = overviewHTML;
}

function updateStorageUsage() {
    const storageUsage = document.getElementById('storage-usage');
    if (!storageUsage) return;

    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
            totalSize += new Blob([data]).size;
        }
    });

    const usedMB = (totalSize / (1024 * 1024)).toFixed(2);
    const totalMB = 5;
    const percentage = Math.min((usedMB / totalMB) * 100, 100);

    storageUsage.innerHTML = `
        <div class="storage-progress">
            <div class="storage-bar">
                <div class="storage-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="storage-info">
                <span>${usedMB} MB used of ${totalMB} MB</span>
                <span>${percentage.toFixed(1)}%</span>
            </div>
        </div>
    `;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
}

function getActivityIcon(type) {
    const icons = {
        'Magazine Issue': '📰',
        'Lifestyle Content': '🏡',
        'Cultural Content': '🎭',
        'Adventure Content': '⛰️',
        'Environment Content': '🌿',
        'Photo': '📷',
        'Video': '🎥',
        '360° View': '🔄',
        'Art': '🎨'
    };
    return icons[type] || '📄';
}

function getContentIcon(type) {
    const icons = {
        'magazine': '📰',
        'lifestyle': '🏡',
        'culture': '🎭',
        'adventure': '⛰️',
        'environment': '🌿',
        'photos': '📷',
        'videos': '🎥',
        'views360': '🔄',
        'art': '🎨'
    };
    return icons[type] || '📄';
}

// ============================
// Enhanced Gallery Lightbox Functions
// ============================

function initGalleryLightbox() {
    console.log('Initializing gallery lightbox...');
    
    if (!galleryLightbox || !lightboxClose) {
        console.warn('Gallery lightbox elements not found');
        return;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightboxItem);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextLightboxItem);
    
    galleryLightbox.addEventListener('click', function(e) {
        if (e.target === galleryLightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', function(e) {
        if (galleryLightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevLightboxItem();
            if (e.key === 'ArrowRight') showNextLightboxItem();
        }
    });
    
    console.log('Gallery lightbox initialized successfully');
}

function openLightbox(items, index, type) {
    console.log(`Opening lightbox for ${type} at index ${index}`);
    
    if (!items || items.length === 0) {
        showNotification('No items to display', 'error');
        return;
    }
    
    currentLightboxItems = items;
    currentLightboxIndex = index;
    
    const item = items[index];
    const mediaType = determineMediaType(item, type);
    
    hideAllLightboxMedia();
    showLightboxMedia(mediaType, item);
    
    if (lightboxTitle) lightboxTitle.textContent = item.title || 'Untitled';
    if (lightboxDescription) lightboxDescription.textContent = item.description || 'No description';
    
    updateLightboxNavigation();
    
    galleryLightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    galleryLightbox.classList.add('loading');
    setTimeout(() => {
        galleryLightbox.classList.remove('loading');
    }, 500);
}

function determineMediaType(item, type) {
    if (type === 'videos' || type === 'video') return 'video';
    if (type === 'embed') return 'iframe';
    
    const url = item.url || item.videoUrl || item.src || '';
    
    if (url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i)) return 'video';
    if (url.includes('youtube.com') || url.includes('youtu.be') || 
        url.includes('vimeo.com') || url.includes('dailymotion.com')) return 'iframe';
    
    return 'image';
}

function hideAllLightboxMedia() {
    const mediaElements = [lightboxImage, lightboxVideo, document.getElementById('lightbox-iframe')];
    
    mediaElements.forEach(media => {
        if (media) {
            media.style.display = 'none';
            if (media.tagName === 'VIDEO') {
                media.pause();
                media.currentTime = 0;
            }
            if (media.tagName === 'IFRAME') {
                media.src = '';
            }
        }
    });
}

function showLightboxMedia(mediaType, item) {
    const url = item.url || item.videoUrl || item.src || '';
    
    switch(mediaType) {
        case 'video':
            if (lightboxVideo) {
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = url;
                lightboxVideo.controls = true;
                lightboxVideo.playsInline = true;
                lightboxVideo.muted = false;
                
                lightboxVideo.addEventListener('loadeddata', function() {
                    galleryLightbox.classList.remove('loading');
                });
                
                lightboxVideo.play().catch(e => {
                    console.log('Auto-play prevented:', e);
                });
            }
            break;
            
        case 'iframe':
            const iframe = document.getElementById('lightbox-iframe');
            if (iframe) {
                iframe.style.display = 'block';
                let embedUrl = url;
                
                if (url.includes('youtube.com/watch?v=')) {
                    const videoId = url.split('v=')[1].split('&')[0];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                } else if (url.includes('youtu.be/')) {
                    const videoId = url.split('youtu.be/')[1].split('?')[0];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                } else if (url.includes('vimeo.com/')) {
                    const videoId = url.split('vimeo.com/')[1].split('/').pop();
                    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
                }
                
                iframe.src = embedUrl;
                iframe.onload = function() {
                    galleryLightbox.classList.remove('loading');
                };
            }
            break;
            
        case 'image':
        default:
            if (lightboxImage) {
                lightboxImage.style.display = 'block';
                lightboxImage.src = url || item.cover || item.image;
                lightboxImage.alt = item.title || 'Gallery image';
                
                lightboxImage.onload = function() {
                    galleryLightbox.classList.remove('loading');
                };
                
                lightboxImage.onerror = function() {
                    galleryLightbox.classList.remove('loading');
                    console.error('Failed to load image:', lightboxImage.src);
                };
            }
            break;
    }
}

function closeLightbox() {
    console.log('Closing lightbox');
    galleryLightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    hideAllLightboxMedia();
    currentLightboxItems = null;
    currentLightboxIndex = -1;
}

function showPrevLightboxItem() {
    if (!currentLightboxItems || currentLightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
    updateLightboxContent();
}

function showNextLightboxItem() {
    if (!currentLightboxItems || currentLightboxItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    if (!currentLightboxItems || currentLightboxIndex < 0) return;
    
    const item = currentLightboxItems[currentLightboxIndex];
    galleryLightbox.classList.add('loading');
    
    hideAllLightboxMedia();
    const mediaType = determineMediaType(item);
    showLightboxMedia(mediaType, item);
    
    if (lightboxTitle) lightboxTitle.textContent = item.title || 'Untitled';
    if (lightboxDescription) lightboxDescription.textContent = item.description || 'No description';
    
    updateLightboxNavigation();
}

function updateLightboxNavigation() {
    if (!currentLightboxItems || !lightboxPrev || !lightboxNext) return;
    
    if (currentLightboxItems.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    } else {
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
    }
    
    const lightboxCounter = document.getElementById('lightbox-counter');
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length}`;
    }
}

// ============================
// Page-Specific Initialization
// ============================

function initHomePage() {
    console.log('Initializing Home page features...');
    const magazines = getMagazines();
    renderContentCards(magazines, magazineContainer, 'magazine', null, 'No Magazine Issues Yet');
    if (heroBackgrounds && heroBackgrounds.length > 0) {
        startBackgroundRotation();
    }
}

function initMountainLifePage() {
    console.log('Initializing Mountain Life page features...');
    
    const contentTypes = [
        { type: 'lifestyle', container: lifestyleGrid, category: 'Lifestyle', message: 'No Lifestyle Content Yet' },
        { type: 'culture', container: cultureGrid, category: 'Culture', message: 'No Cultural Heritage Content Yet' },
        { type: 'adventure', container: adventureGrid, category: 'Adventure', message: 'No Adventure Content Yet' },
        { type: 'environment', container: environmentGrid, category: 'Environment', message: 'No Environment Content Yet' }
    ];
    
    contentTypes.forEach(config => {
        const items = getData(CONTENT_TYPES[config.type].storageKey);
        renderContentCards(items, config.container, config.type, config.category, config.message);
    });
    
    initContentTabs();
}

function initGalleryPage() {
    console.log('Initializing Gallery page features...');
    
    const galleryTypes = [
        { type: 'photos', container: photosContent, message: 'No Photos Yet' },
        { type: 'videos', container: videosContent, message: 'No Videos Yet' },
        { type: 'views360', container: views360Content, message: 'No 360° Views Yet' },
        { type: 'art', container: artContent, message: 'No Mountain Art Yet' }
    ];
    
    galleryTypes.forEach(config => {
        const items = getData(CONTENT_TYPES[config.type].storageKey);
        renderGalleryItems(items, config.container, config.type, config.message);
    });
    
    initGalleryTabs();
}

// ============================
// Admin Page Functions
// ============================

function initAdminPage() {
    console.log('Initializing Admin page...');
    initPasswordProtection();
    initAdminPanel();
}

function initPasswordProtection() {
    console.log('Initializing password protection...');
    
    const loginForm = document.getElementById('admin-login-form');
    const passwordSection = document.getElementById('password-section');
    const adminPanelSection = document.getElementById('admin-panel-section');

    // Check authentication status
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        console.log('User already authenticated, showing admin panel');
        if (passwordSection) passwordSection.style.display = 'none';
        if (adminPanelSection) adminPanelSection.style.display = 'block';
        updateAdminDashboard();
        loadAllContentLists();
        return;
    }

    console.log('User not authenticated, showing login form');
    if (passwordSection) passwordSection.style.display = 'block';
    if (adminPanelSection) adminPanelSection.style.display = 'none';

    // Setup login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            
            const enteredPassword = adminPasswordInput ? adminPasswordInput.value : '';
            const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
            
            console.log('Entered password:', enteredPassword);
            console.log('Stored password:', storedPassword);
            
            if (enteredPassword === storedPassword) {
                console.log('Login successful');
                sessionStorage.setItem('admin_authenticated', 'true');
                if (passwordSection) passwordSection.style.display = 'none';
                if (adminPanelSection) adminPanelSection.style.display = 'block';
                if (loginError) loginError.style.display = 'none';
                if (adminPasswordInput) adminPasswordInput.value = '';
                
                updateAdminDashboard();
                loadAllContentLists();
                showNotification('Admin login successful!', 'success');
            } else {
                console.log('Login failed');
                if (loginError) {
                    loginError.style.display = 'block';
                    loginError.textContent = 'Invalid password. Please try again.';
                }
                if (adminPasswordInput) {
                    adminPasswordInput.value = '';
                    adminPasswordInput.focus();
                }
                showNotification('Login failed. Please check your password.', 'error');
            }
        });
        
        // Add event listener to hide error when user starts typing
        if (adminPasswordInput) {
            adminPasswordInput.addEventListener('input', function() {
                if (loginError && loginError.style.display === 'block') {
                    loginError.style.display = 'none';
                }
            });
            
            // Also hide error on focus
            adminPasswordInput.addEventListener('focus', function() {
                if (loginError && loginError.style.display === 'block') {
                    loginError.style.display = 'none';
                }
            });
        }
    } else {
        console.error('Login form not found!');
    }
    
    initPasswordChangeForm();
}

function adminLogout() {
    console.log('Logging out admin...');
    
    // Clear authentication
    sessionStorage.removeItem('admin_authenticated');
    
    const passwordSection = document.getElementById('password-section');
    const adminPanelSection = document.getElementById('admin-panel-section');
    const loginError = document.getElementById('login-error');
    const loginForm = document.getElementById('admin-login-form');
    
    // Hide admin panel and show login form
    if (adminPanelSection) adminPanelSection.style.display = 'none';
    if (passwordSection) {
        passwordSection.style.display = 'block';
        
        // Reset login form
        if (loginForm) {
            loginForm.reset();
        }
        
        // Hide any error messages
        if (loginError) {
            loginError.style.display = 'none';
        }
    }
    
    // Reset all admin forms to add mode
    resetAllFormsToAddMode();
    
    // Clear any content lists
    clearContentLists();
    
    // Scroll to top to ensure login form is visible
    window.scrollTo(0, 0);
    
    showNotification('Logged out successfully', 'info');
}

function clearContentLists() {
    Object.keys(CONTENT_TYPES).forEach(type => {
        const config = CONTENT_TYPES[type];
        const container = document.getElementById(config.containerId);
        if (container) {
            container.innerHTML = '<div class="empty-state"><h3>Please login to view content</h3></div>';
        }
    });
}

function resetAllFormsToAddMode() {
    console.log('Resetting all forms to add mode...');
    Object.keys(CONTENT_TYPES).forEach(type => {
        const config = CONTENT_TYPES[type];
        const form = document.getElementById(config.formId);
        if (form) {
            resetFormToAddMode(form, config.formId, config.displayName);
        }
    });
}

function initAdminPanel() {
    console.log('Initializing admin panel...');
    
    if (adminTabs && adminTabs.length > 0) {
        console.log('Setting up admin tabs:', adminTabs.length);
        
        adminTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                console.log('Admin tab clicked:', tabId);
                
                adminTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                adminForms.forEach(form => {
                    form.classList.remove('active');
                });
                const targetForm = document.getElementById(`${tabId}-form`);
                if (targetForm) {
                    targetForm.classList.add('active');
                    console.log(`Activated form: ${tabId}-form`);
                } else {
                    console.warn(`Target form not found: ${tabId}-form`);
                }
            });
        });
        
        if (adminTabs.length > 0) adminTabs[0].click();
    } else {
        console.warn('No admin tabs found');
    }
    
    setupAdminForms();
}

function setupAdminForms() {
    console.log('Setting up admin forms...');
    
    Object.keys(CONTENT_TYPES).forEach(type => {
        const config = CONTENT_TYPES[type];
        const form = document.getElementById(config.formId);
        
        if (form) {
            console.log(`Setting up form: ${config.formId}`);
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log(`Form submitted: ${config.formId}`);
                
                // Check if user is still authenticated
                if (sessionStorage.getItem('admin_authenticated') !== 'true') {
                    showNotification('Session expired. Please login again.', 'error');
                    adminLogout();
                    return;
                }
                
                const formData = getFormData(config.fields);
                console.log('Form data:', formData);
                
                const isEditMode = this.getAttribute('data-edit-mode') === 'true';
                const editId = this.getAttribute('data-edit-id');
                
                console.log(`Edit mode: ${isEditMode}, Edit ID: ${editId}`);
                
                let processedData;
                if (isEditMode && editId) {
                    processedData = processFormData(type, formData, editId);
                } else {
                    processedData = processFormData(type, formData);
                }
                
                if (processedData) {
                    if (isEditMode && editId) {
                        console.log(`Updating ${type} with ID: ${editId}`);
                        updateContentItem(type, editId, processedData);
                        showNotification(`${config.displayName} updated successfully!`, 'success');
                        resetFormToAddMode(this, config.formId, config.displayName);
                    } else {
                        console.log(`Adding new ${type}`);
                        saveContentItem(type, processedData);
                        showNotification(`${config.displayName} added successfully!`, 'success');
                    }
                    this.reset();
                    updatePageContent(type);
                    updateAdminDashboard();
                    loadContentList(type);
                } else {
                    showNotification('Error processing form data', 'error');
                }
            });
        } else {
            console.warn(`Form not found: ${config.formId}`);
        }
    });
    
    console.log('Admin forms setup completed');
}

function resetFormToAddMode(form, formId, displayName) {
    console.log(`Resetting form ${formId} to add mode`);
    
    form.removeAttribute('data-edit-mode');
    form.removeAttribute('data-edit-id');
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = `Add ${displayName}`;
        submitButton.classList.remove('edit-mode');
    }
    
    const cancelBtn = form.querySelector('.cancel-edit-btn');
    if (cancelBtn) cancelBtn.style.display = 'none';
}

function updatePageContent(type) {
    console.log(`Updating page content for: ${type}`);
    
    const config = CONTENT_TYPES[type];
    if (!config) return;
    
    const items = getData(config.storageKey);
    const container = document.getElementById(config.renderContainer);
    
    if (container && config.renderFunction) {
        config.renderFunction(items, container, type, config.category, `No ${config.displayName} Yet`);
    }
}

function initPasswordChangeForm() {
    console.log('Initializing password change form...');
    
    const settingsForm = document.getElementById('settings-form');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Password change form submitted');
            
            // Check authentication
            if (sessionStorage.getItem('admin_authenticated') !== 'true') {
                showNotification('Session expired. Please login again.', 'error');
                adminLogout();
                return;
            }
            
            const newPassword = document.getElementById('admin-password-change').value;
            const confirmPassword = document.getElementById('admin-password-confirm').value;
            
            if (!newPassword) {
                showNotification('Please enter a new password', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                return;
            }
            
            localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
            showNotification('Password updated successfully!', 'success');
            settingsForm.reset();
        });
    } else {
        console.warn('Settings form not found');
    }
}

function loadAllContentLists() {
    console.log('Loading all content lists...');
    Object.keys(CONTENT_TYPES).forEach(type => {
        loadContentList(type);
    });
}

function loadContentList(type) {
    // Check authentication first
    if (sessionStorage.getItem('admin_authenticated') !== 'true') {
        console.log('User not authenticated, skipping content list load');
        return;
    }
    
    const config = CONTENT_TYPES[type];
    if (!config) {
        console.error(`Config not found for type: ${type}`);
        return;
    }
    
    const container = document.getElementById(config.containerId);
    if (!container) {
        console.warn(`Container not found for ${type}: ${config.containerId}`);
        return;
    }
    
    console.log(`Loading content list for: ${type}`);
    const items = getData(config.storageKey);
    renderContentList(items, container, type, config.displayName);
}

function renderContentList(items, container, type, itemName) {
    console.log(`Rendering content list for ${type}: ${items.length} items`);
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No ${itemName} Yet</h3>
                <p>Add your first item using the form above</p>
            </div>
        `;
        return;
    }
    
    const sortedItems = [...items].sort((a, b) => b.id - a.id);
    
    sortedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'content-item';
        itemElement.setAttribute('data-id', item.id);
        
        const dateInfo = item.displayDate ? `<small>Date: ${item.displayDate}</small>` : 
                        item.date ? `<small>Added: ${new Date(item.date).toLocaleDateString()}</small>` : '';
        
        const imageSrc = item.cover || item.image || item.url || item.thumbnail;
        const imagePreview = imageSrc ? 
            `<div class="item-preview">
                <img src="${imageSrc}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
            </div>` : '';
        
        itemElement.innerHTML = `
            ${imagePreview}
            <div class="item-info">
                <h4>${item.title || 'Untitled'}</h4>
                <p>${item.description || 'No description'}</p>
                ${dateInfo}
                <small>ID: ${item.id}</small>
            </div>
            <div class="item-actions">
                <button class="edit-btn" data-id="${item.id}" data-type="${type}">Edit</button>
                <button class="delete-btn" data-id="${item.id}" data-type="${type}">Delete</button>
            </div>
        `;
        container.appendChild(itemElement);
    });
    
    const editButtons = container.querySelectorAll('.edit-btn');
    const deleteButtons = container.querySelectorAll('.delete-btn');
    
    console.log(`Added ${editButtons.length} edit buttons and ${deleteButtons.length} delete buttons`);
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Check authentication
            if (sessionStorage.getItem('admin_authenticated') !== 'true') {
                showNotification('Session expired. Please login again.', 'error');
                adminLogout();
                return;
            }
            
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            console.log(`Edit button clicked: ${type} - ${id}`);
            editItem(type, id);
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Check authentication
            if (sessionStorage.getItem('admin_authenticated') !== 'true') {
                showNotification('Session expired. Please login again.', 'error');
                adminLogout();
                return;
            }
            
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            console.log(`Delete button clicked: ${type} - ${id}`);
            deleteItem(type, id);
        });
    });
}

function editItem(type, id) {
    console.log(`Editing item: ${type} - ${id}`);
    
    const config = CONTENT_TYPES[type];
    if (!config) {
        showNotification('Content type configuration not found', 'error');
        return;
    }
    
    const items = getData(config.storageKey);
    const item = items.find(item => item.id == id);
    
    if (!item) {
        showNotification('Item not found!', 'error');
        return;
    }
    
    const form = document.getElementById(config.formId);
    if (!form) {
        showNotification('Form not found!', 'error');
        return;
    }
    
    form.setAttribute('data-edit-mode', 'true');
    form.setAttribute('data-edit-id', id);
    
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = `Update ${config.displayName}`;
        submitButton.classList.add('edit-mode');
    }
    
    const cancelBtn = form.querySelector('.cancel-edit-btn');
    if (cancelBtn) {
        cancelBtn.style.display = 'inline-block';
        cancelBtn.onclick = function(e) {
            e.preventDefault();
            resetFormToAddMode(form, config.formId, config.displayName);
            showNotification('Edit cancelled', 'info');
        };
    }
    
    console.log('Populating form fields with item data:', item);
    config.fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const fieldName = fieldId.replace(`${type}-`, '');
            let fieldValue = item[fieldName] || '';
            
            if (fieldName === 'date' && field.type === 'date') {
                if (item.displayDate) {
                    const dateObj = new Date(item.displayDate);
                    if (!isNaN(dateObj)) {
                        fieldValue = dateObj.toISOString().split('T')[0];
                    }
                } else if (item.date) {
                    const dateObj = new Date(item.date);
                    if (!isNaN(dateObj)) {
                        fieldValue = dateObj.toISOString().split('T')[0];
                    }
                }
            }
            
            field.value = fieldValue;
            console.log(`Set field ${fieldId} to: ${fieldValue}`);
        } else {
            console.warn(`Form field not found: ${fieldId}`);
        }
    });
    
    const tabId = config.formId.replace('-form', '');
    const tab = document.querySelector(`.admin-tab[data-tab="${tabId}"]`);
    if (tab) {
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        adminForms.forEach(form => {
            form.classList.remove('active');
        });
        form.classList.add('active');
    }
    
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showNotification(`Editing ${config.displayName.toLowerCase()}: "${item.title}"`, 'info');
}

function deleteItem(type, id) {
    console.log(`Deleting item: ${type} - ${id}`);
    
    const config = CONTENT_TYPES[type];
    if (!config) return;
    
    const items = getData(config.storageKey);
    const item = items.find(item => item.id == id);
    
    if (!item) {
        showNotification('Item not found!', 'error');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete "${item.title}"?\n\nThis ${config.displayName.toLowerCase()} will be permanently removed. This action cannot be undone.`)) {
        console.log('Delete cancelled by user');
        return;
    }
    
    const updatedItems = items.filter(item => item.id != id);
    const success = saveData(config.storageKey, updatedItems);
    
    if (success) {
        showNotification(`${config.displayName} "${item.title}" deleted successfully!`, 'success');
        updateAdminDashboard();
        loadContentList(type);
        
        const form = document.getElementById(config.formId);
        if (form && form.getAttribute('data-edit-id') == id) {
            resetFormToAddMode(form, config.formId, config.displayName);
        }
        
        updatePageContent(type);
    } else {
        showNotification('Error deleting item', 'error');
    }
}

function updateAdminStatistics() {
    console.log('Updating admin statistics...');
    
    const magazinesCount = document.getElementById('magazines-count');
    const contentCount = document.getElementById('content-count');
    const mediaCount = document.getElementById('media-count');
    const subscribersCount = document.getElementById('subscribers-count');
    
    if (magazinesCount) magazinesCount.textContent = getMagazines().length;
    
    if (contentCount) {
        const lifestyle = getLifestyle();
        const culture = getCulture();
        const adventure = getAdventure();
        const environment = getEnvironment();
        const totalContent = lifestyle.length + culture.length + adventure.length + environment.length;
        contentCount.textContent = totalContent;
    }
    
    if (mediaCount) {
        const photos = getPhotos();
        const videos = getVideos();
        const views360 = get360();
        const art = getArt();
        const totalMedia = photos.length + videos.length + views360.length + art.length;
        mediaCount.textContent = totalMedia;
    }
    
    if (subscribersCount) subscribersCount.textContent = getSubscribers().length;
}

// ============================
// Data Processing Functions
// ============================

function processFormData(type, data, editId = null) {
    console.log(`Processing form data for ${type}`, data);
    
    const baseItem = {
        id: editId ? parseInt(editId) : Date.now(),
        title: data[`${type}-title`] || 'Untitled',
        description: data[`${type}-description`] || 'No description',
        date: new Date().toISOString()
    };

    try {
        switch(type) {
            case 'magazine':
                return {
                    ...baseItem,
                    cover: data['magazine-cover'] || '',
                    date: data['magazine-date'] || new Date().toISOString(),
                    displayDate: data['magazine-date'] ? 
                        new Date(data['magazine-date']).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) : 'No date',
                    content: data['magazine-content'] || ''
                };
            case 'lifestyle':
            case 'culture':
            case 'adventure':
            case 'environment':
                return {
                    ...baseItem,
                    image: data[`${type}-image`] || '',
                    content: data[`${type}-content`] || ''
                };
            case 'photos':
            case 'views360':
            case 'art':
                return {
                    ...baseItem,
                    url: data[`${type}-url`] || ''
                };
            case 'videos':
                return {
                    ...baseItem,
                    url: data['video-url'] || '',
                    thumbnail: data['video-thumbnail'] || '',
                    videoType: determineMediaType({url: data['video-url'] || ''})
                };
            default:
                console.error('Unknown content type:', type);
                return null;
        }
    } catch (error) {
        console.error('Error processing form data:', error);
        return null;
    }
}

function saveContentItem(type, item) {
    console.log(`Saving content item for ${type}:`, item);
    
    const config = CONTENT_TYPES[type];
    if (!config) {
        console.error(`Config not found for type: ${type}`);
        return false;
    }
    
    const items = getData(config.storageKey);
    items.push(item);
    return saveData(config.storageKey, items);
}

function updateContentItem(type, id, updatedItem) {
    console.log(`Updating content item for ${type} with ID ${id}:`, updatedItem);
    
    const config = CONTENT_TYPES[type];
    if (!config) {
        console.error(`Config not found for type: ${type}`);
        return false;
    }
    
    const items = getData(config.storageKey);
    const index = items.findIndex(item => item.id == id);
    
    if (index !== -1) {
        updatedItem.id = parseInt(id);
        items[index] = updatedItem;
        return saveData(config.storageKey, items);
    } else {
        console.error(`Item not found for update: ${type} - ${id}`);
        return false;
    }
}

// ============================
// Feature Initialization Functions
// ============================

function startBackgroundRotation() {
    if (!heroBackgrounds || heroBackgrounds.length === 0) {
        console.warn('No hero backgrounds found for rotation');
        return;
    }
    
    console.log('Starting background rotation with', heroBackgrounds.length, 'backgrounds');
    
    heroBackgrounds.forEach((bg, index) => {
        bg.style.backgroundImage = `url('${backgroundImages[index]}')`;
        if (index === 0) bg.classList.add('active');
    });
    
    let currentIndex = 0;
    
    setInterval(() => {
        heroBackgrounds[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % heroBackgrounds.length;
        heroBackgrounds[currentIndex].classList.add('active');
    }, 5000);
}

function initMobileMenu() {
    if (!mobileMenuBtn || !mainNav) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    console.log('Initializing mobile menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        console.log('Mobile menu toggled');
    });

    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            console.log('Mobile menu closed via link click');
        });
    });
}

function initScrollToTop() {
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }
    
    console.log('Initializing scroll to top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('Scrolled to top');
    });
}

function initSmoothScrolling() {
    console.log('Initializing smooth scrolling');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                console.log(`Smooth scrolled to: ${targetId}`);
            }
        });
    });
}

function initSubscriptionForm() {
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        console.log('Initializing subscription form');
        
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            console.log('Subscription form submitted with email:', email);
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const subscribers = getSubscribers();
            
            if (subscribers.some(s => s.email === email)) {
                showNotification('This email is already subscribed.', 'error');
                return;
            }
            
            subscribers.push({
                email,
                date: new Date().toISOString()
            });
            
            const success = saveData(STORAGE_KEYS.SUBSCRIBERS, subscribers);
            
            if (success) {
                if (subscriptionConfirmation) {
                    subscriptionConfirmation.style.display = 'block';
                    setTimeout(() => {
                        subscriptionConfirmation.style.display = 'none';
                    }, 5000);
                } else {
                    showNotification('Thank you for subscribing!', 'success');
                }
                
                emailInput.value = '';
                updateAdminDashboard();
            } else {
                showNotification('Error saving subscription. Please try again.', 'error');
            }
        });
    } else {
        console.warn('Subscription form not found');
    }
}

function initModal() {
    if (!contentModal || !closeModal) {
        console.warn('Modal elements not found');
        return;
    }
    
    console.log('Initializing modal');
    
    closeModal.addEventListener('click', function() {
        contentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed');
    });

    window.addEventListener('click', function(e) {
        if (e.target === contentModal) {
            contentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Modal closed via outside click');
        }
    });
}

function initContentTabs() {
    if (!contentTabs || contentTabs.length === 0) {
        console.warn('Content tabs not found');
        return;
    }
    
    console.log('Initializing content tabs:', contentTabs.length);
    
    contentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('Content tab clicked:', tabId);
            
            contentTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.content-section').forEach(content => {
                content.classList.remove('active');
            });
            const targetContent = document.getElementById(`${tabId}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`Activated content section: ${tabId}-content`);
            } else {
                console.warn(`Content section not found: ${tabId}-content`);
            }
        });
    });
    
    if (contentTabs.length > 0) contentTabs[0].click();
}

function initGalleryTabs() {
    if (!galleryTabs || galleryTabs.length === 0) {
        console.warn('Gallery tabs not found');
        return;
    }
    
    console.log('Initializing gallery tabs:', galleryTabs.length);
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('Gallery tab clicked:', tabId);
            
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.gallery-content').forEach(content => {
                content.classList.remove('active');
            });
            const targetContent = document.getElementById(`${tabId}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`Activated gallery content: ${tabId}-content`);
            } else {
                console.warn(`Gallery content not found: ${tabId}-content`);
            }
        });
    });
    
    if (galleryTabs.length > 0) galleryTabs[0].click();
}

// ============================
// Form Processing Functions
// ============================

function getFormData(fieldIds) {
    const data = {};
    fieldIds.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            data[fieldId] = element.value;
        } else {
            console.warn(`Form field not found: ${fieldId}`);
        }
    });
    return data;
}

// ============================
// Utility Functions
// ============================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    console.log(`Showing notification: ${type} - ${message}`);
    
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                min-width: 300px;
                max-width: 500px;
                background: white;
                border-left: 4px solid #007cba;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-radius: 4px;
                animation: slideIn 0.3s ease-out;
            }
            .custom-notification.success {
                border-left-color: #46b450;
            }
            .custom-notification.error {
                border-left-color: #dc3232;
            }
            .custom-notification.warning {
                border-left-color: #ffb900;
            }
            .custom-notification.info {
                border-left-color: #007cba;
            }
            .notification-content {
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-message {
                flex: 1;
                margin-right: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
            }
            .notification-close:hover {
                color: #000;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 5000);
}

function debugStorage() {
    console.log('=== STORAGE DEBUG INFO ===');
    Object.keys(STORAGE_KEYS).forEach(key => {
        const data = getData(STORAGE_KEYS[key]);
        console.log(`${key}: ${data.length} items`);
    });
    console.log('Admin password set:', localStorage.getItem(ADMIN_PASSWORD_KEY) ? 'Yes' : 'No');
    console.log('Admin authenticated:', sessionStorage.getItem('admin_authenticated') ? 'Yes' : 'No');
    console.log('========================');
}

// ============================
// Export functions for global access
// ============================

window.adminLogout = adminLogout;
window.showNotification = showNotification;
window.likeArticle = likeArticle;
window.shareArticle = shareArticle;

window.debugStorage = debugStorage;
