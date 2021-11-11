# 企业固定资产管理系统

GoodNight 组		乐阳 黄翘楚 谢云桐 张鹤潇



## 需求分析

本项完成了一个简单的企业固定资产管理应用系统，以帮助企业管理固定资产的归属和流转。利用该系统，用户可以执行有关资产的一系列操作，例如资产入库、资产领用、资产转移、资产清退、资产维修、资产详情查看、标签打印等，并支持基本的审批流程。

下面是一个简单的员工领用某种新类别资产的泳道图，涉及到的用户及操作将在之后详细说明：

在众多的项目需求中可以提炼出三个重点：用户权限、资产管理、事项流程。下文中我们将分别展开说明。



#### 用户权限

本系统通过实现完善的用户认证与权限管理，打造安全的生态，在此基础之上对资产进行各类操作。

本系统支持四种身份（权限），分别为

- 资产管理员：录入、调拨、清退其所属部门的资产，有权查看资产的全视图，对其管辖的资产事务进行审批
- 系统管理员：有权查看系统日志，管理整个系统的用户信息
- IT管理员：负责管理资产的分类层级和自定义属性
- 员工：系统的普通用户，可以向系统提出资产的领用申请，查看其账下的资产等

每种身份可执行的功能相互不重叠，每个用户可以有多种身份。前端界面根据当前用户的身份，在菜单栏中仅展示用户有权限执行的操作的选项，不允许用户访问其无权访问的页面。而后端在实现接口时也要注意对每个请求的身份和权限进行认证。

系统需要妥善维护用户信息，保存用户的名称、权限、密码等信息，尤其要注意敏感信息的安全性。

用户分属于不同的部门，部门架构构成层级树，企业部门的架构是可以由管理员自定义的。

用户的所有行为都会在系统日志中留下记录。

#### 资产管理

资产管理是本系统的核心功能。

资产分属于不同的资产分类，资产分类构成层级树，IT 管理员可以自定义资产分类树。

资产有名称、价值、描述等属性，IT 管理员也可以根据企业需要为资产添加自定义属性，并可随时对其进行修改。

资产管理员可以进行录入新资产、改变资产属性、查看部门资产情况、资产操作历史记录、打印标签等操作。本系统支持对资产的批量操作，可以通过 Excel 批量导入资产。

#### 事项流程

普通员工无权查看、管理企业资产，但是他们又是企业资产的主要使用者。事项流程的核心打破员工与企业资产间的壁垒，实现员工——管理员——资产的闭环。

员工可以对资产进行领用、转移、维保、退库等操作，首先由员工发出申请事项，资产管理员审批事项。审批通过后，系统改变资产的状态，并将其交付到相应负责人名下；审批失败则退回申请。

资产状态（空闲、使用中、维保中等）与挂账人的改变必须通过相应的流程，所有的事项都会在系统中留下记录。



本项目涉及几类数据的保存：资产、用户、部门和审批事项等。维护这几个数据库是整个系统的核心逻辑。项目需求中关于用户、资产管理的操作（如增删用户，修改资产属性等），本质上是将后端数据库的内容以适当的方式展示在网页中，并将用户与网页的交互翻译为数据库的增、删、改、查。从这个意义上讲，项目需要实现后端数据库和前端用户友好的交互界面。

本项目涉及到复杂的数据库字段关系。比如每个资产有一个用户作为挂账人，用户又属于某个部门等等。需要考虑到当某一数据条目发生变动时，与其有关的其他条目的行为。

本项目涉及树型数据结构的存储。企业的部门构成层级树，资产的分类也有多级之分。这需要后端数据库有灵活存储、遍历树形结构的方法。



## 模块及接口设计

### 前端

前端框架为React，组件库为Ant-Design。组成主页面的组件主要包括上边栏`header`、左侧菜单栏`Sider`以及页面内容`Content`。

### 后端

本项目的后端不需要执行复杂的算法，以数据库维护为主。详情见“数据库设计”部分。

### 接口设计

<img src="interface.png" alt="interface" style="zoom:40%;" />

