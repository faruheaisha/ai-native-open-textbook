---
title: "千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "md/developer-users-user-sync-list-sync-status.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-users-user-sync-list-sync-status.md"
sourceSha256: "17e94090b6bb65c62dedf98ba522e35420f3afcb8dc07312d0a114c7886d0dfe"
pageSha256: "17e94090b6bb65c62dedf98ba522e35420f3afcb8dc07312d0a114c7886d0dfe"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

读取指定同步任务的状态、处理结果、用户和部门变更统计以及错误摘要。用于在提交同步任务后确认是否完成、是否出现部分成功或失败。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>用户同步任务读取（读取）</td> <td>directory-sync-runs</td> <td>admin.v1.directory-sync-runs.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/directory-sync/runs/{runId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>runId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的同步任务标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/directory-sync/runs/<runId>' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>run</td> <td>OpenapifacadeDirectorySyncRun</td> <td>是</td> <td>本次同步任务的状态和结果。</td> <td>\{"created_at":"2026-08-27T10:00:00Z","error_code":"\&lt;string\&gt;","error_summary":"\&lt;string\&gt;","finished_at":"2026-08-27T10:00:00Z","id":"\&lt;uuid\&gt;","requested_by_email":"\&lt;string\&gt;","requested_by_name":"\&lt;string\&gt;","resource_type":"\&lt;string\&gt;","result":"success","source_id":"\&lt;uuid\&gt;","source_name":"\&lt;string\&gt;","source_type":"\&lt;string\&gt;","started_at":"2026-08-27T10:00:00Z","stats":\{"departments":\{"created":0,"deactivated":0,"deleted":0,"updated":0\},"failed":0,"processed":0,"relationships":\{"added":0,"removed":0,"returned_to_root":0\},"seats":\{"granted":0,"reclaimed":0\},"succeeded":0,"users":\{"created":0,"deactivated":0,"deleted":0,"updated":0&#125;&#125;,"status":"pending","trigger_type":"manual"\}</td> </tr> <tr> <td>run.created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>run.error_code</td> <td>string</td> <td>否</td> <td>同步失败时返回的错误码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.error_summary</td> <td>string</td> <td>否</td> <td>同步错误的简要说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.finished_at</td> <td>string · date-time</td> <td>否</td> <td>同步任务执行结束的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>run.id</td> <td>string · uuid</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>run.requested_by_email</td> <td>string</td> <td>否</td> <td>发起本次同步的操作者邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.requested_by_name</td> <td>string</td> <td>否</td> <td>发起本次同步的操作者名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.resource_type</td> <td>string</td> <td>是</td> <td>此次记录涉及的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.result</td> <td>string</td> <td>否</td> <td>同步处理结果：success 全部成功，partial_success 部分成功，failure 失败。</td> <td>"success"</td> </tr> <tr> <td>run.source_id</td> <td>string · uuid</td> <td>是</td> <td>本次同步使用的数据源标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>run.source_name</td> <td>string</td> <td>是</td> <td>本次同步所用数据源的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.source_type</td> <td>string</td> <td>是</td> <td>通讯录来源类型，用于选择钉钉、飞书、企业微信、AD、LDAP、Entra ID 或 SCIM 的接入方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>run.started_at</td> <td>string · date-time</td> <td>否</td> <td>同步任务开始执行的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>run.stats</td> <td>OpenapifacadeDirectorySyncRunStats</td> <td>是</td> <td>本次同步的用户、部门、关系及席位变更统计。</td> <td>\{"departments":\{"created":0,"deactivated":0,"deleted":0,"updated":0\},"failed":0,"processed":0,"relationships":\{"added":0,"removed":0,"returned_to_root":0\},"seats":\{"granted":0,"reclaimed":0\},"succeeded":0,"users":\{"created":0,"deactivated":0,"deleted":0,"updated":0&#125;&#125;</td> </tr> <tr> <td>run.stats.departments</td> <td>OpenapifacadeDirectorySyncChangeCounts</td> <td>是</td> <td>本次同步中部门变更的数量。</td> <td>\{"created":0,"deactivated":0,"deleted":0,"updated":0\}</td> </tr> <tr> <td>run.stats.departments.created</td> <td>integer · int64</td> <td>是</td> <td>本次同步新增的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.departments.deactivated</td> <td>integer · int64</td> <td>否</td> <td>本次同步停用的用户数量。</td> <td>0</td> </tr> <tr> <td>run.stats.departments.deleted</td> <td>integer · int64</td> <td>是</td> <td>本次同步删除的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.departments.updated</td> <td>integer · int64</td> <td>是</td> <td>本次同步更新的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.failed</td> <td>integer · int64</td> <td>否</td> <td>本次任务处理失败的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.processed</td> <td>integer · int64</td> <td>否</td> <td>本次任务已处理的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.relationships</td> <td>OpenapifacadeDirectorySyncRelationshipCounts</td> <td>是</td> <td>本次同步中部门归属关系的变更数量。</td> <td>\{"added":0,"removed":0,"returned_to_root":0\}</td> </tr> <tr> <td>run.stats.relationships.added</td> <td>integer · int64</td> <td>是</td> <td>本次同步新增的部门归属关系数量。</td> <td>0</td> </tr> <tr> <td>run.stats.relationships.removed</td> <td>integer · int64</td> <td>是</td> <td>本次同步移除的部门归属关系数量。</td> <td>0</td> </tr> <tr> <td>run.stats.relationships.returned_to_root</td> <td>integer · int64</td> <td>是</td> <td>本次同步后回到根部门的用户数量。</td> <td>0</td> </tr> <tr> <td>run.stats.seats</td> <td>OpenapifacadeDirectorySyncSeatCounts</td> <td>是</td> <td>本次同步中席位分配和回收的数量。</td> <td>\{"granted":0,"reclaimed":0\}</td> </tr> <tr> <td>run.stats.seats.granted</td> <td>integer · int64</td> <td>是</td> <td>本次同步分配的席位数量。</td> <td>0</td> </tr> <tr> <td>run.stats.seats.reclaimed</td> <td>integer · int64</td> <td>是</td> <td>本次同步回收的席位数量。</td> <td>0</td> </tr> <tr> <td>run.stats.succeeded</td> <td>integer · int64</td> <td>否</td> <td>本次任务处理成功的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.users</td> <td>OpenapifacadeDirectorySyncChangeCounts</td> <td>是</td> <td>本次同步中用户新增、更新、停用和删除的数量。</td> <td>\{"created":0,"deactivated":0,"deleted":0,"updated":0\}</td> </tr> <tr> <td>run.stats.users.created</td> <td>integer · int64</td> <td>是</td> <td>本次同步新增的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.users.deactivated</td> <td>integer · int64</td> <td>否</td> <td>本次同步停用的用户数量。</td> <td>0</td> </tr> <tr> <td>run.stats.users.deleted</td> <td>integer · int64</td> <td>是</td> <td>本次同步删除的对象数量。</td> <td>0</td> </tr> <tr> <td>run.stats.users.updated</td> <td>integer · int64</td> <td>是</td> <td>本次同步更新的对象数量。</td> <td>0</td> </tr> <tr> <td>run.status</td> <td>string</td> <td>是</td> <td>同步任务状态：pending 等待执行，running 执行中，succeeded 执行成功，failed 执行失败，cancelled 已取消。</td> <td>"pending"</td> </tr> <tr> <td>run.trigger_type</td> <td>string</td> <td>是</td> <td>触发方式：manual 为手动，scheduled 为定时，scim 为 SCIM 请求。</td> <td>"manual"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "run": {
    "created_at": "2026-08-27T10:00:00Z",
    "error_code": "<string>",
    "error_summary": "<string>",
    "finished_at": "2026-08-27T10:00:00Z",
    "id": "<uuid>",
    "requested_by_email": "<string>",
    "requested_by_name": "<string>",
    "resource_type": "<string>",
    "result": "success",
    "source_id": "<uuid>",
    "source_name": "<string>",
    "source_type": "<string>",
    "started_at": "2026-08-27T10:00:00Z",
    "stats": {
      "departments": {
        "created": 0,
        "deactivated": 0,
        "deleted": 0,
        "updated": 0
      },
      "failed": 0,
      "processed": 0,
      "relationships": {
        "added": 0,
        "removed": 0,
        "returned_to_root": 0
      },
      "seats": {
        "granted": 0,
        "reclaimed": 0
      },
      "succeeded": 0,
      "users": {
        "created": 0,
        "deactivated": 0,
        "deleted": 0,
        "updated": 0
      }
    },
    "status": "pending",
    "trigger_type": "manual"
  }
}
```

### default 请求失败，返回错误码和错误详情。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>code</td> <td>string</td> <td>否</td> <td>用于程序判断错误原因的稳定业务错误码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>detail</td> <td>string</td> <td>是</td> <td>便于阅读的错误说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details</td> <td>OpenapiErrorDetails</td> <td>否</td> <td>字段校验失败时的详细信息。</td> <td>\{"field":"\&lt;string\&gt;","reason":"\&lt;string\&gt;","suggestion":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>details.field</td> <td>string</td> <td>否</td> <td>未通过校验的请求字段。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details.reason</td> <td>string</td> <td>否</td> <td>稳定的校验失败原因，用于判断字段为何不合法。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details.suggestion</td> <td>string</td> <td>否</td> <td>建议采用的规范化字段值。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>error</td> <td>string</td> <td>是</td> <td>稳定的 HTTP 错误类型。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "code": "<string>",
  "detail": "<string>",
  "details": {
    "field": "<string>",
    "reason": "<string>",
    "suggestion": "<string>"
  },
  "error": "<string>"
}
```
