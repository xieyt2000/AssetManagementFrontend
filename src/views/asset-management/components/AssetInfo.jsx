import React from 'react'
import { Modal, Button, Descriptions, Card } from 'antd'
import { PropTypes } from 'prop-types'
import html2canvas from 'html2canvas'

import QRCode from 'qrcode.react'
class AssetInfo extends React.Component {
  toChinese (en) {
    return en === 'AMOUNT' ? '数量型' : '条目型'
  }

  saveLabel () {
    const newCanvas = document.createElement('canvas')
    const element = document.getElementById('label')

    const width = parseInt(window.getComputedStyle(element).width)
    const height = parseInt(window.getComputedStyle(element).height)
    console.log(width)
    console.log(height)
    // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    newCanvas.width = width * 2
    newCanvas.height = height * 2
    newCanvas.style.width = width + 'px'
    newCanvas.style.height = height + 'px'
    const context = newCanvas.getContext('2d')
    context.scale(1.8, 1.8)

    html2canvas(element, { canvas: newCanvas }).then((canvas) => {
      const imgUri = canvas.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream') // 获取生成的图片的url
      const base64ToBlob = (code) => {
        const parts = code.split(';base64,')
        const contentType = parts[0].split(':')[1]
        const raw = window.atob(parts[1])
        const rawLength = raw.length

        const uInt8Array = new Uint8Array(rawLength)

        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        return new Blob([uInt8Array], { type: contentType })
      }
      const blob = base64ToBlob(imgUri)
      // window.location.href = imgUri; // 下载图片
      // 利用createObjectURL，模拟文件下载
      const fileName = '资产标签.png'
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        const blobURL = window.URL.createObjectURL(blob)
        const vlink = document.createElement('a')
        vlink.style.display = 'none'
        vlink.href = blobURL
        vlink.setAttribute('download', fileName)

        if (typeof vlink.download === 'undefined') {
          vlink.setAttribute('target', '_blank')
        }

        document.body.appendChild(vlink)

        const evt = document.createEvent('MouseEvents')
        evt.initEvent('click', false, false)
        vlink.dispatchEvent(evt)

        document.body.removeChild(vlink)
        window.URL.revokeObjectURL(blobURL)
      }
    })
  }

  rowToStr (row) {
    let info = ''
    const addProp = (key, value) => {
      info += key + ': ' + value + '\n'
    }
    addProp('id', row.nid)
    addProp('名称', row.name)
    addProp('分类', row.category)
    addProp('类型', this.toChinese(row.type_name))
    addProp('描述', row.description)
    addProp('录入时间', row.start_time)
    return info
  }

  render () {
    const { visible, onExit, confirmLoading, rowData } = this.props
    const { type_name: isQuantity, category, quantity, value, name, description, parent, children,
      owner, department, status, start_time: startTime, prop, service_life: serviceLife,
      now_value: nowValue, nid: id } = rowData
    const QRInfo = this.rowToStr(rowData)
    return (
      <div>
        <Modal title = "资产详情" visible={visible}
          onCancel={onExit} confirmLoading={confirmLoading}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button key="label" type="primary" onClick={this.saveLabel}>下载标签</Button>,
            <Button key="submit" type="primary" onClick={onExit}>
                            返回
            </Button>
          ]}
        >
          <Descriptions column={3}>
            <Descriptions.Item label='id' span={3}>{id}</Descriptions.Item>
            <Descriptions.Item label='名称' span={3}>{name}</Descriptions.Item>
            <Descriptions.Item label='描述' span={3}>{description}</Descriptions.Item>
            <Descriptions.Item label='挂账人' span={1}>{owner}</Descriptions.Item>
            <Descriptions.Item label='部门' span={2}>{department}</Descriptions.Item>
            <Descriptions.Item label='状态' span={1}>{status}</Descriptions.Item>
            <Descriptions.Item label='录入时间' span={2}>{startTime}</Descriptions.Item>
            <Descriptions.Item label='分类' span={1}>{category}</Descriptions.Item>
            <Descriptions.Item label='类型' span={1}>
              {this.toChinese(isQuantity)}
            </Descriptions.Item>
            <Descriptions.Item label='数量' span={1}>{quantity}</Descriptions.Item>
            <Descriptions.Item label='原价值'>{value}</Descriptions.Item>
            <Descriptions.Item label='当前价值'>{nowValue}</Descriptions.Item>
            <Descriptions.Item label='使用年限' >{serviceLife + '年'}</Descriptions.Item>
            <Descriptions.Item label='所属'>{parent}</Descriptions.Item>
            <Descriptions.Item label='包含' span={2}>{children}</Descriptions.Item>
            <Descriptions.Item label='自定义属性' span={3}>{prop}</Descriptions.Item>
          </Descriptions>
          <center>
            <div id="label" style={{ width: '200px' }}>
              <Card
                style={{ width: '200px' }}
              >
                <center>
                  <h5> {name}</h5>
                  <p> {'资产id: ' + id}</p>
                  <QRCode
                    value={QRInfo} // value参数为生成二维码的链接
                    size={100} // 二维码的宽高尺寸
                    fgColor="#000000" // 二维码的颜色
                  />

                </center>
              </Card>
            </div>
          </center>
        </Modal>
      </div>
    )
  }
}
AssetInfo.propTypes = {
  visible: PropTypes.bool,
  onExit: PropTypes.func,
  confirmLoading: PropTypes.func,
  form: PropTypes.object,
  rowData: PropTypes.object // refer to `rowData` in ../index.js
}

export default AssetInfo
