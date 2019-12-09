import React, { useState } from 'react'
import { Checkbox, Radio, Divider } from 'antd'
import { Input, InputGroup, Icon, Panel, Carousel } from 'rsuite'
import { debounce } from 'lodash/function'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import { refers, types, tags } from '@src/common/constants'
import sources from './sources'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
export default locale => {
  return () => {
    const [showImage, changeShowImage] = useState(true)
    const [results, changeResults] = useState(sources)
    const [checkedRefers, changeCheckedRefers] = useState({
      indeterminate: true,
      checkedAll: true,
      checkedList: refers
    })
    const [checkedType, changeRadioType] = useState(types[0].value)
    const [checkedTags, changeCheckedTags] = useState({
      indeterminate: true,
      checkedAll: true,
      checkedList: tags
    })

    const changeImageCheckbox = e => {
      changeShowImage(e.target.checked)
    }

    const changeReferCheckbox = checkedList => {
      changeCheckedRefers({
        checkedList,
        indeterminate:
          !!checkedList.length && checkedList.length < refers.length,
        checkedTagsAll: checkedList.length === refers.length
      })
      const regs = checkedList.map(i => new RegExp(i, 'i'))
      changeResults(
        sources.filter(
          i =>
            regs.some(j => j.test(i.title)) ||
            regs.some(j => j.test(i.description))
        )
      )
    }

    const changeTypeRadio = ({ target: { value } }) => {
      changeRadioType(value)
      changeResults(sources.filter(i => i.type === value))
    }

    const changeTagCheckbox = checkedList => {
      changeCheckedTags({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < tags.length,
        checkedTagsAll: checkedList.length === tags.length
      })
      const regs = checkedList.map(i => new RegExp(i, 'i'))
      changeResults(
        sources.filter(
          i =>
            regs.some(j => j.test(i.title)) ||
            regs.some(j => j.test(i.description))
        )
      )
    }

    const onCheckAllChange = (type, e) => {
      const state = {
        indeterminate: false,
        checkedAll: e.target.checked
      }
      switch (type) {
        case 'refer':
          state.checkedList = e.target.checked ? refers : []
          changeCheckedRefers(state)
          break
        case 'tag':
          state.checkedList = e.target.checked ? tags : []
          changeCheckedTags(state)
      }
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
              onChange={changeImageCheckbox}
              style={{ margin: 'auto' }}
            >
              {' '}
              {locale === 'zh' ? '例图' : 'example'}
            </Checkbox>
          </div>
          <Divider orientation="left">
            <Checkbox
              checked={checkedRefers.checkedAll}
              indeterminate={checkedRefers.indeterminate}
              onChange={e => onCheckAllChange('refer', e)}
            >
              来源
            </Checkbox>
          </Divider>
          <CheckboxGroup
            options={refers}
            className="ml-per3"
            onChange={changeReferCheckbox}
            value={checkedRefers.checkedList}
          />
          <Divider orientation="left" className="divider-text">
            类型
          </Divider>
          <RadioGroup
            options={types}
            className="ml-per3"
            value={checkedType}
            onChange={changeTypeRadio}
          />
          <Divider orientation="left">
            <Checkbox
              checked={checkedTags.checkedAll}
              indeterminate={checkedTags.indeterminate}
              onChange={e => onCheckAllChange('tag', e)}
            >
              标签
            </Checkbox>
          </Divider>
          <CheckboxGroup
            options={tags}
            className="ml-per3"
            onChange={changeTagCheckbox}
            value={checkedTags.checkedList}
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
