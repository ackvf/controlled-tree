import React from 'react'
import PropTypes from 'prop-types'

import './treeComponent.css'

let seeRenders = false // set prop `seeRenders` to true when tweaking performance
// TODO: This is global for all instances of tree component now, make it unique per instance maybe?

/**
 * # TreeComponent
 *
 * ## Props
 * see PropTypes for type details
 *
 * - caption - string or jsx
 * - data - initial data
 * - expanded - true | false
 * - loadingAnimationDuration - milliseconds - should match your app ajax timeout
 * - className - override default class, default is 'tree'
 * - customStyleClass - appends custom class to the tree
 * - style - root element style
 * - seeRenders - for debugging
 *
 *
 * ## Callbacks
 *
 * - onNodeExpand
 * - onNodeShrink
 * - onLeafSelect
 *
 * ### onNodeExpand(params)
 *  params = {
 *    type: "node" | "root"
 *    path: node path array
 *    title
 *    ?items: number of child nodes (0 if unset)
 *    ?expanded: specifies user action (1:expanding, 0:shrinking)
 *  }
 *
 * ### onNodeShrink(params)
 *  same as onNodeExpand
 *
 * ### onLeafSelect(params)
 *  params = {
 *    type: "leaf"
 *    path: node path array
 *    title
 *  }
 *
 *
 * ## Exposed control functions
 *
 * - getUpdateDataCallback
 * - getReplaceDataCallback
 *
 * ### getUpdateDataCallback(updateDataAt)
 *  function updateDataAt(path, items)
 *    path: target node path array
 *    items: array of child items, if items=[], async request will be made on user click
 *
 * ### getReplaceDataCallback(replaceData)
 *  function replaceData(data)
 *    data: complete tree data to replace the root node
 *
 */

class TreeComponent extends React.PureComponent {

  state = {
    data: this.props.initialData,
    expanded: this.props.expanded,
    loadingAnimationDuration: this.props.loadingAnimationDuration
  }

  selectedLeaf = null // dom reference

  constructor(props) {
    super(props)
    // Attached exposed control functions
    if (this.props.getUpdateDataCallback) this.props.getUpdateDataCallback(this.updateDataAt)
    if (this.props.getReplaceDataCallback) this.props.getReplaceDataCallback(this.replaceData)

    seeRenders = this.props.seeRenders
  }

  getChildContext = () => ({
    expanded: this.state.expanded,
    loadingAnimationDuration: this.state.loadingAnimationDuration
  })

  toggleExpand = () => this.setState({ expanded: !this.state.expanded }, this.onRootClick)

  onRootClick = () => {
    const {data: {id, items}, expanded} = this.state
    this.onNodeAction({type: 'root', path: [], id, expanded, items: items.length})
  }

  selectLeaf = domNode => {
    if (this.selectedLeaf) this.selectedLeaf.classList.remove('selected')
    domNode.classList.add('selected')
    this.selectedLeaf = domNode
  }

  // Callbacks ----------------------------------------------------------------
  // Wrap provided callbacks to prevent re-renders

  onNodeAction = (params, e) => {
    if (params.type === 'leaf') {
      this.selectLeaf(e.target)
      this.props.onLeafSelect(params)
      return
    }

    // params.type === 'branch' or 'root'

    if (params.expanded) this.props.onNodeExpand(params)
    else this.props.onNodeShrink(params)
  }

  // This object is passed to children to abstract the callbacks (wrap references)
  childrenCallbacks = {
    onNodeAction: this.onNodeAction
  }

  // Exposed control functions ------------------------------------------------
  // *attached in constructor

  updateDataAt = (path, {items}) => {
    let newData = {...this.state.data} // shallowly mutate first level to cause rerender
    let expanded = !!path.length && this.state.expanded // set false to avoid automatic tree expansion on initial data
    mutateIn(newData, items, path)
    this.setState({
      data: newData,
      expanded
    })
  }

  replaceData = data => this.setState({data})

  // ------

  render() {
    const {caption, style, customStyleClass, className} = this.props
    const {data: {items}, expanded} = this.state

    /* render messages */ if (seeRenders) console.debug('%crender root  ', 'background: #668; color: #bada55', items)

    const treeClassName = `${className} ${customStyleClass}`

    return (
      <div className={treeClassName} style={style}>

        {caption && <p onClick={this.toggleExpand}>{caption}</p>}

        <ul>
          { items.length ? items.map(item => renderNode(item, [], this.childrenCallbacks)) : expanded && <Loading/> }
        </ul>

      </div>
    )
  }
}

const treeGlobalSettingsPropTypes = {
  expanded: PropTypes.bool,
  loadingAnimationDuration: PropTypes.number
}

TreeComponent.propTypes = {
  caption: PropTypes.any,
  customStyleClass: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  initialData: PropTypes.shape({
    id: PropTypes.string, // the root id of the data source
    items: PropTypes.array // can be empty array
  }),
  ...treeGlobalSettingsPropTypes,
  // --
  onLeafSelect: PropTypes.func,
  onNodeExpand: PropTypes.func,
  onNodeShrink: PropTypes.func,
  getUpdateDataCallback: PropTypes.func,
  getReplaceDataCallback: PropTypes.func,
  // --
  seeRenders: PropTypes.bool // for debugging
}

