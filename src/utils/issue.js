import React from 'react'

export const CHINESE_ISSUE = {
  REQUIRE: '领用',
  MAINTAIN: '维修',
  TRANSFER: '转移',
  RETURN: '退库'
}

export const renderChineseIssue = (row) => (
  <span> {CHINESE_ISSUE[row.type_name]} </span>
)

export const renderAssignee = (row) => {
  if (row.type_name === 'TRANSFER') {
    return (<span>{row.assignee}</span>)
  }
}
