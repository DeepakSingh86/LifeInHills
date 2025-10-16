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

// GitHub Configuration
const GITHUB_CONFIG = {
    REPO_OWNER: 'DeepakSingh86',
    REPO_NAME: 'LifeInHills',
    BRANCH: 'main',
    DATA_PATH: 'data',
    IMAGES_PATH: 'Images'
};

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
        category: null,
        githubFile: 'magazines.json'
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
        category: 'Lifestyle',
        githubFile: 'lifestyle.json'
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
        category: 'Culture',
        githubFile: 'culture.json'
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
        category: 'Adventure',
        githubFile: 'adventure.json'
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
        category: 'Environment',
        githubFile: 'environment.json'
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
        category: 'photos',
        githubFile: 'photos.json'
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
        category: 'videos',
        githubFile: 'videos.json'
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
        category: '360',
        githubFile: 'views360.json'
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
        category: 'art',
        githubFile: 'art.json'
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
    
    // BLOCK LOCAL STORAGE - Comment out localStorage initialization
    /*
    Object.values(STORAGE_KEYS).forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
            console.log(`Initialized empty storage for: ${key}`);
        }
    });
    */
    
    // Initialize data from GitHub instead
    loadAllDataFromGitHub();
    
    console.log('Data storage initialized');
}

// ============================
// GitHub Integration Functions
// ============================

async function loadAllDataFromGitHub() {
    console.log('Loading data from GitHub...');
    
    try {
        for (const type in CONTENT_TYPES) {
            await loadDataFromGitHub(type);
        }
        showNotification('Data loaded from GitHub successfully!', 'success');
    } catch (error) {
        console.error('Error loading data from GitHub:', error);
        showNotification('Error loading data from GitHub. Using fallback data.', 'error');
        // Initialize with empty data as fallback
        Object.values(STORAGE_KEYS).forEach(key => {
            window[key] = [];
        });
    }
}

async function loadDataFromGitHub(contentType) {
    return new Promise((resolve, reject) => {
        const config = CONTENT_TYPES[contentType];
        if (!config) {
            reject(new Error(`Config not found for type: ${contentType}`));
            return;
        }

        const githubUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/${GITHUB_CONFIG.BRANCH}/${GITHUB_CONFIG.DATA_PATH}/${config.githubFile}`;
        
        console.log(`Loading ${contentType} data from: ${githubUrl}`);
        
        fetch(githubUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Store data in global variable instead of localStorage
                window[config.storageKey] = data;
                console.log(`Loaded ${data.length} ${contentType} items from GitHub`);
                resolve(data);
            })
            .catch(error => {
                console.warn(`Could not load ${contentType} from GitHub:`, error);
                // Initialize with empty array as fallback
                window[config.storageKey] = [];
                resolve([]);
            });
    });
}

async function saveDataToGitHub(contentType, data) {
    return new Promise((resolve, reject) => {
        console.log(`Saving ${contentType} data to GitHub...`);
        
        // This is a placeholder - in a real implementation, you would need:
        // 1. A backend server to handle GitHub API calls
        // 2. Proper authentication (never expose tokens in client-side code)
        // 3. Error handling for network requests
        
        const config = CONTENT_TYPES[contentType];
        if (!config) {
            reject(new Error(`Config not found for type: ${contentType}`));
            return;
        }
        
        // Store data in global variable
        window[config.storageKey] = data;
        
        // Show success message (actual GitHub save would happen via backend)
        showNotification(`${config.displayName} data prepared for GitHub sync!`, 'success');
        
        // In a real implementation, you would send data to your backend here:
        // Example: await fetch('/api/save-to-github', { method: 'POST', body: JSON.stringify({type: contentType, data}) });
        
        resolve(true);
    });
}

// ============================
// Data Management (Modified for GitHub)
// ============================

function getData(key) {
    try {
        // Use global variable instead of localStorage
        const data = window[key] || [];
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error reading data from ${key}:`, error);
        return [];
    }
}

async function saveData(key, data) {
    try {
        // Find the content type for this key
        let contentType = null;
        for (const type in CONTENT_TYPES) {
            if (CONTENT_TYPES[type].storageKey === key) {
                contentType = type;
                break;
            }
        }
        
        if (contentType) {
            return await saveDataToGitHub(contentType, data);
        } else {
            console.error(`Content type not found for key: ${key}`);
            return false;
        }
    } catch (error) {
        console.error(`Error saving data to ${key}:`, error);
        return false;
    }
}

// Data getter functions (updated to use global variables)
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
// Enhanced Sharing with Content Data
// ============================

