import { PropTypes } from 'react';

export const eventTypes = {
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragExit: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func
};

export const extractEvents = props => (
  [
    ['onClick', props.onClick],
    ['onContentMenu', props.onContentMenu],
    ['onDoubleClick', props.onDoubleClick],
    ['onDrag', props.onDrag],
    ['onDragEnd', props.onDragEnd],
    ['onDragEnter', props.onDragEnter],
    ['onDragExit', props.onDragExit],
    ['onDragLeave', props.onDragLeave],
    ['onDragOver', props.onDragOver],
    ['onDragStart', props.onDragStart],
    ['onDrop', props.onDrop],
    ['onMouseDown', props.onMouseDown],
    ['onMouseEnter', props.onMouseEnter],
    ['onMouseLeave', props.onMouseLeave],
    ['onMouseMove', props.onMouseMove],
    ['onMouseOut', props.onMouseOut],
    ['onMouseOver', props.onMouseOver],
    ['onMouseUp', props.onMouseUp]
  ]
    .filter(tuple => tuple[1])
    .reduce((eventObj, [key, value]) => {
      eventObj[key] = value;
      return eventObj;
    }, {})
);

export const applyEvents2Selection = (events, selection) => {
  Object.keys(events)
    .map(name => ({
      name: name.replace(/^on/, '').toLowerCase(), // react expects event names (https://facebook.github.io/react/docs/events.html#mouse-events)
                                                   // while D3 expects event types (https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events)
      value: events[name]                          // TODO - this won't work for onDoubleClick
    }))
    .forEach(({ name, value }) => selection.on(name, value));

  return selection;
};
