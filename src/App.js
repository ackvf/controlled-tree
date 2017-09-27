import React, { Component } from 'react';


import './develstyle.css'

import TreeComponent, {getIn} from './treeComponent/treeComponent'
import {data, asyncData, emptyData, emptyRootArray, dataWithRootOnly} from './treeComponent/exampleData'
let nextAsyncDataCounter = 0

class App extends Component {

  defaultCallBacks = {
    onNodeExpand: ({title, path, type}, ...rest) => {
      this.input.value = JSON.stringify(path)
      this.textarea.value = JSON.stringify(getIn(data, path))

      if (type === 'branch') console.debug('callback %cBranch expanding', 'background: #866; color: #bada55', title, path)
      if (type === 'root')   console.debug('callback %cRoot expanding', 'background: #866; color: #bada55', title, path)
    },
    onNodeShrink: ({title, path, type}, ...rest) => {
      if (type === 'branch') console.debug('callback %cBranch shrinking', 'background: #866; color: #bada55', title, path)
      if (type === 'root')   console.debug('callback %cRoot shrinking', 'background: #866; color: #bada55', title, path)
    },
    onLeafSelect: ({title, path}, ...rest) => {
      console.debug('callback %cLeaf clicked', 'background: #686; color: #bada55', title, path, rest)
    }
  }

  state = {
    ...this.defaultCallBacks,
    className: 'elegant'
  }

  changeCallbacks1 = () => {
    this.setState(this.defaultCallBacks)
  }

  changeCallbacks2 = () => {
    this.setState({
      onNodeExpand: args => console.debug('node clicked',  args),
      onNodeShrink: args => console.debug('node clicked',  args),
      onLeafSelect: args => console.debug('node clicked',  args)
    })
  }

  changeData1 = () => {
    this.replaceData(data)
  }

  changeData2 = () => {
    this.replaceData(dataWithRootOnly)
  }

  changeClass1 = () => {
    this.setState({className: 'elegant'})
  }

  changeClass2 = () => {
    this.setState({className: ''})
  }

  handleDataUpdate = () => {
    const data = this.textarea.value
    const path = this.input.value

    if (!data || !path) return false

    let parsedData, parsedPath
    try {
      parsedData = JSON.parse(data)
      parsedPath = JSON.parse(path)
    } catch (e) { return false }

    this.updateData(parsedPath, parsedData)
  }

  changeTextareaValue = value => {
    this.textarea.value = JSON.stringify(value)
  }


  // ---

  tree2UpdateData = undefined

  onTree2NodeClick = ({type, path, expanded, items, title}) => {
    console.debug('onTree2NodeClick', type, title, expanded, path, items.length)

    if (type !== 'root' && type !== 'branch') return
    if (!expanded) return
    if (items) return

    if (type === 'root') {
      setTimeout(
        () => {
          this.tree2UpdateData(path, emptyRootArray)
        },
        1000
      )
      return null
    }

    const asyncDataKeys = Object.keys(asyncData)
    const selectedKey = asyncDataKeys[nextAsyncDataCounter % asyncDataKeys.length]
    nextAsyncDataCounter++

    setTimeout(
      () => {
        console.debug('path, selectedKey', path, selectedKey)
        this.tree2UpdateData(path, asyncData[selectedKey])
      },
      3000
    )

  }

  render() {
    const Margin = () => <div style={{marginBottom: '20px'}}/>

    return (
      <div className="App">

        <div style={{display: 'flex'}}>
          <TreeComponent
            caption={<span>Expanded TreeComponent<br/><small>(click here to toggle expansion)</small></span>}
            data={data}
            // --
            onNodeExpand={this.state.onNodeExpand}
            onNodeShrink={this.state.onNodeShrink}
            onLeafSelect={this.state.onLeafSelect}
            getUpdateDataCallback={cb => this.updateData = cb}
            getReplaceDataCallback={cb => this.replaceData = cb}
            // --
            loadingAnimationDuration={20000}
            expanded
            customStyleClass={this.state.className}
            style={{width: '40%'}}
            seeRenders
          />

          <div style={{width: '50%'}}>
            <p>{`<-- This is connected to the tree on left`}</p>
            <i>watch re-renders in console on any data change</i>

            <Margin/>
            <hr/>

            change callbacks:
            <button onClick={this.changeCallbacks1}>default</button>
            <button onClick={this.changeCallbacks2}>dummy</button>

            <br/>
            change data:
            <button onClick={this.changeData1}>default</button>
            <button onClick={this.changeData2}>empty</button>

            <br/>
            change style:
            <button onClick={this.changeClass1}>default</button>
            <button onClick={this.changeClass2}>native</button>

            <Margin/>

            Expand any branch node to update content<br/>
            Update [items] at
            <input
              ref={r => this.input = r}
              type='text'
              style={{width: '100%'}}
            />
            example data:<br/>
            {Object.keys(asyncData).map(key => <button key={key} onClick={() => this.changeTextareaValue(asyncData[key])}>{key}</button>)}
            <br/>
            <button onClick={this.handleDataUpdate}>save (replace)</button>

            <textarea
              ref={r => this.textarea = r}
              style={{width: '100%', height: '100%'}}
              defaultValue={JSON.stringify(data)}
            ></textarea>
          </div>

          <TreeComponent
            style={{width: '40%'}}
            caption='Collapsed Empty Tree (click here)'
            data={emptyData}
            loadingAnimationDuration={3000}
            onNodeExpand={this.onTree2NodeClick}
            getUpdateDataCallback={cb => this.tree2UpdateData = cb}
            customStyleClass='elegant'
            seeRenders
          />

        </div> {/* flex end */}

      </div>
    );
  }
}

export default App;