function performShare(articleId, platform) {
    const article = findArticleById(articleId);
    if (!article) {
        showNotification('Article not found for sharing', 'error');
        return;
    }
    
    const currentUrl = window.location.href.split('?')[0]; // Remove any existing query params
    const title = encodeURIComponent(article.title);
    const description = encodeURIComponent(article.description || 'Check out this content from Life in Pahadi');
    
    // Create share URL with article data
    const shareData = {
        title: article.title,
        description: article.description,
        image: article.cover || article.image || article.url,
        type: getArticleType(articleId),
        id: articleId
    };
    
    const shareUrl = `${currentUrl}?shared=true&data=${encodeURIComponent(JSON.stringify(shareData))}`;
    
    let platformShareUrl = '';
    
    switch(platform) {
        case 'facebook':
            platformShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${title}`;
            break;
        case 'twitter':
            platformShareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'whatsapp':
            platformShareUrl = `https://api.whatsapp.com/send?text=${title} ${encodeURIComponent(shareUrl)}`;
            break;
        case 'linkedin':
            platformShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'telegram':
            platformShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${title}`;
            break;
        case 'email':
            platformShareUrl = `mailto:?subject=${title}&body=${description}%0A%0ARead more: ${encodeURIComponent(shareUrl)}`;
            break;
        default:
            return;
    }
    
    if (platform === 'email') {
        window.location.href = platformShareUrl;
    } else {
        window.open(platformShareUrl, '_blank', 'width=600,height=400');
    }
    
    showNotification(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, 'success');
    
    // Track the share
    shareArticle(articleId, platform);
}

function getArticleType(articleId) {
    for (const type in CONTENT_TYPES) {
        const items = getData(CONTENT_TYPES[type].storageKey);
        const article = items.find(item => item.id == articleId);
        if (article) return type;
    }
    return 'unknown';
}

function handleSharedContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const shared = urlParams.get('shared');
    const sharedData = urlParams.get('data');
    
    if (shared === 'true' && sharedData) {
        try {
            const data = JSON.parse(decodeURIComponent(sharedData));
            showSharedContentModal(data);
            
            // Clean URL without reloading page
            const cleanUrl = window.location.href.split('?')[0];
            window.history.replaceState({}, document.title, cleanUrl);
        } catch (error) {
            console.error('Error parsing shared data:', error);
        }
    }
}

function showSharedContentModal(sharedData) {
    if (!contentModal) return;
    
    modalTitle.textContent = sharedData.title;
    modalMeta.innerHTML = `<span>Shared Content</span>`;
    
    if (sharedData.image) {
        modalImage.src = sharedData.image;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }
    
    modalBody.innerHTML = `
        <div class="shared-content-preview">
            <h3>${sharedData.title}</h3>
            <p>${sharedData.description || 'No description available'}</p>
            <div class="shared-content-actions">
                <button class="btn-primary" onclick="openContentModal('${sharedData.type}', ${sharedData.id})">
                    View Full Content
                </button>
                <button class="btn-secondary" onclick="closeModal()">
                    Close Preview
                </button>
            </div>
        </div>
    `;
    
    contentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ============================
// Modified Admin Functions for GitHub
// ============================

async function saveContentItem(type, item) {
    console.log(`Saving content item for ${type}:`, item);
    
    const config = CONTENT_TYPES[type];
    if (!config) {
        console.error(`Config not found for type: ${type}`);
        return false;
    }
    
    const items = getData(config.storageKey);
    items.push(item);
    
    // Save to GitHub instead of localStorage
    return await saveData(config.storageKey, items);
}

async function updateContentItem(type, id, updatedItem) {
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
        
        // Save to GitHub instead of localStorage
        return await saveData(config.storageKey, items);
    } else {
        console.error(`Item not found for update: ${type} - ${id}`);
        return false;
    }
}

// ============================
// Initialize Common Features (Updated)
// ============================

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
    
    // Handle shared content on page load
    setTimeout(handleSharedContent, 1000);
    
    console.log('Common features initialized');
}

// ============================
// The rest of the functions remain largely the same...
// Only the data storage parts are modified
// ============================

// [The rest of your existing functions continue here...]
// Including: initArticleInteractions, renderContentCards, initAdminPage, etc.
// These remain the same except they now use the global data variables instead of localStorage

// Note: I've kept the same function structure but removed localStorage operations
// and replaced them with global variable access and GitHub API calls

// ============================
// Export functions for global access
// ============================

window.adminLogout = adminLogout;
window.showNotification = showNotification;
window.likeArticle = likeArticle;
window.shareArticle = shareArticle;
window.openContentModal = openContentModal;
window.closeModal = function() {
    if (contentModal) {
        contentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

window.debugStorage = function() {
    console.log('=== STORAGE DEBUG INFO ===');
    Object.keys(STORAGE_KEYS).forEach(key => {
        const data = getData(STORAGE_KEYS[key]);
        console.log(`${key}: ${data.length} items`);
    });
    console.log('========================');
};

// [Include all the remaining functions from your original code...]
// Remember to remove all localStorage.getItem and localStorage.setItem calls
// and replace them with getData() and saveData() calls

// ============================
// IMPORTANT NOTE FOR COMPLETE IMPLEMENTATION:
// ============================
// This code provides the framework for GitHub integration but requires:
// 1. A backend server to handle actual GitHub API calls (for security)
// 2. Proper error handling for network requests
// 3. Loading states while data is being fetched from GitHub
// 4. Fallback mechanisms for when GitHub is unavailable

// The current implementation uses global variables as a temporary storage
// and provides placeholder functions for GitHub integration
