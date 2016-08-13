import React from 'react';

export default class NewsListItem extends React.Component {

    render() {
        let story = this.props.story;
        return (
            <li className="newslist__item" data-index={story.no}>

                <a className="right" href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} >{story.title}</a>
                <div>
                    {story.score} point(s), posted by <a href={`https://news.ycombinator.com/user?id=${story.by}`}>{story.by}</a>
                    <br /> {(new Date(story.time * 1000)).toString()}
                  <br /><a href={`http://www.google.com?q=${story.title}`}>web</a>
                  <br /><a href={`https://news.ycombinator.com/item?id=${story.id}`}>discuss</a>
                </div>
            </li>
        )
    }
}
