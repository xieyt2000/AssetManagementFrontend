import React from 'react'

const CHINESE_ISSUE_TYPE = {
  REQUIRE: '领用',
  MAINTAIN: '维修',
  TRANSFER: '转移',
  RETURN: '退库'
}

const CHINESE_ISSUE_STATUS = {
  DOING: '进行中',
  SUCCESS: '成功',
  FAIL: '失败'
}
export const renderIssueType = (row) => (
  <span> {CHINESE_ISSUE_TYPE[row.type_name]} </span>
)

export const renderAssignee = (row) => {
  if (row.type_name === 'TRANSFER') {
    return (<span>{row.assignee}</span>)
  }
}

export const renderIssueStatus = (row) => {
  return (<span> {CHINESE_ISSUE_STATUS[row.status]} </span>)
}