根据业务逻辑，我们将接口分为五大部分来组织，分别用五个子路径来标识。

```
/api/asset			资产相关
/api/user			用户相关，包括登入登出
/api/issue			事项审批相关
/api/department		部门相关
/api/logs			系统日志相关
```

资产相关的接口包括

```
/api/asset/list				获取本部门资产列表
/api/asset/available		获取本部门空闲资产
/api/asset/query			资产列表的条件查询
/api/asset/add				添加资产
/api/asset/edit				编辑资产
/api/asset/category/tree	获得资产分类树
/api/asset/category/add		添加资产分类
/api/asset/category/edit	编辑资产分类
/api/asset/category/delete	删除资产分类
/api/asset/history			获得资产历史
/api/asset/custom/list		获得自定义属性列表
/api/asset/custom/edit		编辑自定义属性
/api/asset/retire			资产清退
/api/asset/allocate			资产调拨
```

用户相关的接口包括

```
/api/user/login				用户登录
/api/user/logout			用户登出
/api/user/assets			个人资产
/api/user/info				获得用户信息
/api/user/list				获得用户列表
/api/user/delete			删除用户
/api/user/lock				锁定用户
/api/user/edit				编辑用户
/api/user/exist				查询用户是否存在
/api/user/add				添加用户
/api/user/change-password	修改密码
```

事项审批相关

```
/api/issue/require				资产领用申请
/api/issue/fix					资产维保申请
/api/issue/transfer				资产转移申请
/api/issue/return				资产退库申请
/api/issue/handling				待办事项列表
/api/issue/handle				同意审批
/api/issue/permit-require		同意资产领用
/api/issue/require-asset-list	可领用资产列表
/api/issue/waiting				个人事项
/api/issue/delete				删除个人事项
```

部门相关

```
/api/department/tree		部门层级树
/api/department/add			添加部门
/api/department/edit		编辑部门
/api/department/delete		删除部门
```

日志

```
/api/logs				获取系统日志
```

