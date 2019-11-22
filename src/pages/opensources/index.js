import React, { Fragment, useState } from 'react'
import {
  Row,
  Col,
  Input,
  InputGroup,
  Icon,
  Panel,
  ButtonToolbar,
  Button
} from 'rsuite'
import { debounce } from 'lodash/function'
import classnames from 'classnames'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import sources from './sources'

const categories = {
  框架: true,
  CSS: true,
  Vue: true,
  HTML: true,
  React: true,
  Angular: true,
  'Node.js': true,
  测试: true,
  工具: true,
  教程: true,
  周刊: true,
  可视化: true,
  函数式: true,
  小程序: true,
  状态管理: true,
  编译构建: true,
  代码风格: true,
  模板引擎: true,
  面向对象: true
}
export default locale => {
  return () => {
    const [results, changeResults] = useState(sources)
    const [selectedCategories, changeSelectedCategories] = useState(categories)

    const onChangeInput = debounce(value => {
      const reg = new RegExp(value, 'i')
      const items = sources
        .map(i => {
          i.children = (i.children || []).filter(
            j => j.title.match(reg) || j.description.match(reg)
          )
          return i
        })
        .filter(i => i.children && i.children.length)
      changeResults(items)
    }, 100)

    const onClickTag = name => {
      let selecteds = Object.keys(selectedCategories).filter(
        i => selectedCategories[i]
      )
      if (!selectedCategories[name]) {
        selecteds.push(name)
      } else {
        selecteds = selecteds.filter(i => i !== name)
      }
      const selectedRegs = selecteds.map(i => new RegExp(i, 'i'))
      changeResults(
        sources.filter(i => selectedRegs.some(reg => reg.test(i.title)))
      )
      changeSelectedCategories({
        ...selectedCategories,
        [name]: !selectedCategories[name]
      })
    }

    return (
      <Frame showSubmenu={false}>
        <PageContainer routerId="tools" className="opensource-block">
          <div className="opensource-search">
            <InputGroup className="opensource-search-input">
              <Input
                onChange={onChangeInput}
                placeholder={locale === 'zh' ? '搜索' : 'search'}
                style={{ width: '100% !important' }}
              />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <ButtonToolbar className="opensource-search-tags">
              {Object.entries(selectedCategories).map(([name, selected]) => (
                <Button
                  key={name}
                  size="xs"
                  className={classnames({
                    selected,
                    'opensource-search-tag': true
                  })}
                  onClick={() => onClickTag(name)}
                >
                  {name}
                </Button>
              ))}
            </ButtonToolbar>
          </div>
          {results.map((category, ix) => {
            return (
              <Fragment key={category.title}>
                <Row className="opensource-category">{category.title}</Row>
                <Row>
                  {(category.children || []).map(i => (
                    <Col
                      md={6}
                      sm={12}
                      key={i.title + ix}
                      className="opensource-card-col"
                    >
                      <Panel
                        bordered
                        className="opensource-card"
                        header={
                          i.icon ? (
                            <span>
                              <img className="icon" src={i.icon} />
                              <span className="opensource-card-title">
                                {i.title}
                              </span>
                            </span>
                          ) : (
                            i.title
                          )
                        }
                      >
                        <div className="icons">
                          {i.stars ||
                            ((i.home || '').match(/github\.com/) && (
                              <img
                                className="stars"
                                src={
                                  i.stars ||
                                  `https://img.shields.io/github/stars/${
                                    i.home.match(
                                      /github\.com\/([\w-]+\/[\w-]+)\/?/
                                    )[1]
                                  }?style=social`
                                }
                              />
                            ))}
                          {i.home && !i.home.match(/github\.com/) && (
                            <a
                              href={i.home}
                              target="__blank"
                              className="opensource-card-href"
                            >
                              <Icon icon="home" />
                            </a>
                          )}
                          {i.github ||
                            ((i.home || '').match(/github\.com/) && (
                              <a
                                href={i.github || i.home}
                                target="__blank"
                                className="opensource-card-href"
                              >
                                <Icon icon="github" />
                              </a>
                            ))}
                        </div>
                        <p>
                          <small>{i.description}</small>
                        </p>
                      </Panel>
                    </Col>
                  ))}
                </Row>
              </Fragment>
            )
          })}
        </PageContainer>
      </Frame>
    )
  }
}
