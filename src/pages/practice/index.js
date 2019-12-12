import React from 'react'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import MarkdownView from '@src/components/MarkdownView'

export default locale => {
  const localePath = locale === 'en' ? './en' : '.'
  return () => {
    return (
      <Frame showSubmenu={false}>
        <PageContainer routerId="practice">
          <MarkdownView>{require(`${localePath}/index.md`)}</MarkdownView>
        </PageContainer>
      </Frame>
    )
  }
}
