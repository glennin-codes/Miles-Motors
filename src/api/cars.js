import client from './client';

/**
 * Fetch cars with pagination. Returns { data, total, page, limit }.
 * @param {{ page?: number, limit?: number, name?: string, brand?: string }} params
 */
export async function getCars(params = {}) {
  const { page = 1, limit = 10, name, brand } = params;
  const { data } = await client.get('/cars/all', { params: { page, limit, name, brand } });
  return data && typeof data === 'object' && Array.isArray(data.data)
    ? { data: data.data, total: data.total ?? 0, page: data.page ?? 1, limit: data.limit ?? limit }
    : { data: [], total: 0, page: 1, limit };
}

export async function getCarById(carID) {
  const { data } = await client.get(`/car/${carID}`);
  if (data.code !== 1) throw new Error(data.msg || 'Car not found');
  return data.data;
}

/**
 * Recommended/similar cars for a single car page: same brand first, then other brands.
 * Returns { data, totalSameBrand, totalOtherBrand, total }.
 */
export async function getRecommendedCars(carID, params = {}) {
  const { limit = 8, offset = 0 } = params;
  const { data } = await client.get(`/cars/recommended/${carID}`, { params: { limit, offset } });
  return data;
}

/** Admin: upload image files. Returns { keys: string[] } to use as carImg, image2, ... */
export async function uploadCarImages(files) {
  const form = new FormData();
  for (let i = 0; i < files.length; i++) {
    form.append('images', files[i]);
  }
  const { data } = await client.post('/car/upload-images', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (data.code !== 1) throw new Error(data.msg || 'Upload failed');
  return data.keys;
}

/** Admin: create car. body: carName, carType, color, transmission, fuel, engine, mileage, price, description, carImg, image2, ... */
export async function createCar(body) {
  const { data } = await client.post('/car', body);
  if (data.code !== 1) throw new Error(data.msg || 'Failed to add car');
  return data;
}

/** Admin: update car. body: same as create (carName, carType, ..., carImg, image2, ...). */
export async function updateCar(carID, body) {
  const { data } = await client.put(`/car/${carID}`, body);
  if (data.code !== 1) throw new Error(data.msg || 'Update failed');
  return data;
}

/** Admin: delete car */
export async function deleteCar(carID) {
  const { data } = await client.delete(`/car/${carID}`);
  if (data.code !== 1) throw new Error(data.msg || 'Delete failed');
  return data;
}