TreeComponent.defaultProps = {
  loadingAnimationDuration: 15000,
  className: 'tree',
  customStyleClass: '',
  onLeafSelect: () => {},
  onNodeExpand: () => {},
  onNodeShrink: () => {},
  initialData: {
    id: 'root',
    items: []
  }
}

TreeComponent.childContextTypes = {
  ...treeGlobalSettingsPropTypes
}

export default TreeComponent


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function renderNode({type, id, ...rest}, path, callbacks) {
  if (type === 'structure-group') return <Branch key={id} type='branch' id={id} {...rest} path={[...path, id]} callbacks={callbacks}/>
  if (type === 'page')            return <Leaf   key={id} type='leaf'   id={id} {...rest} path={[...path, id]} callbacks={callbacks}/>
}

// renderNode(item, path, callbacks) 
//   item = {
//     type: PropTypes.string.isRequired,   // structure-group || page
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     items: PropTypes.array               // if type === structure-group - this is very often undefined if async is used
//     location: PropTypes.string           // if type === page
//   }


// ----------------------------------------------------------------------------
class Branch extends React.PureComponent {

  state = {
    expanded: this.context.expanded && !!this.props.items.length
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // if a global expansion/shrink is invoked by pressing the tree title, only expand branches that already have items data, shrink any branch
    if (this.context.expanded !== nextContext.expanded && !!this.props.items.length) this.setState(
      {expanded: nextContext.expanded}, this.callOnNodeActionCallback
    )
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.expanded !== nextState.expanded) return true
    if (this.props.items !== nextProps.items) return true
    if (this.props.title !== nextProps.title) return true
    // if (this.props.callbacks !== nextProps.callbacks) return true // callbacks never change
    // if (this.props.path !== nextProps.path) return true // ignore path, it's always new instance
    return false
  }

  // componentDidMount() {
  //   // if tree is expanded by default and branch is empty, emit fake onClick event to request data from parent
  //   if (this.state.expanded && !this.props.items.length) setTimeout(this.callOnNodeActionCallback, 0)
  // }

  handleOnClick = () => this.setState( {expanded: !this.state.expanded}, this.callOnNodeActionCallback )

  callOnNodeActionCallback = () => {
    const {callbacks: {onNodeAction}, type, path, id, items, title} = this.props
    const {expanded} = this.state
    onNodeAction({type, path, id, expanded, items: items.length, title}/* , e */)
  }

  render() {
    const {title, path, items, callbacks} = this.props
    const {expanded} = this.state

    /* render messages */ if (seeRenders) console.debug('%crender branch', 'background: #866; color: #bada55', title, path, this.state.expanded && 'expanded')

    return (
      <li className={'branch' + (expanded ? ' expanded' : '')}>
        <span onClick={this.handleOnClick}> {title}</span>
        <ul>
          {items.length ? items.map(item => renderNode(item, path, callbacks)) : expanded && <Loading/>}
        </ul>
      </li>
    )
  }

}

Branch.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  callbacks: PropTypes.object.isRequired
}

Branch.defaultProps = {
  items: []
}

Branch.contextTypes = {
  expanded: PropTypes.bool
}


// ----------------------------------------------------------------------------
const Leaf = ({type, id, title, path, callbacks}) => {
  /* render messages */ if (seeRenders) console.debug('%crender leaf  ', 'background: #686; color: #bada55', title, path)
  return (
  <li className='leaf'>
    <span onClick={e => callbacks.onNodeAction({type, path, id, title}, e)}>{title}</span>
  </li>
)}

Leaf.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.array.isRequired,
  callbacks: PropTypes.object.isRequired
}


// ----------------------------------------------------------------------------
const Loading = (props, context) => {
  const selfTimeout = ref => ref && setTimeout(() => ref.innerHTML = 'timeout', context.loadingAnimationDuration)
  return <li ref={selfTimeout}><div className='loading'/></li>
}

Loading.contextTypes = {
  loadingAnimationDuration: PropTypes.number
}


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

export function getIn(where, path = []) {
  var segments = path instanceof Array ? [...path] : path.split('/')
  var segment = segments.shift()

  if (segment === undefined) return where.items
  const deeper = where.items.find(v => v.id === segment)
  if (deeper) return getIn(deeper, segments)
}

function mutateIn(where, what, path = []) {
  if (!(what instanceof Array)) console.error('Data must be in array')
  // Mutates the origin!
  var segments = path instanceof Array ? [...path] : path.split('/')
  var segment = segments.shift()

  if (segment === undefined) return where.items = what
  const deeper = where.items.find(i => i.id === segment)
  if (!deeper) return

  deeper.items = deeper.items ? [...deeper.items] : [] // mutate the reference to the container array to trigger a re-render
  mutateIn(deeper, what, segments)
}
