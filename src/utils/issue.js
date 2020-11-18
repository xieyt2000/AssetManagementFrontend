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

export const renderIssueStatus = (row) => (
  <span> {CHINESE_ISSUE_STATUS[row.status]} </span>
)

export const transIssueList = (self) => {
  const issueList = self.state.issueList
  for (let idx = 0; idx < issueList.length; idx++) {
    issueList[idx].chiStatus = CHINESE_ISSUE_STATUS[issueList[idx].status]
    issueList[idx].chiType = CHINESE_ISSUE_TYPE[issueList[idx].type_name]
  }
  self.setState({ issueList: issueList })
}
