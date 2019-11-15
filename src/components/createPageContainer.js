import React from 'react'
import PageContainer from './PageContainer'
import MarkdownView from './MarkdownView'

const createPageContainer = ({ routerId }) => {
  console.log(6, routerId)
  return locale => {
    const localePath = locale === 'en' ? '/en/' : '/'
    const content = require(`@src/pages/${routerId}${localePath}index.md`)
    class PageContainerWithContent extends React.Component {
      render() {
        return (
          <PageContainer routerId={routerId}>
            <MarkdownView>{content}</MarkdownView>
          </PageContainer>
        )
      }
    }

    return PageContainerWithContent
  }
}

export default createPageContainer
