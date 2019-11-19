import React, { Fragment } from 'react'
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

const CustomCodeView = ({ dependencies, ...rest }) => (
  <CodeView
    {...rest}
    theme='dark'
    babelOptions={babelOptions}
    buttonClassName='rs-btn-subtle rs-btn-icon-circle'
    dependencies={{ ...dependencies, Paragraph, Divider }}
  />
)

const createComponentExample = ({
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
      path: `https://github.com/rsuite/rsuite.github.io/tree/master/src/pages/${category}/${namePath}${item}.md`
    }))
    const extraDependencies = getDependencies ? getDependencies(locale) : null

    if (extraDependencies) {
      dependencies = Object.assign(dependencies, extraDependencies)
    }

    class ComponentExample extends React.Component {
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

            <ButtonGroup size='xs'>
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
        const { source = '' } = tabExamples[tabIndex] || {}
        return (
          <PageContainer
            designHash={designHash}
            routerId={routerId ? `${category}/${routerId}` : null}
          >
            <MarkdownView>{header}</MarkdownView>
            {componentExamples.map((item, index) =>
              item.source ? (
                <CustomCodeView
                  key={index}
                  source={item.source}
                  dependencies={dependencies}
                  renderToolbar={showCodeButton => {
                    return (
                      item.showSource && (
                        <React.Fragment>
                          <CopyToClipboard onCopy={this.onCopy} text={source}>
                            <Fragment>
                              <Whisper
                                placement='top'
                                speaker={<Tooltip>Copy to clipboard</Tooltip>}
                              >
                                <IconButton
                                  appearance='subtle'
                                  icon={<Icon icon='copy' />}
                                  circle
                                  size='xs'
                                />
                              </Whisper>{' '}
                            </Fragment>
                          </CopyToClipboard>
                          <Whisper
                            placement='top'
                            speaker={<Tooltip>Show the source</Tooltip>}
                          >
                            {showCodeButton}
                          </Whisper>{' '}
                          <Whisper
                            placement='top'
                            speaker={
                              <Tooltip>See the source on GitHub</Tooltip>
                            }
                          >
                            <IconButton
                              disabled
                              appearance='subtle'
                              icon={<Icon icon='github' />}
                              circle
                              size='xs'
                              target='_blank'
                              href={item.path}
                            />
                          </Whisper>
                        </React.Fragment>
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

export default createComponentExample
