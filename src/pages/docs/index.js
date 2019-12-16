import React from 'react'
import { Link } from 'react-router'
import { Button, Icon, Divider } from 'antd'
import Frame from '@src/components/Frame'
import MarkdownView from '@src/components/MarkdownView'
import PageContainer from '@src/components/PageContainer'

export default locale => {
  const localePath = locale === 'en' ? './en' : '.'
  const { search } = location
  const match = search.match(/title=(.+)&?/)
  const title = match && decodeURIComponent(match[1])

  return () => (
    <Frame>
      <PageContainer routerId={'docs'}>
        <Divider orientation="right">
          <Link to="/docs/new">
            <Button className="btn-newdoc">
              <Icon type="plus" />
              新建文档
            </Button>
          </Link>
        </Divider>
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
