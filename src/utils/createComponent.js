import React, { Fragment, Component } from 'react'
import { get } from 'lodash/object'
import {
  Divider,
  Icon,
  ButtonGroup,
  Button,
  IconButton,
  Tooltip,
  Whisper,
  Alert
} from 'rsuite'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import PageContainer from '@src/components/PageContainer'
import Paragraph from '@src/components/Paragraph'
import MarkdownView from '@src/components/MarkdownView'
import CodeView from '@src/components/CodeView'
import components from '@src/component.config.json'
import { getDict } from '@src/locales'

const babelOptions = {
  presets: ['env', 'stage-1', 'react'],
  plugins: ['transform-class-properties']
}
const embedStart =
  '\n<!--start-code-->\n<div class="doc-highlight"><pre><code class="javascript"><span class="hljs-keyword">const</span> $source = <span class="hljs-string">`'
// const embedEnd = `\`</span>
// <span class="hljs-keyword">const</span> CodeSandbox = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
//   <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Embed</span> <span class="hljs-attr">source</span>=<span class="hljs-string">{$source}</span> /&gt;</span>
// }
// ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">CodeSandbox</span> /&gt;</span>)</span></code></pre></div><!--end-code--><!--divider-->\n`
const embedEnd = `\`</span>
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Embed</span> <span class="hljs-attr">source</span>=<span class="hljs-string">{$source}</span> /&gt;</span>)</span></code></pre></div><!--end-code--><!--divider-->\n`
const CustomCodeView = ({ dependencies, ...rest }) => (
  <CodeView
    {...rest}
    theme="dark"
    babelOptions={babelOptions}
    buttonClassName="rs-btn-subtle rs-btn-icon-circle"
    dependencies={{ ...dependencies, Paragraph, Divider }}
  />
)

const createComponent = ({
  id,
  examples = [],
  getDependencies,
  showSource = true,
  dependencies = {},
  category = 'components'
}) => {
  return locale => {
    const name = id // _.kebabCase(id)
    const dist = getDict(locale)
    const namePath = locale === 'en' ? `${name}/en/` : `${name}/`
    const context = require(`@src/pages/${category}/${namePath}index.md`)
    const componentExamples = examples.map(item => ({
      showSource,
      source: require(`@src/pages/${category}/${namePath}${item}.md`),
      path: `https://github.com/zhuyudong/yangshan/blob/master/src/pages/${category}/${namePath}${item}.md`
    }))
    /* 将 index.md 中的代码插入 */
    if (context.match(/class="javascript"/)) {
      // 使用 react-runkit 执行 md 文件中的 js 代码块
      const codes = context
        // .replace(
        //   /<div class="doc-highlight">/g,
        //   '\n<!--start-code-->\n<div class="doc-highlight">'
        // )
        // .replace(
        //   /<\/code><\/pre><\/div>/g,
        //   '</code></pre></div><!--end-code--><!--divider-->\n'
        // )
        .replace(
          /<div class="doc-highlight">/g,
          // /<div class="doc-highlight"><pre><code class="javascript"><span class="hljs-built_in">/g,
          embedStart
        )
        .replace(/<\/code><\/pre><\/div>/g, embedEnd)
        .split('<!--divider-->')
        .filter(i => i.match(/<!--end-code-->/))
      codes.forEach((i, ix) => {
        componentExamples.splice(ix, 0, {
          showSource,
          source: i,
          path: ''
        })
      })
    }
    const extraDependencies = getDependencies ? getDependencies(locale) : null

    if (extraDependencies) {
      dependencies = Object.assign(dependencies, extraDependencies)
    }

    class ComponentExample extends Component {
      static defaultProps = {
        tabExamples: []
      }

      constructor(props) {
        super(props)
        let component =
          components.find(
            i =>
              i.id === id ||
              i.name === id ||
              (i.children || []).some(
                j => `${i.id}/${j.id}` === id || j.id === id
              )
          ) || {}
        if (component.id !== id) {
          component =
            component.children.find(
              i => i.id === id || `${component.id}/${i.id}` === id
            ) || {}
        }
        const tabIndex = sessionStorage.getItem(`${id}-tab-index`)
        this.state = {
          tabIndex: tabIndex ? +tabIndex : 0,
          designHash: get(component, 'designHash'),
          routerId: id // get(component, 'id')
        }
      }

      renderExampleByTabIndex() {
        const { tabExamples } = this.props
        const { tabIndex } = this.state

        if (!tabExamples.length) {
          return null
        }

        const { sorce = '' } = tabExamples[tabIndex] || {}
        return (
          <CustomCodeView
            key={tabIndex}
            source={sorce}
            dependencies={dependencies}
          />
        )
      }

      renderTabs() {
        const { tabExamples } = this.props
        const { tabIndex } = this.state

        if (!tabExamples.length) {
          return null
        }
        return (
          <div>
            <h3>{dist.common.advanced} </h3>
            <ButtonGroup size="xs">
              {tabExamples.map((item, index) => (
                <Button
                  key={index}
                  appearance={index === tabIndex ? 'primary' : 'default'}
                  onClick={() => {
                    this.setState({ tabIndex: index })
                    sessionStorage.setItem(`${id}-tab-index`, index)
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        )
      }

      onCopy = () => {
        Alert.success('Copy success!')
      }

      render() {
        const { tabExamples = [], children } = this.props

        const { designHash, routerId, tabIndex } = this.state
        const [header, footer = ''] = context.split('<!--{demo}-->')
        // .replace(/<[a-z]+\s*(class=\"[a-z-_\s]+\")?>/g, '\n').replace(/<\/code>|<\/pre>|<\/span>|<\/div>/g, '')
        const { source = '' } = tabExamples[tabIndex] || {}
        return (
          <PageContainer
            designHash={designHash}
            routerId={routerId ? `${category}/${routerId}` : null}
          >
            {!!examples.length && <MarkdownView>{header}</MarkdownView>}
            {componentExamples.map((item, index) =>
              item.source ? (
                <CustomCodeView
                  key={index}
                  source={item.source}
                  dependencies={dependencies}
                  renderToolbar={showCodeButton => {
                    return (
                      item.showSource && (
                        <Fragment>
                          <CopyToClipboard onCopy={this.onCopy} text={source}>
                            <Fragment>
                              <Whisper
                                placement="top"
                                speaker={<Tooltip>Copy to clipboard</Tooltip>}
                              >
                                <IconButton
                                  appearance="subtle"
                                  icon={<Icon icon="copy" />}
                                  circle
                                  size="xs"
                                />
                              </Whisper>{' '}
                            </Fragment>
                          </CopyToClipboard>
                          <Whisper
                            placement="top"
                            speaker={<Tooltip>Show the source</Tooltip>}
                          >
                            {showCodeButton}
                          </Whisper>{' '}
                          <Whisper
                            placement="top"
                            speaker={
                              <Tooltip>See the source on GitHub</Tooltip>
                            }
                          >
                            <IconButton
                              disabled
                              appearance="subtle"
                              icon={<Icon icon="github" />}
                              circle
                              size="xs"
                              target="_blank"
                              href={item.path}
                            />
                          </Whisper>
                        </Fragment>
                      )
                    )
                  }}
                />
              ) : null
            )}
            {this.renderTabs()}
            {this.renderExampleByTabIndex()}
            <MarkdownView>{footer}</MarkdownView>
            {children}
          </PageContainer>
        )
      }
    }

    return ComponentExample
  }
}

export default createComponent
