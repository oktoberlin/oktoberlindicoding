import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class RestoranSource {
  static async daftarRestoran() {
    const errorMessage = document.getElementById('error-message');
    const loader = document.getElementById('loading');

    const response = await fetch(API_ENDPOINT.DAFTAR_RESTORAN)
    .catch((error) => {
      loader.style.display = 'none';
      errorMessage.innerHTML = `Error: ${error.message}.`;
    });

    if (!response.ok) { // to check whether the request is failed or not
      loader.style.display = 'none';
      errorMessage.innerHTML = `Error: ${response.status}. ${response.message}. Failed to Fetch.`;
    }
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestoran(id) {
    const errorMessage = document.getElementById('error-message');
    const loader = document.getElementById('loading');

    const response = await fetch(API_ENDPOINT.DETAIL(id))
    .catch((error) => {
      loader.style.display = 'none';
      errorMessage.innerHTML = `Error: ${error.message}.`;
    });

    if (!response.ok) {
      loader.style.display = 'none';
      errorMessage.innerHTML = `Error ${response.status}: ${response.message}. Failed to Fetch.`;
    }
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async postReview(review) {
    const formMessage = document.getElementById('form-review-message');
    const loaderPostReview = document.getElementById('loading-post-review');
    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `${CONFIG.KEY}`,
      },
      body: JSON.stringify(review),
    })
    .catch((error) => {
      loaderPostReview.style.display = 'none';
      formMessage.innerHTML = `Error: ${error.message}.`;
    });
    if (response.ok) {
      setTimeout(() => {
        formMessage.innerHTML = '<p>Terima kasih atas Reviewnya. Review anda telah tersimpan. Anda bisa melihat review anda di kolom Consumer Review dengan merefresh halaman ini setelah beberapa saat.</p>';
        loaderPostReview.style.display = 'none';
      }, 3000);
    } else {
      loaderPostReview.style.display = 'none';
      formMessage.innerHTML = `Error ${response.status}: ${response.message}. Failed to send the data to the server.`;
    }
    return response.customerReviews;
  }
}

export default RestoranSource;