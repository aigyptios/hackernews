import React from 'react';
import NewsListItem from './news-list-item';

export default class NewsList extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { view: 'grid' }
    }

    toggleView() {
        let view = ({list: 'grid', grid: 'list'})[this.state.view];
        this.setState({
          view: view
        });
    }

    render() {
        return (
            <div className="newsviewer">
                <h2 className="newsviewer__heading">{this.props.title}</h2>
                <button className="newsviewer__toggler" onClick={this.toggleView.bind(this)}>Toggle View</button>
                { this.props.stories.length ?
                    <ol className={this.state.view === 'list' ? 'newslist--list' : 'newslist--grid'}>
                      {
                        this.props.stories.map(story =>
                          <NewsListItem key={story.id} story={story} />
                        )
                      }
                    </ol>
                :
                    <div className="newsviewer__loading">Loading...</div>
                }
                { this.props.stories.length < this.props.maxStories ?
                    <button className="newsviewer__loader" onClick={this.props.more}>More</button>
                : '' }
            </div>
        )
    }

}
