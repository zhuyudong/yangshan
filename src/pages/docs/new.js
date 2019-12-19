import React, { useRef, useState, useEffect } from 'react'
import { Button, Icon, Popconfirm } from 'antd'
import { Editor } from '@toast-ui/react-editor'
import Frame from '@src/components/Frame'
import PageContainer from '@src/components/PageContainer'
import 'tui-editor/dist/tui-editor.css' // editor's ui
import 'tui-editor/dist/tui-editor-contents.css' // editor's content
import 'codemirror/lib/codemirror.css' // codemirror
import 'highlight.js/styles/github.css' // code block highlight
// import './styles.less'

const ext = [
  {
    name: 'chart',
    minWidth: 100,
    maxWidth: 600,
    minHeight: 100,
    maxHeight: 300
  },
  'scrollSync',
  'colorSyntax',
  'uml',
  'mark',
  'table'
]
export default locale => {
  return props => {
    const editorRef = useRef()
    const [value, changeValue] = useState('')
    const [editType, changeEditType] = useState('markdown')

    useEffect(() => {
      // 请求内容
    })

    const onConfirm = () => {
      props.router.push('/docs')
    }

    const onSave = () => {
      // editorRef.current.getInstance().getMarkdown()
      console.log('保存成功！')
    }

    return (
      <Frame showSubmenu={false}>
        <PageContainer routerId={'docs/new'} hidePageNav>
          <div className="btn-confirm">
            <Popconfirm
              title="是否确定放弃所编辑内容？"
              onConfirm={onConfirm}
              okText="确定"
              cancelText="取消"
            >
              <Button size="small">
                <Icon type="close" />
                放弃
              </Button>
            </Popconfirm>
            <Button size="small" onClick={onSave}>
              <Icon type="check" />
              保存
            </Button>
          </div>
          <Editor
            exts={ext}
            ref={editorRef}
            language={locale}
            useCommandShortcut
            initialValue={value}
            previewStyle="vertical"
            usageStatistics={false}
            initialEditype={editType}
            height="calc(100vh - 60px)"
            placeholder="开始愉快的书写吧！"
          />
        </PageContainer>
      </Frame>
    )
  }
}
