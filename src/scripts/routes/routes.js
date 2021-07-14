import DaftarRestoran from '../views/pages/daftar-restoran';
import DetailRestoran from '../views/pages/detail-restoran';
import RestoranFavorit from '../views/pages/restoran-favorit';

const routes = {
  '/': DaftarRestoran, // default page
  '/detail/:id': DetailRestoran,
  '/favorit': RestoranFavorit,
};

export default routes;