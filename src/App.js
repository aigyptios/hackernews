import React from 'react';
import newsService from './services/news.service';
import NewsList from './components/news-list';
import AppHeader from './components/app-header';

class App extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { stories: [] };
    this.newsLoader = {max: 0};

    this.links = newsService.availableNewsTypes.map(type => {
        // Create load function for type of news
        let loadFunction = () => {
            this.setState({
                stories: [],
                news: type.text,
                title: type.title
            });
            this.newsLoader = newsService[type.fnName](this.loadNewsFromData.bind(this));
        };

        // return link object
        return {
            text: type.text,
            endpoint: type.endpoint,
            load: loadFunction
        };
    });
  }

  componentDidMount() {
      this.links[0].load();
  }

  loadNewsFromData(data) {
    let stories = this.state.stories.concat(data);
    this.setState({ stories: stories });
  }

  loadNext() {
      this.newsLoader.next();
  }


  render() {
    return (
      <div className="app">
        <AppHeader
            news={this.state.news}
            links={this.links}
        />
        <NewsList
            maxStories={this.newsLoader.max}
            news={this.state.news}
            title={this.state.title}
            view={this.state.view}
            stories={this.state.stories}
            more={this.loadNext.bind(this)}/>
      </div>
    );
  }
}

export default App;
