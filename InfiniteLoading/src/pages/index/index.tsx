import Taro from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { Cell, InfiniteLoading } from '@nutui/nutui-react-taro'


const Index = () => {
  const [defaultList, setDefaultList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const loadMore = (done: () => void) => {
    setTimeout(() => {
      const curLen = defaultList.length
      for (let i = curLen; i < curLen + 10; i++) {
        defaultList.push(`${i}`)
      }
      if (defaultList.length >= 30) {
        setHasMore(false)
      } else {
        setDefaultList([...defaultList])
      }
      done()
    }, 500)
  }

  const refresh = (done: () => void) => {
    setTimeout(() => {
      Taro.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000,
      })
      done()
    }, 1000)
  }

  const init = () => {
    for (let i = 0; i < 20; i++) {
      defaultList.push(`${i}`)
    }
    setDefaultList([...defaultList])
  }

  return (
    <>
      <h2>基础用法</h2>
      <Cell>
        <ul className="infiniteUl" id="scrollDemo" style={{ height: '500px' }}>
          <InfiniteLoading
            loadingText="加载中···"
            loadMoreText="没有啦～"
            pullRefresh
            target="scrollDemo"
            hasMore={hasMore}
            onLoadMore={loadMore}
            onRefresh={refresh}
          >
            {defaultList.map((item, index) => {
              return (
                <li className="infiniteLi" key={index}>
                  {item}
                </li>
              )
            })}
          </InfiniteLoading>
        </ul>
      </Cell>
    </>
  )
}
export default Index
