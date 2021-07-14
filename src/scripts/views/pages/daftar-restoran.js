import RestoranSource from '../../data/restoran-source';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { createRestaurantPostTemplate, createSkeletonRestaurantTemplate } from '../templates/template-creator';
import '../../components/loading-indicator';

const DaftarRestoran = {
    render() {
      return `
      <head-line></head-line>
      <div class="latest">
        <h1 class="latest__label">Daftar Restoran</h1>
        <loading-element></loading-element>
        <error-message></error-message>
        <div id="posts" class="posts">
          ${createSkeletonRestaurantTemplate(20)}
        </div>
      </div>
      `;
    },

    async afterRender() {
      const loader = document.getElementById('loading');
      loader.style.display = 'block';

      const posts = await RestoranSource.daftarRestoran();
      const RestaurantContainer = document.querySelector('#posts');
      RestaurantContainer.innerHTML = '';

      posts.forEach((restaurant) => {
        RestaurantContainer.innerHTML += createRestaurantPostTemplate(restaurant);
        loader.style.display = 'none';
      });
    },
};

export default DaftarRestoran;