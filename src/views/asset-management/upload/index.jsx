import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'
import XLSX from 'xlsx'
import { PropTypes } from 'prop-types'
import { CHINESE_KEY_TO_ENGLISH } from '../../../utils/asset'

const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
// const getHeaderRow = (sheet) => {
//   const headers = []
//   const range = XLSX.utils.decode_range(sheet['!ref'])
//   let C
//   const R = range.s.r
//   /* start in the first row */
//   for (C = range.s.c; C <= range.e.c; ++C) {
//     /* walk every column in the range */
//     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
//     /* find the cell in the first row */
//     let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
//     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
//     headers.push(hdr)
//   }
//   return headers
// }

class UploadAsset extends Component {
  uploadProps = () => {
    const _this = this
    return {
      name: 'file',
      multiple: false,
      accept: '.xlsx, .xls',
      showUploadList: false,
      onChange (info) {
        const { status } = info.file
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功`)
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败`)
        }
      },
      beforeUpload (file, fileList) {
        if (!isExcel(file)) {
          message.error('仅支持上传.xlsx, .xls, .csv 文件')
          return false
        }
      },
      customRequest (e) {
        _this.readerData(e.file).then(() => {
          e.onSuccess()
        })
      }
    }
  }

  readerData = (rawFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        // const header = getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.returnData(results)
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  returnData = (results) => {
    const engRes = []
    for (let i = 0; i < results.length; i++) {
      engRes.push(Object.keys(results[i]).reduce((newObj, key) => {
        const newKey = CHINESE_KEY_TO_ENGLISH[key]
        if (newKey !== undefined) {
          newObj[newKey] = results[i][key]
        } else {
          if (key === '资产类型') {
            newObj['is_quantity'] = (results[i][key] === '数量型')
          }
        }
        return newObj
      }, {}))
    }
    this.props.uploadSuccess(engRes)
  }

  render () {
    return (
      <Upload {...this.uploadProps()}>
        <Button type='primary'>
          <Icon type="upload"/> 批量导入
        </Button>
      </Upload>
    )
  }
}

UploadAsset.propTypes = {
  uploadSuccess: PropTypes.func
}

export default UploadAsset
