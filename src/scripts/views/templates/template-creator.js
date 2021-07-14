import CONFIG from '../../globals/config';
import userReviewSmallImage from '../../../public/images/user-review-avatar-small.jpg';
import userReviewLargeImage from '../../../public/images/user-review-avatar-large.jpg';
import skeleton from '../../../public/loading/placeholder.png';

const createRestaurantPostTemplate = (restaurant) => `
    <article class="post-item">
        <img class="post-item__thumbnail lazyload"
                data-src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}"
                alt="${restaurant.name}">
        <div class="post-item__content">
            <div class="rating">
                <p>Lokasi: <span class="post-item__city">${restaurant.city}</span></p>
                <p>⭐️<span style="font-weight: bold;"> ${restaurant.rating}</span></p>
            </div>
            <h1 class="post-item__title"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h1>
            <p tabindex="0" class="post-item__description">${restaurant.description}</p>
        </div>
        <a href="#/detail/${restaurant.id}" class="detail-link">More Detail</a>
    </article>
`;

const createSkeletonRestaurantTemplate = (count) => {
    let template = '';

    for (let i = 0; i < count; i += 1) {
      template += `
        <article class="post-item">
            <img class="post-item__thumbnail"
                width="100%" height="350px" src="${skeleton}" alt="skeleton">
            <div class="post-item__content">
                <div class="rating">
                    <p class="skeleton">Lokasi: <span class="post-item__city skeleton">City</span></p>
                    <p class="skeleton"><span class="skeleton" style="font-weight: bold;"> 4.5</span></p>
                </div>
                <h1><a href="#" class="skeleton">Lorem ipsum dolor sit.</a></h1>
                <p class="skeleton" tabindex="0" class="post-item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dolorum eos exercitationem labore laboriosam magni nihil, nobis obcaecati optio perspiciatis placeat qui recusandae saepe sapiente sequi totam ullam ut.</p>
            </div>
            <a class="skeleton" href="# class="detail-link">More Detail</a>
        </article>
    `;
    }
    return template;
};

const createRestaurantItemTemplate = (restaurant) => `
    <article id="postItem" class="post-item">
        <img class="post-item__thumbnail lazyload"
                data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}"
                alt="${restaurant.name}">
        <div class="post-item__content">
            <div class="rating">
                <p class="address">Alamat: <span class="post-item__city">${restaurant.address}, ${restaurant.city}</span></p>
                <p>⭐️<span style="font-weight: bold;"> ${restaurant.rating}</span></p>
            </div>
            <h1 class="post-item__title"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h1>
            <p tabindex="0" class="post-item__description">${restaurant.description}</p>
        </div>

        <div class="restaurant-category" tabindex="0">
            <h3>Kategori Restoran:</h3>
            <p>${restaurant.categories.map((category) => `
            ${category.name}`).join(', ')}.</p>
        </div>
        
        <div id="menu-container">
            <div class="column">
                <div id="menu-makanan">
                    <p tabindex="0">Menu Makanan:</p>
                    <ol tabindex="0">
                        ${restaurant.menus.foods.map((food) => `
                        <li>${food.name}</li>`).join('')}
                    </ol>
                </div>
            </div>
            
            <div class="column">
                <div id="menu-minuman">
                    <p tabindex="0">Menu Minuman:</p>
                    <ol tabindex="0">
                        ${restaurant.menus.drinks.map((drink) => `
                        <li>${drink.name}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
        
        <div class="review-form-container">
            <form id="review-form">
                <ul class="wrapper">
                <h1 tabindex="0">Berikan Review untuk Restaurant</h1>
                <p>"${restaurant.name}"</p>
                    <li class="form-row">
                        <input aria-label="Enter your name" type="text" id="name" placeholder="Your Name..." />
                    </li>
                    <li class="form-row">
                        <textarea aria-label="Write your review here" type="text" id="review" placeholder="Write Your Review here..." style="height:100px"></textarea>
                    </li>
                    <li class="form-row">
                        <button id="submit" aria-label="submit your review form" type="submit">Submit</button>
                    </li>
                </ul>
            </form>
            <loading-post-review></loading-post-review>
            <div id="form-review-message"></div>
        </div>
        
        <div id="customerReview"></div>
    </article>       
`;

const createFavoriteRestaurantsTemplate = (restaurant) => `
    <article class="post-item" style="margin-bottom: 10px;">
        <img class="post-item__thumbnail lazyload"
                data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}"
                alt="${restaurant.name}">
        <div class="post-item__content">
            <div class="rating">
                <p>Kota: <span class="post-item__city">${restaurant.city}</span></p>
                <p>⭐️<span style="font-weight: bold;"> ${restaurant.rating}</span></p>
            </div>
            <h1><a class="post-item__title" href="#/detail/${restaurant.id}">${restaurant.name}</a></h1>
            <p tabindex="0" class="post-item__description">${restaurant.description}</p>
        </div>
        <a href="#/detail/${restaurant.id}" class=detail-link>More Detail</a>
    </article>       
`;

const createRestaurantCustomerReviewTemplate = (reviews) => `
    <h1 tabindex="0">Consumer Review</h1>
    <ul class="cards">
        ${reviews.customerReviews.map((review) => `
        <li class="cards_item">
            <div class="card">
                <div class="card_image">
                    <picture>
                        <source media="(max-width: 600px)" srcset="${userReviewSmallImage}">
                        <img class="img-consumer-review" alt="user-review-icon"
                            src="${userReviewLargeImage}"></img>
                    </picture>
                    
                </div>
                <div class="card_content">
                    <h2 tabindex="0" class="card_title">${review.name}</h2>
                    <p tabindex="0" class="card_text">"${review.review}"</p>
                    <p tabindex="0" style="font-size:smaller;">${review.date}</p>
                </div>
            </div>
        </li>
        `).join('')}    
    </ul>
`;

const createLikeRestaurantButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
    createRestaurantPostTemplate,
    createSkeletonRestaurantTemplate,
    createRestaurantItemTemplate,
    createFavoriteRestaurantsTemplate,
    createRestaurantCustomerReviewTemplate,
    createLikeRestaurantButtonTemplate,
    createUnlikeRestaurantButtonTemplate,
};