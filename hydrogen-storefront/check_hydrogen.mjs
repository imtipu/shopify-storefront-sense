import * as hydrogenVite from '@shopify/hydrogen/vite';
console.log(Object.keys(hydrogenVite));
if (hydrogenVite.hydrogen) {
  console.log('hydrogen type:', typeof hydrogenVite.hydrogen);
  console.log('hydrogen properties:', Object.keys(hydrogenVite.hydrogen));
}
