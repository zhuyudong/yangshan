import React, { useState } from 'react'
import { Input, InputGroup, Icon, Panel, Carousel, Checkbox } from 'rsuite'
import { debounce } from 'lodash/function'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import sources from './sources'

export default locale => {
  return () => {
    const [showImage, changeShowImage] = useState(true)
    const [results, changeResults] = useState(sources)

    const onChangeCheckbox = (_, checked) => {
      changeShowImage(checked)
    }

    const onChangeInput = debounce(value => {
      const reg = new RegExp(value, 'i')
      changeResults(
        sources.filter(i => i.title.match(reg) || i.description.match(reg))
      )
    }, 100)

    return (
      <Frame showSubmenu={false}>
        <PageContainer routerId="tools" className="masonry-block">
          <div className="masonry-search">
            <InputGroup className="masonry-search-input">
              <Input
                onChange={onChangeInput}
                placeholder={locale === 'zh' ? '搜索' : 'search'}
              />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <Checkbox checked={showImage} onChange={onChangeCheckbox}>
              {' '}
              {locale === 'zh' ? '例图' : 'example'}
            </Checkbox>
          </div>
          <div className="masonry">
            {results.map((i, ix) => (
              <a
                key={`${i.title}-${ix}`}
                href={i.href}
                target="__blank"
                className="opensource-card-href item"
              >
                <Panel bodyFill bordered className="tools-card">
                  <Panel
                    header={
                      i.icon ? (
                        <span>
                          {i.icon && <img src={i.icon} />}
                          <span className="tools-card-title">{i.title}</span>
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
                  {showImage && Array.isArray(i.image) ? (
                    <Carousel autoplay className="tools-card-carousel">
                      {i.image.map((i, ix) => (
                        <img key={`${i}-${ix}`} src={i} />
                      ))}
                    </Carousel>
                  ) : (
                    showImage &&
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
}
