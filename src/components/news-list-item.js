import React from 'react';

export default class NewsListItem extends React.Component {

    render() {
        let story = this.props.story;
        return (
            <li className="newslist__item" data-index={story.no}>
                <div className="item__title">
                    <a title={story.title} href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} >
                        {story.title}
                    </a>
                </div>
                <div className="item__score">{story.score}</div>
                <div className="item__by">
                    <a href={`https://news.ycombinator.com/user?id=${story.by}`}>{story.by}</a>
                </div>
                <div className="item__time">
                    <a href={`https://news.ycombinator.com/item?id=${story.id}`}>{(new Date(story.time * 1000)).toLocaleString()}</a>
                </div>
            </li>
        )
    }
}
