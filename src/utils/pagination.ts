const port = process.env.PORT || 3000;

const urlBase = process.env.APP_URL_PRODUCTION ? `${process.env.APP_URL_PRODUCTION}` : `http://localhost:${port}`;
const pageString = '?page=';

const calculatePage = async (total: number, page: number, url: any) => {
  const currentPage: number = Math.ceil(page / 10);
  const totalPages = Math.ceil(total / 10);
  const previos = currentPage === 1 || currentPage > totalPages + 1 ? undefined : currentPage - 1;
  const next = totalPages < currentPage + 1 ? undefined : currentPage + 1;
  return {
    page: urlBase + url + pageString + currentPage,
    next: next ? urlBase + url + pageString + next : undefined,
    previus: previos ? urlBase + url + pageString + previos : undefined,
    lastpage: totalPages === 0 ? undefined : urlBase + url + pageString + totalPages,
    count: totalPages,
  };
};

export default {
  calculatePage,
};
