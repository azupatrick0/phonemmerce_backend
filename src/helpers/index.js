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
    const arrayOfSearchString = searchString.toLowerCase().split(',');

    const result = items && items.filter((item) => {
      const matchesSearchTerm = [
        arrayOfSearchString.some(
          (element) => 
            item.name.toLowerCase().match(new RegExp(element.toString().trim().split(' ').join(' '), 'g'))
        ),
        arrayOfSearchString.some(
          (element) => 
            item.grade.toLowerCase().match(new RegExp(element.toString().trim().split(' ').join(' '), 'g'))
        ),
        arrayOfSearchString.some(
          (element) => 
            item.storageSize.toLowerCase().match(new RegExp(element.toString().trim().split(' ').join(' '), 'g'))
        ),
        arrayOfSearchString.some(
          (element) => 
            item.price.toLowerCase().match(new RegExp(element.toString().trim().split(' ').join(' '), 'g'))
        )
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
