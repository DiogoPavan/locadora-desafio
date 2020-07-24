export default async function errorHandler(error, req, res, next) {
  return res.status(error.status || 500).json({ status: 'ERROR', error: error.message });
}
