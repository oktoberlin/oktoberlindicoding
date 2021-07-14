import UrlParser from '../../routes/url-parser';
import RestoranSource from '../../data/restoran-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favoriteRestaurant-idb';
import { createRestaurantItemTemplate, createRestaurantCustomerReviewTemplate } from '../templates/template-creator';
import '../../components/loading-indicator';
import '../../components/loading-post-review';
import '../../components/error-message';

const DetailRestoran = {
    render() {
      return `
      <loading-element></loading-element>
      <error-message></error-message>
      <div id="detailRestaurant" class="detailRestaurant"></div>
      <div id="likeButtonContainer"></div>
      `;
    },

    async afterRender() {
        // lazy load font awesome
        let scriptElement = document.querySelector('script[src="https://use.fontawesome.com/b070c8f1df.js"]');

        if (!scriptElement) {
          scriptElement = document.createElement('script');
          scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
          document.body.appendChild(scriptElement);
        }

        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const loader = document.getElementById('loading');
        loader.style.display = 'block';
        const restaurant = await RestoranSource.detailRestoran(url.id);

        const restaurantContainer = document.querySelector('#detailRestaurant');
        restaurantContainer.innerHTML = createRestaurantItemTemplate(restaurant);

        const customerReviewContainer = document.getElementById('customerReview');
        customerReviewContainer.innerHTML = createRestaurantCustomerReviewTemplate(restaurant);
        loader.style.display = 'none';

        const form = document.querySelector('#review-form');
        const formMessage = document.getElementById('form-review-message');

        /* Validating review form */
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.querySelector('#name');
          const review = document.querySelector('#review');
          const loaderPostReview = document.getElementById('loading-post-review');
          /* Sending data to API */
          if (name.value && review.value !== '') { // to avoid sending empty data
            formMessage.innerHTML = '';
            const dataInput = {
              id: url.id,
              name: name.value,
              review: review.value,
            };
            RestoranSource.postReview(dataInput);
            name.value = '';
            review.value = '';
            loaderPostReview.style.display = 'block';
          } else {
            formMessage.innerHTML = '<p>Kolom belum diisi semua</p>';
          }
        });

        LikeButtonPresenter.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteRestaurants: FavoriteRestaurantIdb,
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            rating: restaurant.rating,
            city: restaurant.city,
            pictureId: restaurant.pictureId,
          },
        });
    },
};

export default DetailRestoran;