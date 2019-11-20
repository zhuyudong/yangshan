import React from 'react'
import { Input, InputGroup, Icon, Panel, Carousel } from 'rsuite'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import sources from './sources'

export default () => {
  return () => (
    <Frame showSubmenu={false}>
      <PageContainer routerId="tools" className="masonry-block">
        <InputGroup className="masonry-search-input">
          <Input placeholder="搜索" />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
        <div className="masonry">
          {sources.map((i, ix) => (
            <a
              key={`${i.title}-${ix}`}
              href={i.href}
              target="__blank"
              className="opensource-card-href item"
            >
              <Panel bodyFill bordered className="opensource-card">
                <Panel
                  header={
                    i.icon ? (
                      <span>
                        {i.icon && <img src={i.icon} />}
                        <span className="opensource-card-title">{i.title}</span>
                      </span>
                    ) : (
                      i.title
                    )
                  }
                >
                  <p>
                    <small>{i.description}</small>
                  </p>
                </Panel>
                {Array.isArray(i.image) ? (
                  <Carousel autoplay className="opensource-card-carousel">
                    {i.image.map((i, ix) => (
                      <img key={`${i}-${ix}`} src={i} />
                    ))}
                  </Carousel>
                ) : (
                  i.image && <img src={i.image} style={{ width: '100%' }} />
                )}
              </Panel>
            </a>
          ))}
        </div>
      </PageContainer>
    </Frame>
  )
}
