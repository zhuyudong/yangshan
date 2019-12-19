import React from 'react'
import { Link } from 'react-router'
import { Button, Icon } from 'antd'
import Frame from '@src/components/Frame'
import MarkdownView from '@src/components/MarkdownView'
import PageContainer from '@src/components/PageContainer'
// import './styles.less'

export default locale => {
  const localePath = locale === 'en' ? './en' : '.'
  const { search } = location
  const match = search.match(/title=(.+)&?/)
  const title = match && decodeURIComponent(match[1])

  return () => (
    <Frame menuWidth={260}>
      <PageContainer routerId={'docs'}>
        <div className="btn-confirm">
          <Link to="/docs/new">
            <Button id="btn-newdoc">
              <Icon type="plus" />
              新建文档
            </Button>
          </Link>
        </div>
        {!title && (
          <MarkdownView>{require(`${localePath}/index.md`)}</MarkdownView>
        )}
        {title && (
          <MarkdownView>{require(`${localePath}/${title}`)}</MarkdownView>
        )}
      </PageContainer>
    </Frame>
  )
}
