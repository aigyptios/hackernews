import axios from 'axios';

class NewsLoader {

    constructor(baseURL, promise, thenWhat) {
        this.baseURL = baseURL;
        this.promise = promise;
        this.thenWhat = thenWhat;
        this.interval = 30;
        this.start = 0;
        this.end = this.start + this.interval;
        this.max = 0;
        this.promise.then( response => {
            this.max = response.data.length;
        });
    }

    load() {
        return this.next();
    }

    next() {
        let start = this.start;
        let end = this.end;
        this.promise.then(response => {

            let itemIDs = response.data;
            let subset  = itemIDs.slice(start, end);
            let gets    = subset.map( id => axios.get(this.baseURL + 'item/' + id + '.json') );

            axios.all(gets)
                .then(axios.spread(function(...args){
                    // args is an array of all the "item" objects
                    // therefore, extract each story from the item
                    return args.map(( story, i ) => Object.assign( {}, story.data, {no: start + i + 1} ));
                }))
                .then(this.thenWhat);
        });
        this.start = this.end;
        this.end += this.interval;
        return this;
    }

}

class NewService {

    constructor() {
        this.baseURL = 'https://hacker-news.firebaseio.com/v0/';

        let newsTypes = [{
            endpoint: 'top',
            fnName: 'getTopNews',
            text: 'Top',
            title: 'Top News'
        }, {
            endpoint: 'new',
            fnName: 'getLatestNews',
            text: 'Latest',
            title: 'Latest News'
        },{
            endpoint: 'best',
            fnName: 'getBestNews',
            text: 'Best',
            title: 'Best News'
        }, {
            endpoint: 'job',
            fnName: 'getJobNews',
            text: 'Jobs',
            title: 'Jobs'
        }, {
            endpoint: 'show',
            fnName: 'getShowNews',
            text: 'Show HN',
            title: 'Show HN'
        }, {
            endpoint: 'ask',
            fn: 'getAskStories',
            text: 'Ask HN',
            title: 'Ask HN'
        }];

        let functions = {};
        newsTypes.forEach(type => {
            functions[ type.fnName ] = (thenWhat) => {
                return new NewsLoader( this.baseURL, axios.get( this.baseURL + type.endpoint + 'stories.json' ), thenWhat ).load();
            }
        });
        Object.assign( this, functions, { availableNewsTypes: newsTypes } );
    }

}

export default new NewService()