详细的接口规定见[在线文档](https://www.showdoc.com.cn/AssetManagementBackendDoc?page_id=5684077461482907)



## 数据库设计

数据表间以外键或多对多字段相连接，关系如下图所示。

<img src="model.png" alt="model" style="zoom:50%;" />

### User

用户表，储存用户信息。

| 字段         | 类型                   | 可空 | 注释                              |
| :----------- | :--------------------- | :--- | --------------------------------- |
| username     | Char(30)               | 否   | 用户名，**主键**                  |
| department   | ForeignKey(Department) | 否   | 部门                              |
| password     | Char(128)              | 否   | 密码, 单向加密存储                |
| active       | Bool                   | 否   | 默认为 `True`, 被锁定时为 `False` |
| token        | Char(100)              | 否   | 存储 jwt                          |
| is_superuser | Bool                   | 否   | 仅对 admin 设置为 `True`          |
| roles        | ManyToMany             | -    | `Django` 维护                     |

- 当用户所属部门被删除时，它的 `department` 字段会被设置为根部门。

用户角色类型：

| code name | verbose name |
| --------- | ------------ |
| ASSET     | 资产管理员   |
| SYSTEM    | 系统管理员   |
| IT        | IT 管理员    |

### Department

部门表，储存部门信息。

| 字段   | 类型           | 可空 | 注释                        |
| :----- | :------------- | :--- | --------------------------- |
| id     | Auto           | -    | **主键**，`Django` 自动添加 |
| name   | Char(30)       | 否   | 部门名                      |
| parent | TreeForeignKey | 是   | 父部门，级联删除            |

- 根部门没有父部门，其 `parent` 字段为 `null`.
- `TreeForeiginKey` 功能由第三方库 `django-mptt` 提供。

### AssetCategory

资产类型表，储存资产类型信息。

| 字段   | 类型           | 可空 | 注释                        |
| :----- | :------------- | :--- | --------------------------- |
| id     | Auto           | -    | **主键**，`Django` 自动添加 |
| name   | Char(30)       | 否   | 资产类型名                  |
| parent | TreeForeignKey | 是   | 父类型，级联删除            |

- 根资产类型没有父类型，其 `parent` 字段为 `null`.

### Asset

资产表，存储资产信息。

| 字段         | 类型                      | 可空 | 注释                                    |
| :----------- | :------------------------ | :--- | --------------------------------------- |
| id           | Auto                      | -    | **主键**，`Django` 自动添加             |
| name         | Char(30)                  | 否   | 资产名                                  |
| description  | Char(150)                 | 是   | 资产描述，默认为空串                    |
| status       | Char(20)                  | 否   | 资产状态                                |
| owner        | ForeignKey(User)          | 否   | 资产挂账人                              |
| parent       | TreeForeignKey            | 是   | 父资产                                  |
| category     | ForeignKey(AssetCategory) | 否   | 资产类型, 级联删除                      |
| value        | Int                       | 否   | 资产录入价值                            |
| start_time   | DateTime                  | 否   | 资产录入时间                            |
| service_life | Int                       | 否   | 资产使用年限                            |
| history      | HistoricalRecords         | -    | 由第三方库 `django-simple-history` 维护 |

- 当资产所属挂账人被删除时，它的 `owner` 被设置为超级管理员 `admin`.

资产状态类型：

| code name   | verbose name |
| ----------- | ------------ |
| IDLE        | 闲置         |
| IN_USE      | 使用         |
| IN_MAINTAIN | 维护         |
| RETIRED     | 清退         |
| DELETED     | 删除         |

### CustomAttr

自定义属性的名字表。

| 字段 | 类型     | 可空 | 注释                        |
| :--- | :------- | :--- | --------------------------- |
| id   | Auto     | -    | **主键**，`Django` 自动添加 |
| name | Char(30) | 否   | 自定义属性名                |

### AssetCustomAttr

自定义属性条目表，储存资产和自定义属性的关联关系。

| 字段  | 类型                   | 可空 | 注释                        |
| :---- | :--------------------- | :--- | --------------------------- |
| id    | Auto                   | -    | **主键**，`Django` 自动添加 |
| asset | ForeignKey(Asset)      | 否   | 相关资产，级联删除          |
| key   | ForeignKey(CustomAttr) | 否   | 相关自定义属性，级联删除    |
| value | Char(100)              | 否   | 自定义属性值，默认为空      |

### AbstractIssue

`Issue` 和 `RequireIssue` 的抽象基类，二者继承了它的所有字段。

| 字段       | 类型             | 可空 | 注释                        |
| :--------- | :--------------- | :--- | --------------------------- |
| id         | Auto             | -    | **主键**，`Django` 自动添加 |
| initiator  | ForeignKey(User) | 否   | 事项发起人，级联删除        |
| handler    | ForeignKey(User) | 否   | 事项发起人，级联删除        |
| start_time | DateTime         | 否   | 事项发起时间                |
| status     | Char(10)         | 否   | 事项状态                    |

事项状态表：

| code name | verbose name |
| --------- | ------------ |
| DOING     | 进行中       |
| SUCCESS   | 成功         |
| FAIL      | 失败         |

### Issue

事项数据表，存储只与单个资产有关的事项信息，包括维修、转移、退库。

| 字段     | 类型              | 可空 | 注释                 |
| :------- | :---------------- | :--- | -------------------- |
| asset    | ForeignKey(Asset) | 否   | 相关资产，级联删除   |
| assignee | ForeignKey(User)  | 否   | 资产获得者，级联删除 |
| type     | Char(10)          | 否   | 事项类别             |

事项类别表：

| code name | verbose name |
| --------- | ------------ |
| MAINTAIN  | 维修         |
| TRANSFER  | 转移         |
| RETURN    | 退库         |

### RequireIssue

领用事项类型表，存储与多个资产有关的领用事项信息。

| 字段           | 类型                      | 可空 | 注释                     |
| :------------- | :------------------------ | :--- | ------------------------ |
| asset          | ManyToMany(Asset)         | -    | 被领用资产               |
| asset_category | ForeignKey(AssetCategory) | 否   | 欲领用资产类型，级联删除 |
| reason         | Text                      | 否   | 申领理由                 |