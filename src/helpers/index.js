const pagination = (limit, page, arrayOfItems) => {
  if (!limit || !page) {
    return {
      data: arrayOfItems,
      metadata: {}
    }
  } else {
    const pages = Math.round(arrayOfItems.length / parseInt(limit, 10));
    const start = (page * limit) - limit;
    const end = page * limit;
    const paginatedItems = arrayOfItems.slice(start, end);
  
    return {
      data: paginatedItems,
      metadata: {
        pages,
        page,
        limit,
      }
    }
  }
}

const search = (items, searchString) => {
  
  const truthy = (element) => element;

  if (!searchString) {
    return items;
  } else {
    const result = items && items.filter((item) => {
      const matchesSearchTerm = [
        item.name.toLowerCase().match(new RegExp(searchString.toLowerCase(), 'g')),
        item.grade.toLowerCase().match(new RegExp(searchString.toLowerCase(), 'g')),
        item.storageSize.toLowerCase().match(new RegExp(searchString.toLowerCase(), 'g')),
        item.price.toLowerCase().match(new RegExp(searchString.toLowerCase(), 'g')),
      ];
      return matchesSearchTerm.some(truthy);
    });
  
    return result;
  }
}

export {
  pagination,
  search
};
