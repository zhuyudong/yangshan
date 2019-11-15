import React from 'react'
import Frame from '@src/components/Frame'
import MarkdownView from '@src/components/MarkdownView'
import PageContainer from '@src/components/PageContainer'

export default locale => {
  const localePath = locale === 'en' ? './en' : '.'
  return () => (
    <Frame showSubmenu={false}>
      <PageContainer routerId={'extensions'}>
        <MarkdownView>{require(`${localePath}/index.md`)}</MarkdownView>
      </PageContainer>
    </Frame>
  )
}
