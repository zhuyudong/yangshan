import React, { useState } from 'react'
import { Checkbox, Row, Col } from 'antd'
import { Input, InputGroup, Icon, Panel, Carousel } from 'rsuite'
import { debounce } from 'lodash/function'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import { ToolTags } from '@src/common/constants/tags'
import sources from './sources'

const CheckboxGroup = Checkbox.Group
export default locale => {
  return () => {
    const [showImage, changeShowImage] = useState(true)
    const [results, changeResults] = useState(sources)
    const [checkedTags, changeCheckedTags] = useState({
      indeterminate: true,
      checkedTagsAll: true,
      checkedTagList: ToolTags
    })

    const changeExampleCheckbox = e => {
      changeShowImage(e.target.checked)
    }

    const changeTagsCheckbox = checkedTagList => {
      changeCheckedTags({
        checkedTagList,
        indeterminate:
          !!checkedTagList.length && checkedTagList.length < ToolTags.length,
        checkedTagsAll: checkedTagList.length === ToolTags.length
      })
      const regs = checkedTagList.map(i => new RegExp(i, 'i'))
      changeResults(
        sources.filter(
          i =>
            regs.some(j => j.test(i.title)) ||
            regs.some(j => j.test(i.description))
        )
      )
      // changeResults(
      //   sources.filter(i => i.tags.some(j => checkedTagList.includes(j)))
      // )
    }

    const onCheckAllChange = e => {
      changeCheckedTags({
        indeterminate: false,
        checkedTagsAll: e.target.checked,
        checkedTagList: e.target.checked ? ToolTags : []
      })
      changeResults(e.target.checked ? sources : [])
    }

    const onChangeInput = debounce(value => {
      const reg = new RegExp(value, 'i')
      changeResults(
        sources.filter(i => reg.test(i.title) || reg.test(i.description))
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
            <Checkbox
              checked={showImage}
              onChange={changeExampleCheckbox}
              style={{ margin: 'auto' }}
            >
              {' '}
              {locale === 'zh' ? '例图' : 'example'}
            </Checkbox>
          </div>
          <Checkbox
            onChange={onCheckAllChange}
            checked={checkedTags.checkedTagsAll}
            indeterminate={checkedTags.indeterminate}
          >
            全选
          </Checkbox>
          <hr style={{ margin: 2 }} />
          <CheckboxGroup
            options={ToolTags}
            onChange={changeTagsCheckbox}
            value={checkedTags.checkedTagList}
          />
          <div className="masonry">
            {results.map((i, ix) => (
              <Panel
                key={`${i.title}-${ix}`}
                bodyFill
                bordered
                className="tools-card item"
              >
                <Panel
                  header={
                    i.icon ? (
                      <a href={i.href} target="__blank">
                        <span>
                          {i.icon && <img src={i.icon} />}
                          <span className="tools-card-title">{i.title}</span>
                        </span>
                      </a>
                    ) : (
                      <a href={i.href} target="__blank">
                        {i.title}
                      </a>
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
                      <img
                        key={`${i}-${ix}`}
                        data-src={i}
                        data-sizes="auto"
                        className="lazyload ys-tools-img"
                      />
                    ))}
                  </Carousel>
                ) : (
                  showImage &&
                  i.image && (
                    <img
                      data-src={i.image}
                      data-sizes="auto"
                      className="lazyload ys-tools-img"
                      style={{ width: '100%' }}
                    />
                  )
                )}
              </Panel>
            ))}
          </div>
        </PageContainer>
      </Frame>
    )
  }
}
