
export const fetchAllSourceData = async (keyword = '') => {
    const newsApiEndpoint = `https://newsapi.org/v2/everything?q=${keyword ? keyword : 'keyword'}&apiKey=0d728f5416e54ea291be295679d4ac3c`;
    const nyTimesApiEndpoint = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=SDUKwYTwMwK3nvn3ug9rfsKIDx74udhE`;
    const guardianApiEndpoint = `https://content.guardianapis.com/search?q=${keyword}&api-key=1fc379ea-9faa-4df3-a34c-73f748e66ae7`;
    try {
        const [newsApiResponse, nyTimesApiResponse, guardianApiResponse] = await Promise.all([
            fetch(newsApiEndpoint),
            fetch(nyTimesApiEndpoint),
            fetch(guardianApiEndpoint)
        ]);

        const [newsData, nyTimesData, guardianData] = await Promise.all([
            newsApiResponse.json(),
            nyTimesApiResponse.json(),
            guardianApiResponse.json()
        ]);

        const newsOrgFormatedData = formatApiResponse(newsData?.articles, 'newsOrg');
        const nykTimesFomrmatedData = formatApiResponse(nyTimesData?.response?.docs, 'nykTimes');
        const guardianFormatedData = formatApiResponse(guardianData?.response?.results, 'guardian');
        const combinedNewsData = [...newsOrgFormatedData, ...nykTimesFomrmatedData, ...guardianFormatedData]
        return combinedNewsData;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const formatApiResponse = (response = [], source = '') => {
    const formattedRes = response.map((resObj, index) => {
        return {
            keyword: source === 'guardian' ? resObj?.sectionName : source === 'nykTimes' ? '' : '',
            publishDate: source === 'guardian' ? resObj?.webPublicationDate : source === 'nykTimes' ? resObj?.pub_date : resObj?.publishedAt,
            category: source === 'guardian' ? resObj?.pillarName : source === 'nykTimes' ? resObj?.section_name : '',
            source: source === 'guardian' ? 'The Guardian' : source === 'nykTimes' ? 'The New York Times' : 'News Org',
            author: source === 'guardian' ? '' : source === 'nyktimes' ? resObj?.byline?.original : resObj.author,
            link: source === 'guardian' ? resObj?.webUrl : source === 'nykTimes' ? resObj?.web_url : resObj.url,
            imageUrl: source === 'newsOrg' ? resObj?.urlToImage : 'https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            title: source === 'guardian' ? resObj?.webTitle : source === 'nykTimes' ? resObj?.headline?.main : resObj.title,
            id: `newsData${index}`
        }
    })
    return formattedRes;
}

export const formatDate = (data = '') => {
    const dateObject = new Date(data);
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString('default', { month: 'short' });;
    const day = dateObject.getDate();
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate;
}

export const filterNewsByKey = (newsArray, targetKey, keyword) => {
    const filteredNews = newsArray.filter(newsItem => {
        return newsItem[targetKey]?.toLowerCase() === keyword?.toLowerCase();
    });
    return filteredNews;
}

export const filterDataByDate = (data, targetDate) => {
    if (typeof targetDate === 'string') {
        targetDate = new Date(targetDate);
    }
    const filteredData = data.filter(item => {
        const itemDate = new Date(item.publishDate);
        return itemDate.toDateString() === targetDate.toDateString();
    });
    return filteredData;
}

export const getUniqueArray = (array, key) => {
    var map = new Map();
    let uniqueObjects = array.filter((obj) => {
        if (map.get(obj[key])) {
            return false;
        }
        map.set(obj[key], obj);
        return true;
    });
    return uniqueObjects
}
